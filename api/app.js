const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const graphql = require('./graphql');
const schema = require('./schema/schema');

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

    //TODO ici, il faut utiliser la variable graphql (c'est le fichier qui relie l'ensemble de ce que j'ai voulu factoriser)
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
    }));

    app.listen(8080, () => {
        console.log('now listennig for requests on port 8080');
    });
};

startServer();

module.exports = app;
