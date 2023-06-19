const path = require("path");
const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const {User} = require("./models/user");
const router = express.Router();
const mongoose = require('mongoose');
const {authRoutes} = require("./routes/auth");


// const url = 'mongodb://root:example@mongo:27017';

let _db;
const dbName = 'local';
const collectionName = 'collectionName';

// const mongoConnect = (callback) => MongoClient.connect(url).then((client) => {
//     _db = client.db(dbName);
//     callback(client);
// }).catch((err) => {
//     console.log(err);
//     throw err;
// });

const clientPath = path.join(__dirname, 'client');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.static(path.join(clientPath, 'build')));
app.use(express.static("public"));

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}

// start express server on port 5000
const port = process.env.port || 5555

// mongoConnect((client) => {
//     app.listen(port, () => {
//         // console.log(_db.collection(collectionName).find({ /* Your query criteria */ }))
//         const user = new UserModel({name: 'test', email: 'test'});
//         user.save();
//
//         console.log("server started on port " + port);
//     });
// })

async function main() {
    try {
        await mongoose.connect('mongodb://root:example@mongo:27017/chronoflow?authSource=admin');
    } catch (e) {
        console.log(e)
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().then(() => {
    console.log('GGGGGGGGGgg')
    app.listen(port, () => {
        console.log("server started on port " + port);
    });
}).catch(err => {
    console.log(err);
});