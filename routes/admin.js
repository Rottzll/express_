const express = require('express');
const router = express.Router();

function T_MiddleWare(req, res, next){
    console.log('첫번째 미들웨어');
    next();
}

function T_MiddleWare2(req, res, next){
    console.log('2번째 미들웨어');
    next();
}

function loginReq(req,res,next){

}

router.get('/', T_MiddleWare, T_MiddleWare2, (req, res) =>{

    res.send('admin 이후 url');
});

router.get('/products', (req, res) =>{
    //res.send('admin products 이후 url');
    res.render('admin/products.html', {
        message : 'hello?',
        online : 'express'
    })
});

router.get('/products/write', (req, res) => {

        res.render('admin/write.html')
});

router.post('/products/write', (req,res)=>{

        res.send(req.body)
});

module.exports = router;
