const serverlessExpress = require('@vendia/serverless-express');
const app = require('./src/app.js');

exports.handler = serverlessExpress({ app });
