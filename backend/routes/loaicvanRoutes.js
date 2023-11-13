const express = require('express');
const router = express.Router();
const loaicvanController = require('../controllers/loaicvanController')

router.get('/', loaicvanController.getAllLoaicvans);
router.get('/:id', loaicvanController.getLoaicvanById);
router.post('/', loaicvanController.createLoaicvan);
router.patch('/:id', loaicvanController.updateLoaicvan);
router.delete('/:id', loaicvanController.deleteLoaicvan);


module.exports = router;
