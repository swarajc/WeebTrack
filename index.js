const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());

let uri = process.env.ATLAS_URI,
    connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

connection
    .on('error', console.log)
    .on('disconnected', () => { console.log('Mongoose default connection is disconnected') })
    .once('open', () => {
        console.log("MongoDB Connected!");
    });

const usersRouter = require('./routes/api/user');

app.use('/signup', usersRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));

let gracefulExit = () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection with DB is disconnected through app termination');
        process.exit(0);
    });
}

process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit);