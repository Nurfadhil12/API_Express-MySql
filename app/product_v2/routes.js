const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const control = require ('./controller')

router.get('/product', control.index);
router.get('/product/:id', control.data);
router.post('/product',upload.single('image'), control.uploadd);
router.delete('/product/:id',upload.single('image'),control.destroy);
router.put('/product/:id',upload.single('image'),control.update);

module.exports = router;