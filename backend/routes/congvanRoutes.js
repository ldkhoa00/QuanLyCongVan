const express = require('express');
const router = express.Router();
const congvanController = require('../controllers/congvanController')

router.get('/', congvanController.getAllCongvans);
router.get('/:id', congvanController.getCongvanById);
router.post('/', congvanController.createCongvan);
router.patch('/:id', congvanController.updateCongvan);
router.delete('/:id', congvanController.deleteCongvan);


module.exports = router;
