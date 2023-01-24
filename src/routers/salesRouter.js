const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.index);
router.get('/:id', salesController.show);
router.delete('/:id', salesController.remove);
router.put('/:id', salesController.update);

module.exports = router;