const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

// Crear un nuevo paciente
router.post('/', async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paciente', error });
  }
});

// Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pacientes', error });
  }
});

// Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (paciente) {
      res.status(200).json(paciente);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el paciente', error });
  }
});

// Actualizar un paciente por ID
router.put('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (paciente) {
      await paciente.update(req.body);
      res.status(200).json(paciente);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error });
  }
});

// Eliminar un paciente por ID
router.delete('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (paciente) {
      await paciente.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error });
  }
});

module.exports = router;
