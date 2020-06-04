const graphql = require('graphql');
const Book = require('../models/book');
const BookType = require('../schema/bookType');

const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = graphql;

const bookMutation = {
    addBook: {
        type: BookType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            genre: { type: new GraphQLNonNull(GraphQLString) },
            authorId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
            const book = new Book({
                name: args.name,
                genre: args.genre,
                authorId: args.authorId,
            });
            return book.save();
        },
    },
    updateBook: {
        type: BookType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            authorId: { type: GraphQLID },
        },
        resolve(parent, args) {
            const update = {};
            if (args.name) {
                update.name = args.name;
            }
            if (args.genre) {
                update.genre = args.genre;
            }
            if (args.authorId) {
                update.authorId = args.authorId;
            }
            return Book.findByIdAndUpdate({ _id: args._id }, { $set: update }, { new: true });
        },
    },
    deleteBook: {
        type: BookType,
        args: {
            _id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args) {
            const deletedBook = await Book.findByIdAndDelete({ _id: args._id });
            return deletedBook;
        },
    },
};

module.exports = bookMutation;
