const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./api/graphql');

const app = express();

const startServer = async () => {
  await mongoose.connect('mongodb://mongodb/databaseTest2', {
    useNewUrlParser: true,
  });
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

  app.get('/', (req, res) => {
    res.json({ name: 'http://localhost:8080/graphql' });
  });

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));

  app.listen(8080, () => console.log('now listennig for requests on port 8080'));
};

startServer();

module.exports = app;
