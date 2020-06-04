const graphql = require('graphql');
const { BookType, BookModel } = require('./index');

const {
  GraphQLList,
  GraphQLID,
} = graphql;

module.exports = {
  book: {
    type: BookType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (parent, args) => BookModel.findById(args.id),
  },
  books: {
    type: new GraphQLList(BookType),
    resolve: () => BookModel.find({}),
  },
};
