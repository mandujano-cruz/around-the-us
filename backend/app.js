const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const {errorHandler} = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { errors } = require('celebrate');
require('dotenv').config();

const app = express();
const { NODE_ENV, JWT_SECRET, PORT=3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(errors());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({message: "Recurso solicitado no encontrado"})
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(errorHandler);
app.use(errorLogger);