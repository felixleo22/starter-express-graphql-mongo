const graphql = require('graphql');
const Author = require('../models/author');
const AuthorType = require('../schema/authorType');

const {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;


const authorMutation = {
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
};

module.exports = authorMutation;
