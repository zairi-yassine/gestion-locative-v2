const Property = require('../models/Property');
const Tenant = require('../models/Tenant');

// Récupère uniquement les propriétés de l'utilisateur connecté
exports.getAll = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.userId }).populate('tenant');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user.userId }).populate('tenant');
    if (!property) return res.status(404).json({ message: 'Propriété non trouvée' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user.userId });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.update = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Propriété non trouvée' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.remove = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
    if (!property) return res.status(404).json({ message: 'Propriété non trouvée' });
    res.json({ message: 'Propriété supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};