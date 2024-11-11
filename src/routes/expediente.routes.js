// src/routes/expediente.routes.js
const express = require('express');
const router = express.Router();
const Expediente = require('../models/Expediente');

// Crear un nuevo expediente
router.post('/', async (req, res) => {
  const { paciente_id, fecha_creacion, notas, medico_id } = req.body;

  try {
    const expediente = await Expediente.create({
      paciente_id,
      fecha_creacion,
      notas,
      medico_id, // Asocia el expediente al médico
    });
    res.status(201).json(expediente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el expediente', error });
  }
});

// Obtener todos los expedientes
router.get('/', async (req, res) => {
  try {
    const expedientes = await Expediente.findAll();
    res.status(200).json(expedientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener expedientes', error });
  }
});

// Obtener un expediente por ID
router.get('/:id', async (req, res) => {
  try {
    const expediente = await Expediente.findByPk(req.params.id);
    if (expediente) {
      res.status(200).json(expediente);
    } else {
      res.status(404).json({ message: 'Expediente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el expediente', error });
  }
});

// Actualizar un expediente por ID
router.put('/:id', async (req, res) => {
  try {
    const expediente = await Expediente.findByPk(req.params.id);
    if (expediente) {
      await expediente.update(req.body);
      res.status(200).json(expediente);
    } else {
      res.status(404).json({ message: 'Expediente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el expediente', error });
  }
});

// Eliminar un expediente por ID
router.delete('/:id', async (req, res) => {
  try {
    const expediente = await Expediente.findByPk(req.params.id);
    if (expediente) {
      await expediente.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Expediente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el expediente', error });
  }
});

module.exports = router;
