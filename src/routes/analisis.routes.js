const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisis.controller');

router.post('/', analisisController.createAnalisis);
router.get('/', analisisController.getAllAnalisis);
router.get('/:id', analisisController.getAnalisisById);
router.put('/:id', analisisController.updateAnalisis);
router.delete('/:id', analisisController.deleteAnalisis);

module.exports = router;
