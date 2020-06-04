const graphql = require('graphql');
const Author = require('../models/author');
const AuthorType = require('../schema/authorType');

const {
    GraphQLList,
    GraphQLInt,
    GraphQLID,
} = graphql;


const authorRootQuery = {
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
};

module.exports = authorRootQuery;
