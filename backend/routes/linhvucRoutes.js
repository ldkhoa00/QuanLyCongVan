const express = require('express');
const router = express.Router();
const linhvucController = require('../controllers/linhvucController')

router.get('/', linhvucController.getAllLinhvucs);
router.get('/:id', linhvucController.getLinhvucById);
router.post('/', linhvucController.createLinhvuc);
router.patch('/:id', linhvucController.updateLinhvuc);
router.delete('/:id', linhvucController.deleteLinhvuc);

module.exports = router;
