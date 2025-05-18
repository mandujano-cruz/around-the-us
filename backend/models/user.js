const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'El enlace del avatar no es válido'
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'El formato del correo no es válido',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 16,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if(!user) return Promise.reject(new Error ('Contraseña o correo electrónico incorrecto'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if(!matched) return Promise.reject(new Error ('Contraseña o correo electrónico incorrecto'));
          return user;
        })
    });
}

module.exports = mongoose.model('user', userSchema);
