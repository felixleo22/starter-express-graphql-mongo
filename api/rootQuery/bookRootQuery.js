const graphql = require('graphql');
const Book = require('../models/book');
const BookType = require('../schema/bookType');

const {
    GraphQLList,
    GraphQLID,
} = graphql;

const bookRootQuery = {
    book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Book.findById(args.id);
        },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve() {
            return Book.find({});
        },
    },
};

module.exports = bookRootQuery;
