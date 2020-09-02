const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require('express-session');
const knexStorage = require('connect-session-knex')(session);
const knexConnection = require('../data/dbConfig.js');

const server = express();

const sessionConfig = {
   name: 'wl_storage',
   secret: process.env.COOKIE_SECRET || 'null',
   cookie: {
      maxAge: 86400,
      secure: process.env.NODE_ENV === 'development' ? false : true,
      httpOnly: true,
   },
   resave: false,
   saveUninitialized: true,
   store: new knexStorage({
      knex: knexConnection,
      clearInterval: 86400,
      tablename: 'user_session',
      sidfieldname: 'id',
      createtable: true,
   }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
   res.send('Server is currently running.');
});

module.exports = server;
