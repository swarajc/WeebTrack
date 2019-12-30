const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    jwt = require('jsonwebtoken');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.set('secretKey', 'nodeRestApi');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());

let uri = process.env.ATLAS_URI,
    connection = mongoose.connection;

let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
};

mongoose.connect(uri, options);

connection
    .on('error', console.log)
    .on('disconnected', () => { console.log('Mongoose default connection is disconnected') })
    .once('open', () => {
        console.log("MongoDB Connected!");
    });

const usersRouter = require('./routes/api/user');

app.use('/users', usersRouter);

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