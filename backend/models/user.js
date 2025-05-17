const mongoose = require('mongoose');
const validator = require('validator');

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'El enlace del avatar no es válido'
    }
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

module.exports = mongoose.model('user', userSchema);
