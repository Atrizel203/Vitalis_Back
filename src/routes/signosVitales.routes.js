const express = require('express');
const router = express.Router();
const SignosVitales = require('../models/SignosVitales');

// Crear nuevos signos vitales
router.post('/', async (req, res) => {
  try {
    const signosVitales = await SignosVitales.create(req.body);
    res.status(201).json(signosVitales);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear los signos vitales', error });
  }
});

// Obtener todos los signos vitales
router.get('/', async (req, res) => {
  try {
    const signosVitales = await SignosVitales.findAll();
    res.status(200).json(signosVitales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener signos vitales', error });
  }
});

// Obtener signos vitales por ID
router.get('/:id', async (req, res) => {
  try {
    const signosVitales = await SignosVitales.findByPk(req.params.id);
    if (signosVitales) {
      res.status(200).json(signosVitales);
    } else {
      res.status(404).json({ message: 'Signos vitales no encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los signos vitales', error });
  }
});

// Actualizar signos vitales por ID
router.put('/:id', async (req, res) => {
  try {
    const signosVitales = await SignosVitales.findByPk(req.params.id);
    if (signosVitales) {
      await signosVitales.update(req.body);
      res.status(200).json(signosVitales);
    } else {
      res.status(404).json({ message: 'Signos vitales no encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los signos vitales', error });
  }
});

// Eliminar signos vitales por ID
router.delete('/:id', async (req, res) => {
  try {
    const signosVitales = await SignosVitales.findByPk(req.params.id);
    if (signosVitales) {
      await signosVitales.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Signos vitales no encontrados' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar los signos vitales', error });
  }
});

module.exports = router;
