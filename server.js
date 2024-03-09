/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name:Gurpreet Kumar Student ID: 137470225 Date: ______________
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.render('home', { pageTitle: 'Assignment 2: Gurpreet Kumar - 137470225' });
    });

    app.get('/about', (req, res) => {
      res.render('about');
    });

    app.get('/lego/sets', (req, res) => {
      const theme = req.query.theme;
      if (theme) {
        legoData.getSetsByTheme(theme)
          .then(sets => res.json(sets))
          .catch(err => res.status(404).send(err));
      } else {
        const setList = legoData.getAllSets();
        res.json(setList);
      }
    });

    app.get('/lego/sets/:setNum', (req, res) => {
      const setNum = req.params.setNum;
      legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(err => res.status(404).send(err));
    });

    app.use((req, res) => {
      res.status(404).render('404');
    });

    app.listen(HTTP_PORT, () => console.log(`Server listening on port: ${HTTP_PORT}`));
  })
  .catch(err => {
    console.error('Error initializing Lego data:', err);
  });
