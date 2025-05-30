const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then(cards => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error ('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.status(200).send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.status(200).send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } },{ new: true })
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.status(200).send(card))
    .catch(next);
};
