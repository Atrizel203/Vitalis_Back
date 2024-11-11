const Analisis = require('../models/Analisis');

exports.createAnalisis = async (req, res) => {
  try {
    const analisis = await Analisis.create(req.body);
    res.status(201).json(analisis);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el análisis', error });
  }
};

exports.getAllAnalisis = async (req, res) => {
  try {
    const analisisList = await Analisis.findAll();
    res.json(analisisList);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los análisis', error });
  }
};

exports.getAnalisisById = async (req, res) => {
  try {
    const analisis = await Analisis.findByPk(req.params.id);
    if (analisis) {
      res.json(analisis);
    } else {
      res.status(404).json({ message: 'Análisis no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el análisis', error });
  }
};

exports.updateAnalisis = async (req, res) => {
  try {
    const updated = await Analisis.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 1) {
      res.json({ message: 'Análisis actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Análisis no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el análisis', error });
  }
};

exports.deleteAnalisis = async (req, res) => {
  try {
    const deleted = await Analisis.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Análisis eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Análisis no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el análisis', error });
  }
};
