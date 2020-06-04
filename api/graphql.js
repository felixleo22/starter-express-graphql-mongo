const graphql = require('graphql');

const AuthorMutation = require('./mutation/authorMutation');
const AuthorRootQuery = require('./rootQuery/authorRootQuery');

const BookMutation = require('./mutation/bookMutation');
const BookRootQuery = require('./rootQuery/bookRootQuery');


const {
    GraphQLSchema,
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        BookRootQuery,
        AuthorRootQuery,
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        AuthorMutation,
        BookMutation,
    }),
});

const graphqlMiddleware = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = graphqlMiddleware;
