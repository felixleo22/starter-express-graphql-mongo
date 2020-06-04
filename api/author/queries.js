const graphql = require('graphql');
const { AuthorType, AuthorModel } = require('./index');

const {
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = graphql;

module.exports = {
  author: {
    type: AuthorType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parent, args) => AuthorModel.findById(args.id),
  },
  authorByAge: {
    type: AuthorType,
    args: {
      age: { type: GraphQLInt },
    },
    resolve: (parent, args) => AuthorModel.findById({ age: { $gte: args.age } }),
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve: () => AuthorModel.find({}),
  },
};
