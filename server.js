const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',() => {
            return 'Año del señor: ' + new Date().getFullYear();
 		});

hbs.registerHelper('screamIt',(text) => {
            return text.toUpperCase();
 		});

// To create routes in Express just have a list of multiple app.get entries in the code
// These could be reorganized on external files

//log all the requests and then move to the next Middleware piece.
app.use((req, res, next)=>{
    var reqTime=  new Date().toString();
    var log = `Request Made: ${reqTime} ${req.method} ${req.url} \n`;
    console.log(log);
    fs.appendFileSync('server-log.txt',log);
    next();
});
//maintenance page using middleware
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
//     next();
// });
app.use(express.static(__dirname + '/public'));



app.get('/',(requestToTheServer,responseFromTheServer) => {
        // responseFromTheServer.send('helllo from Express-Node');
        responseFromTheServer.render('home.hbs',{
            pageTitle:"You are home",
            welcomeMessage : [{'es':'Bienvenido al website',
        en:'Welcome to the wbesite'},2,'a']

        })

 		});
app.get('/about',(req, res) => {
        //res.send('This is the about us page'); we stop sending a simple response and replace it with a new rendered page.
        res.render('about.hbs',{
            pageTitle:"This is the About Page"
        });
 	});
app.get('/projects',(req, res) => {
        res.render('projects.hbs',{
            pageTitle:"This is the list of projects"
        });
 	});
app.get('/bad',(req, res) => {
        res.send({errorMessage:'The url requested doesnt exist'});
 		});

app.listen(port,() => {
        console.log(`Server running on port ${port}`);
 		});
