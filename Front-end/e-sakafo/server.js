const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt')
const path = require('path');
const app = express()

app.use(express.static(__dirname + '/dist/e-sakafo'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +
    '/dist/e-sakafo/index.html'));
});
// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
require('./back-end/dotenv')

// Replace process.env.DB_URL with your actual connection string
const connectionString = process.env.DB_URL
const secretkey = process.env.SECRET_KEY
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('e-kaly')
    const userCollection = db.collection('user')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================
    // ========================
    //API
    // ========================
    app.get('/api', (req, res) => {
      res.json({ message: "api" })
    })
    app.post('/api/login', (req, res) => {
      userCollection.findOne(
        {
          username: req.body.username,
          password: bcrypt.hash(req.body.password, 12)
        }
      )
      jwt.sign({ user }, secretkey, function (err, token) {
        res.json({ token: token })
      });
    })
    app.get('/api/user', (req, res) => {
      db.collection('user').find().toArray()
        .then(user => {
          res.render('index.ejs', { user: user })
        })
        .catch(/* ... */)
    })

    app.post('/api/user', (req, res) => {
      var user = {
        username: req.body.username,
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role,
        password: bcrypt.hash(req.body.password, 12)
      }
      userCollection.insertOne(user)
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.put('/api/user', (req, res) => {
      userCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/api/user', (req, res) => {
      userCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)
