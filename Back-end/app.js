//VARIABLE
const DB_URL = "mongodb+srv://admin:root@cluster0.rf865.mongodb.net/e-kaly?retryWrites=true&w=majority"

const NODE_ENV = "production"

const SECRET_KEY = "esakafo"

const URL_DEV = "http://localhost:4200"

const URL_PROD = "https://e-sakafo-m1-riantsoa.herokuapp.com/api"
/////

const express = require('express')
const { default: mongoose } = require('mongoose');
const app = express()

let cors = require('cors');
const restaurantRoutes = require("./routes/RestaurantRoute");
const userRoutes = require("./routes/UserRoute");
const bodyParser = require('body-parser')
const path = require('path')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(cors({
     origin: URL_DEV
   // origin: URL_PROD 
}));
//requirements
//require('./dotenv')
//Gestion Cors

app.use(express.static(__dirname + "/web"));

//middleware
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
// Routes

app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
//conection mangoDB
const connectionString = DB_URL

mongoose.connect(connectionString)
    .then(() => {
        console.log('Connection etablie')
    }).catch((error) => {
        console.log(error);
    });


// app.use(express.static(__dirname));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + '..//e-sakafo/index.html'));
// });
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