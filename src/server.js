const express = require('express');
const ejs = require('ejs');
const app = express();
const { Server } = require('http');
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listen at ${PORT}`))