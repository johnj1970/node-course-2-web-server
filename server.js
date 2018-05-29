const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>hello express!</h1>');
  // res.send({
  //   name: 'Jon',
  //   likes: [
  //     'Stuff',
  //     'Stuff2'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site'
  });
});

app.get('/about', (req, res) => {
  //res.send('About');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorNumber: 123,
    errorMessage: ('This is an error!')
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
