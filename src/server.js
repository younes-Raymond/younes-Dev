const express = require('express');
const ejs = require('ejs');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const { Server } = require('http');
const nodemailer = require('nodemailer');
const path = require('path');
const { error } = require('console');
const $ = require('jquery');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
app.use(express.json());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/')));
app.get('/', (req, res) => {
  res.render('Home');
});
app.get('/Home', (req, res) => {
  res.render('Home');
});

var articles = [];
app.get('/solution', function(req, res) {
  var articles = [  { title: 'Article 1', category: 'Node.js' },    { title: 'Article 2', category: 'JavaScript' },    { title: 'Article 3', category: 'CSS' }  ];
  res.render('solution', { articles: articles });
});

app.post('/articles', function(req, res) {
  console.log(req.body)
  // Extract the article data from the request body
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.content;
  var authorName = req.body.Author_Name;
  var authorSpecialisation = req.body.Author_Specialisation;
  // console.log(title)
  // console.log(category)
  // console.log(content)
  // console.log(authorName)
  // console.log(authorSpecialisation)
  
  // Save the new article to the database
  // ...
  var newArticle = {title:title,category:category,content:content,authorName:authorName,authorSpecialisation:authorSpecialisation};

  articles.push(newArticle);

  console.log(newArticle)
  // console.log(articles)
  // Redirect the user back to the solution page
  res.json(newArticle);
});


// Parse incomig form data


// handle form submission 

app.post('/submit-form', (req, res) => {
  console.log(req.body)
  const name = req.body.username;
  const phone = req.body.phone;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raymondyounes2@gmail.com',
      pass:"iqwvmellavcyatyl"
    }
  });
  // setup email data 

  // setup email data
  let mailOptions = {
    from: 'raymondyounes2@gmail.com',
    to: 'raymondyounes2@gmail.com',
    subject: 'New form submission',
    html: `<p>Name: ${name}</p>
           <p>Phone: ${phone}</p>
           <p>Email: ${email}</p>
           <p>Subject: ${subject}</p>
           <p>Message: ${message}</p>`
  };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send('Error occurred, message not sent.');
      } else {
        console.log('Message sent: %s', info.messageId);
        res.send('Message sent successfully!');
      }
    });

    let thankYouOptions = {
      from: 'raymondyounes2@gmail.com',
      to: email,
      subject: 'Thank you for your form submission!',
      html: `<p>Dear ${name},</p>
             <p>Thank you for submitting the form on our website. We have received your message and will get back to you as soon as possible.</p>
             <p>Best regards,</p>
             <p>Your Website Team</p>`
    };
    transporter.sendMail(thankYouOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Thank you email sent: %s', info.messageId);
      }
    });
    res.send('Message sent successfully!');
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listen at ${PORT}`))