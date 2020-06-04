const graphql = require('graphql');

const { AuthorMutation, AuthorQueries } = require('./author');
const { BookMutation, BookQueries } = require('./book');

const {
  GraphQLSchema,
  GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...BookQueries,
    ...AuthorQueries,
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...AuthorMutation,
    ...BookMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
