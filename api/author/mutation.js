const graphql = require('graphql');
const { AuthorType, AuthorModel } = require('./index');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

module.exports = {
  addAuthor: {
    type: AuthorType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent, args) {
      const author = new AuthorModel({
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
      return AuthorModel.findByIdAndUpdate({ _id: args._id }, { $set: update }, { new: true });
    },
  },
  deleteAuthor: {
    type: AuthorType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      const deletedAuthor = await AuthorModel.findByIdAndDelete({ _id: args._id });
      return deletedAuthor;
    },
  },
};
