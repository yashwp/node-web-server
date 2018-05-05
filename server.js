const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();
let port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url} `;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Home Page',
        message: 'Welcome to my Node js page'
    });
});

app.get('/about', (req, res) => {
        res.render('about.hbs', {
            title: 'About Page'
        });
});

app.get('/bad', (req, res) => {
        res.send({
            isSuccess: false,
            message: 'You are drunk go home',
            results: []
        });
});

app.listen(port, () => console.log('Server is up' + port));