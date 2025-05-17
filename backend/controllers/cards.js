const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      if(!cards) {
        const error = new Error('Tarjetas no encontradas');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(cards)
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });

      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });

      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error ('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });

      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } },{ new: true })
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};
