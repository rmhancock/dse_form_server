const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./router.js');
const filter = require('content-filter');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));
app.use(parser.json())
app.use(filter())

let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// process.env.MONGODB_URI
// 'mongodb://localhost:27017'
// ds053978.mlab.com:53978/
// heroku_g4jmjlqw


MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((client) => {
        console.log('database started');
        const db = client.db('formDatabase');
        const formCollection = db.collection('formCollection');
        const formRouter = createRouter(formCollection);
        app.use('/', formRouter);
    })
    .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`App running on port ${this.address().port}`);
});