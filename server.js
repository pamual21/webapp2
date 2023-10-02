/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Asim Naveed Student ID: 141631192 Date: 29 september
*
*  Online (Cyclic) Link: https://witty-toad-sweatpants.cyclic.app
*
********************************************************************************/ 

const HTTP_PORT = process.env.PORT || 9080;

const express = require('express');
const path = require('path');
const app = express();

const data = require(path.join(__dirname, 'blog-service.js'));

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/students', (req, res, next) => {
  data
    .getAllStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('Error retrieving employees: ' + err);
      res.json({ message: err });
    });
});

app.get('/intlstudents', (req, res, next) => {
  data
    .getInternationalStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('Error retrieving managers: ' + err);
      res.json({ message: err });
    });
});

app.get('/programs', (req, res, next) => {
  data
    .getPrograms()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('Error retrieving departments: ' + err);
      res.json({ message: err });
    });
});

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

data
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT);
    console.log('Express http server listening on ' + HTTP_PORT);
  })
  .catch((err) => {
    console.log('Error starting server: ' + err + ' aborting startup');
  });
