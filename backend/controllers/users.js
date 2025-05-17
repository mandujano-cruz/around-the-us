const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      if(!users){
        const error = new Error('Usuarios no encontrados');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(users)
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      if(err.name === 'DocumentNotFoundError') return res.status(404).send({ message: err.message });

      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name)
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name)
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Los datos proporcionados no son válidos' });
      if(err.statusCode === 404) return res.status(404).send({ message: err.message });
      res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    });
};
