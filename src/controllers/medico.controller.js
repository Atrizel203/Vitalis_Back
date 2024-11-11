const Medico = require('../models/Medico');

exports.createMedico = async (req, res) => {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el médico', error });
  }
};

exports.getAllMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los médicos', error });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (medico) {
      res.json(medico);
    } else {
      res.status(404).json({ message: 'Médico no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el médico', error });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const updated = await Medico.update(req.body, { where: { id: req.params.id } });
    if (updated[0] === 1) {
      res.json({ message: 'Médico actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Médico no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el médico', error });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const deleted = await Medico.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Médico eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Médico no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el médico', error });
  }
};
