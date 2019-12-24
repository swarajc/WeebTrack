const   express   = require('express'),
        cors      = require('cors'),
        mongoose  = require('mongoose'),
        bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

const usersRouter = require('./routes/api/user');

app.use('/signup', usersRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));