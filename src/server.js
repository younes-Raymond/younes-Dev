const { ObjectId } = require('mongodb');
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
app.use(express.json());
app.use(bodyParser.json());
const { error } = require('console');
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
const db = client.db('test2');




app.post('/articles', function(req, res) {
  // console.log(req.body) // use this loging to make sure  that data comes 
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
      authorSpecialisation: authorSpecialisation,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      comments:[] // initialize the comment  array 
    }).then(result => {
      console.log("New article inserted into database");
      const newArticle = {
        title: title,
        category: category,
        content: content,
        authorName: authorName,
        authorSpecialisation: authorSpecialisation,
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        id: result.insertedId,
        comments:[]
      };
      console.log(newArticle)
      res.json(newArticle);
    }).catch(error => {
      console.error(error);
      res.status(500).send('Error saving article to database');
    }); 
})
// another end point 


// Define the route handler for updating the like count
app.post('/articles/:id/like', (req, res) => {
  console.log(`i got i request from like ${req.params.id}`)  // log the value of Id in dataset come from client side 
  console.log('Request to like article received');
  const db = client.db('test2');
  const collection = db.collection('articles2');
  const articleId = req.params.id;
  console.log(articleId);

  // Verify that articleId is a valid ObjectId or not i keep to yuo use it in your development proccess 
  const validObjectIdRegex = /^[0-9a-fA-F]{24}$/; 
  if (!validObjectIdRegex.test(articleId)) {
    res.status(400).json({ error: 'Invalid article ID' });
    return;  
  }

  collection.updateOne(
    { _id: new ObjectId(articleId) },
    { $inc: { likeCount: 1 } }  
  ).then(() => {
    // Send a success response to the client
    res.sendStatus(200);
  }).catch((error) => {
    // Send an error response to the client
    res.status(500).json({ error: error.message });
  });

});
//  start like count router 
app.get('/articles/:id', async (req, res) => {
  console.log(`i send i request from like ${req.params.id}`)// log the value of Id in dataset come from client side 
  const articleId = req.params.id;
  const article = await db.collection("articles2").findOne({_id: new ObjectId(articleId)});
  if (!article) {
    res.status(404).send('Article not found');
    return;
  }
  // console.log(article.likeCount);
  res.status(200).json(article);
})
// end like count router 


app.post('/articles/:id/share', async (req, res) => {
  console.log(`i got i request from share ${req.params.id}`)
  const articleId = req.params.id;
  await db.collection('articles2').updateOne({_id: new ObjectId(articleId)}, {$inc: {shareCount: 1}});
  console.log('Request to share article received', articleId);
  res.status(200).send('Article shared');
});
// start share count router 

 

app.post('/articles/:id/comment', (req, res) => {
  console.log(req.body); // check if req come and what this req contain 
  console.log(`i got i request from comment ${req.params.id}`)// log the value of Id in dataset come from client side 
  console.log('Request to like article received');
  const db = client.db('test2');
  const collection = db.collection('articles2');
  const articleId = req.params.id;

  // Verify that articleId is a valid ObjectId or not i keep it to you use it in your development proccess 
  const validObjectIdRegex = /^[0-9a-fA-F]{24}$/; 
  if (!validObjectIdRegex.test(articleId)) {
    res.status(400).json({ error: 'Invalid article ID' });
    return;  
  }
  const newcomment = req.body.comments;
  collection.updateOne(
    { _id: new ObjectId(articleId) },
    { $push: { comments: newcomment}, $inc: { commentCount: 1 } } // increment the commentCount field by 1
  ).then(() => {
    // Send a success response to the client
    res.sendStatus(200);
  }).catch((error) => {
    // Send an error response to the client
    res.status(500).json({ error: error.message });
  });
});


//  start comment count router 
app.get('/articles/:id', async (req, res) => {
  console.log(`i got i request from comment ${req.params.id}`)// log the value of Id in dataset come from client side 
  const articleId = req.params.id;
  const article = await db.collection("articles2").findOne({_id: new ObjectId(articleId)});
  if (!article) {
    res.status(404).send('Article not found');
    return;
  }
  console.log(article.commentCount);
  res.status(200).json(article);
})
// end comment count router 

// search bar endpoint 
app.post('/search', async (req, res) => {
  let type = req.query.type;
  let query = req.query.query;
  console.log(type) // problem 
  console.log(query) // value of input field come from client side 
  if (type === 'problem'){
    type = 'category';
    const articles = await db.collection('articles2').find({
      [type]: {
        $regex: new RegExp(query, 'gi') 
      }
    }).toArray();
    console.log(articles)
    res.json(articles);
  } else if (type === 'author') {
    type = 'authorName';
    const articles = await db.collection('articles2').find({
      [type]: {
        $regex: new RegExp(query, 'gi')
      }
    }).toArray();
    console.log(articles)
    res.json(articles);
  } else {
    console.error('error')
  }

});

// search end point

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
