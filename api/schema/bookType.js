const graphql = require('graphql');
const Author = require('../models/author');
const AuthorType = require('./authorType');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;

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

module.exports = BookType;
