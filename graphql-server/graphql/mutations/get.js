const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const UserType = require('../types/user');
const UserModel = require('../../models/user');

exports.get = {
    type: UserType.userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const getUser = UserModel.findById(params.id).exec();
        if (!getUser) {
            throw new Error('Error')
        }
        return getUser;
    }
};
