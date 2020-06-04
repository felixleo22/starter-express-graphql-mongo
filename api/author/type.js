const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'Author',
  fields: () => {
    // eslint-disable-next-line global-require
    const { BookType, BookModel } = require('../book');

    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve: (parent) => BookModel.find({ authorId: parent.id }),
      },
    };
  },
});
