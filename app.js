const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template', {
    autoescape : true,
    express : app
});

//미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends : false}));
app.use((req,res,next) => {
    req.body={

    }
});

//global view
app.use( (req,res,next) => {
    app.locals.isLogin = true;
    app.locals.req_path = req.path;
    next();
});

//이미지 등 불러오기
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) =>{
    res.send('hello express');
});

app.use('/admin', vipMW ,admin);

app.use('/contacts', contacts);

app.get('/testing', (req, res) =>{
    res.send('완료');
});

function vipMW(req, res, next){
    console.log('최우선 미들웨어');
    next();
}

app.use((req, res, _) => {
    res.status(404).render('common/404.html')
});


app.use( (err, req, res, _) => {
    res.status(500).render('common/500.html')
});

app.listen( port , ()=>{
    console.log('Express listening on port', port);
});