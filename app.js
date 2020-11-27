const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');

class App{
    constructor() {
        this.app = express();

        this.dbConnection();

        this.setViewEngine();

        this.setMiddleWare();

        this.setStatic();

        this.setLoclas();

        this.getRouting();

        this.errHandler();
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape : true,
            express : this.app
        });
    }

    setStatic() {
        this.app.use('/uplods', express.static('uplods'));
    }

    setLoclas() {
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    getRouting() {
        this.app.use(require('./controller'))
    }

    errHandler() {
        this.app.use( (req,res, _) => {
            res.status(404).render('common/404.html')
        });

        this.app.use( (err, req, res, _) => {
            res.status(500).render('common/500.html')
        });
    }

    setMiddleWare() {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

    dbConnection() {
        db.sequelize.authenticate()
        .then(() =>{
            console.log('Connection has been established successfully.');
        })
        .then(() =>{
            console.log('DB Sync complete');
        })
        .catch(err =>{
            console.log('Unble to connect to the database:', err);
        });
    }

}

module.exports = new App().app;