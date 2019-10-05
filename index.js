const   express   = require('express'),
        cors      = require('cors'),
        mongoose  = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex :true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB Connected!");
})

const usersRouter = require('./routes/user');

app.use('/users', usersRouter)

app.listen(port, () => console.log(`Server running on port ${port}`));