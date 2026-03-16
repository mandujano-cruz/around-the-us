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
const cors = require('cors');


const app = express();
const { NODE_ENV, JWT_SECRET, MONGO_URI, PORT=10000 } = process.env;


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión exitosa'))
  .catch((err) => console.error('Error al conec'));

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({message: "Recurso solicitado no encontrado"})
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
