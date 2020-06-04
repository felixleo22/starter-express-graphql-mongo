const graphql = require('graphql');
const Book = require('../models/book');
const BookType = require('./bookType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
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

module.exports = AuthorType;
