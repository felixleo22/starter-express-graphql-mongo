/* eslint-disable no-use-before-define */
const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent) {
                return Book.find({ authorId: parent.id });
            },
        },
    }),
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent) {
                return Author.findById(parent.authorId);
            },
        },
    }),
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            },
        },
        authorByAge: {
            type: AuthorType,
            args: { age: { type: GraphQLInt } },
            resolve(parent, args) {
                return Author.findById({ age: { $gte: args.age } });
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return Author.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            },
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                const update = {};
                if (args.name) {
                    update.name = args.name;
                }
                if (args.age) {
                    update.age = args.age;
                }
                return Author.findByIdAndUpdate({ _id: args._id }, { $set: update }, { new: true });
            },
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                const deletedAuthor = await Author.findByIdAndDelete({ _id: args._id });
                return deletedAuthor;
            },
        },
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
    },
});

const graphqlMiddleware = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = graphqlMiddleware;
