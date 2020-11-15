const { Router } = require('express');
const router = Router()

router.use('/admin', require('./admin'));

module.exports = router;

// 대분류 url & 폴더 위치