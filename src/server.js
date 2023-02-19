const express = require('express');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const bodyParser = require('body-parser');
const { Server } = require('http');
const nodemailer = require('nodemailer');
const path = require('path');
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

// Parse incomig form data
app.use(bodyParser.urlencoded({extended:true}));


// handle form submission 

app.post('/submit-form', (req, res) => {
  console.log(req.body)
  const name = req.body.username;
  const phone = req.body.phone;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  console.log(name)
  console.log(phone)
  console.log(email)
  console.log(subject)
  console.log(message)

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
    to: 'youneshero436@gmail.com',
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
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listen at ${PORT}`))