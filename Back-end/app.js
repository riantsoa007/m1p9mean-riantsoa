
const express = require('express')
const mangose = require('mongoose');
let cors = require('cors');
const { default: mongoose } = require('mongoose');
var userRoute = require('./routes/UserRoute');
const path = require('path')
const app = express()
//Gestion Cors
app.use(cors({
    origin: "http://localhost:3000/"
}));
app.use(express.static(__dirname + "/web"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//conection mangoDB
const connectionString = process.env.DB_URL

mongoose.connect("mongodb+srv://admin:root@cluster0.rf865.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connection etablie')
    }).catch((error) => {
        console.log(error);
    });

//app.use('/api/user', userRoute);

app.use(express.static('dist/e-sakafo'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/e-sakafo' }),
);

module.exports = app;