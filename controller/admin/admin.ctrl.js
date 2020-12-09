const models = require('../../models');
const Products = require('../../models/Products');

exports.get_products = (_, res) => {
    // res.render('admin/products.html', {}); 
    // message 변수 템플릿으로 내보냄

    models.products.findAll({

    }).then((ProductsList) => {
        res.render('admin/products.html', {ProductsList});
    });
}

exports.get_products_write = (_, res) => {
    res.render('admin/write.html');
};

exports.post_products_write = (req, res) => {
    //res.send(req.body);
    models.products.create(req.body).then( () =>{
        res.redirect('/admin/products');
    });
}

exports.get_products_detail = (req,res) => {
    models.products.findByPk(req.params.id).then((ProductsList) =>{
        res.render('admin/detail.html', {ProductsList});
    });
};

exports.get_products_edit = (req, res) => {
    models.products.findByPk(req.params.id).then( (ProductsList) => {
        res.render('admin/write.html', {ProductsList});
    });
};

exports.post_products_edit = (req, res) => {
    models.products.update({
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    },{
        where : {id : req.params.id}   
    }).then (() => {
        res.redirect('/admin/products/detail/' + req.params.id);
    });
}

exports.get_products_delete = (req,res) => {
    models.products.destroy({
        where : {id : req.params.id}
    }).then(()=>{
        res.redirect('/admin/products');
    });
};

//라우팅 - 컨트롤러 역할