exports.get_products = (_, res) => {
    res.render('admin/products.html', {message : "Hello"}); 
    //message 변수 템플릿으로 내보냄
}

exports.get_products_write = (_, res) => {
    res.render('admin/write.hrml');
}

exports.post_products_write = (req, res) => {
    res.send(req.body);
}

//라우팅 - 컨트롤러 역할