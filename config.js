const { NODE_ENV } = process.env;

module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb://localhost:27017/newsexplorer';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
