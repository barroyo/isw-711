module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://127.0.0.1/graphql',
        app: {
            name: 'graphql'
        }
    },
    production: {
        db: process.env.MONGODB, // url db mongoDB
        app: {
            name: 'graphql'
        }
    }
};
