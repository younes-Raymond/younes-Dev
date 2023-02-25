const express = require('express');
const ejs = require('ejs');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const EventEmitter = require('events');
const { Server } = require('http');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const $ = require('jquery');
const path = require('path');
const { error } = require('console');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
app.use(express.json());
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/')));


// 
app.get('/', (req, res) => {
  res.render('Home');
});

app.get('/Home', (req, res) => {
  res.render('Home');
});



app.get('/solution', async function(req, res) {
  const uri = "mongodb+srv://raymondyounes:cu4yLypyIbmMfL7K@younes-dev.enszkpk.mongodb.net/test";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("test2");
    const articles = await database.collection("articles2").find().sort({ _id: -1 }).toArray();
    if (articles.length > 0) {
      res.render('solution', { articles: articles });
    } else {
      res.render('solution', { articles: null });
    }
  } catch (err) {
    console.log(err);
    res.render('solution', { articles: null });
  } finally {
    // Close the database connection
    client.close();
  }
});







// add your url string , change the password user name 
const uri = "mongodb+srv://raymondyounes:cu4yLypyIbmMfL7K@younes-dev.enszkpk.mongodb.net/test";

const client = new MongoClient(uri);


app.post('/articles', function(req, res) {
  // Extract the article data from the request body
  // console.log(req.body) // use this loging to make that data comes 
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.content;
  var authorName = req.body.authorName;
  var authorSpecialisation = req.body.authorSpecialisation;
    
  // Save the new article to the database
    const db = client.db('test2');
    const collection = db.collection('articles2');
    collection.insertOne({ 
      title: title, 
      category: category,
      content: content,
      authorName: authorName,
      authorSpecialisation: authorSpecialisation
    }, function(err, result) {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving article to database');
        console.log('data not inserting correctly');
        return;
      }
      console.log(result);
      console.log("New article inserted into database");
      client.close();
    });
  // Return the new article as JSON
  var newArticle = {title:title,category:category,content:content,authorName:authorName,authorSpecialisation:authorSpecialisation};
  res.json(newArticle);
});

// another end point 


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


  const emitter = new EventEmitter();

emitter.setMaxListeners(20); // set max listeners before adding any listeners

emitter.on('event1', () => {
  // event1 handler
});

emitter.on('event2', () => {
  // event2 handler
});

// ... more event listeners added here
emitter.emit('event1');
emitter.emit('event2');


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listen at ${PORT}`))
