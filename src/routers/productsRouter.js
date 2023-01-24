const express = require('express');
const productsController = require('../controllers/productsController');
const productNameValidation = require('../middlewares/productNameValidation');

const router = express.Router();

router.get('/', productsController.index);
router.get('/search', productsController.query);
router.get('/:id', productsController.show);
router.post('/', productNameValidation, productsController.create);
router.put('/:id', productNameValidation, productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;