// // this is the starting point for the app

const express = require('express');
const app = express();

const path = require('path');
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('Home');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



















// const http = require('http');
// const expess = require('express');
// const app = expess();

// const app = require('./app');
//  const ejs = require('ejs');




// const PORT = process.env.PORT || 3000;
// const server = http.createServer(app);



// server.listen(PORT, () => console.log(`server started on port ${PORT}`));
// // hello
// ejs.renderFile('./views/Home.ejs', { data: 'Hello, world!' }, (err, str) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(str);
//     }
//   });
