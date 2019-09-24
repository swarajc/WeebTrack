const   express    = require('express'),
        request    = require('request'),
        Jikan      = require('jikan-node'),
        bodyParser = require('body-parser'),
        logger     = require('morgan'),
        Data       = require('./data');

var cors = require('cors');

var app = express();

const mal = new Jikan();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true   }));
app.use(bodyParser.json());
app.use(logger('dev'));

//====ROUTES=====//

app.get('/', (req, res)=> {
    
    var currentDate = new Date(),
    season = '',
    month = currentDate.getMonth(),
    year = currentDate.getFullYear();
    
    if( month >= 3 && month <= 5)
    {
        season = 'spring';
    }
    else if(month >= 6 && month <= 8 )
    {
        season  = 'summer';
    }
    else if(month >= 9 && month <= 11)
    {
        season = 'fall';
    }
    else
    {
        season = 'winter';  
    }

    var url = 'https://api.jikan.moe/v3/season/' + year + '/'+ season;
    request(url, (error, response, body) => {
    if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            res.render("home", {data:data});
        }
    else{
        console.log(error);
    }
    });
}); 

app.get('/signup', (req, res)=> {
    res.render('signup');
})

app.post('/', (req, res)=>{
    res.redirect('/');
})
app.listen(3000, ()=>{
    console.log('Server started!');
});