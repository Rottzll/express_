const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

function testMiddleWare(req, res, next){
    console.log('미들웨어');
    next();
}

router.get('/products', ctrl.get_products);
router.get('/products/write', ctrl.get_products_write);
router.post('/products/write', ctrl.post_products_write);
router.get('/product/detail/:id', ctrl.get_products_detail);

module.exports = router;
// admin url & 미들웨어