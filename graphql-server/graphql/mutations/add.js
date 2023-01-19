const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const UserType = require('../types/user');
const UserModel = require('../../models/user');

exports.add = {
    type: UserType.userType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        const uModel = new UserModel(params);
        const newUser = uModel.save();
        if (!newUser) {
            throw new Error('Error');
        }
        return newUser
    }
};
