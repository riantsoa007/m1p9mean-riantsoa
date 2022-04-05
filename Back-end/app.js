
const express = require('express')
let cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRoutes = require("./routes/UserRoute");
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
//requirements
require('./dotenv')
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
//middleware
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
// Routes

app.use("/api/user", userRoutes);
//conection mangoDB
const connectionString = process.env.DB_URL

mongoose.connect(connectionString)
    .then(() => {
        console.log('Connection etablie')
    }).catch((error) => {
        console.log(error);
    });

// app.use(express.static(__dirname + '/dist/<app-name>'));
// app.get('/*', function(req,res) {
// res.sendFile(path.join(__dirname+
// '/dist/<app-name>/index.html'));});
app.use(express.static('./dist/e-sakafo'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/e-sakafo' }),
);
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;