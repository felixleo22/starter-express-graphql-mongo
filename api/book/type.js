const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    // eslint-disable-next-line global-require
    const { AuthorType, AuthorModel } = require('../author');

    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve: (parent) => AuthorModel.findById(parent.authorId),
      },
    };
  },
});
