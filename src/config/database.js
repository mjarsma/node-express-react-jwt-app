module.exports = {
    'secret'    : 'devisawesome',
    'mongodbInstance' : process.env.mongoDB || 'My mongodb instance',
    'mongoDatabase':process.env.MONGODATABASE||'multiAuth',
    'appSecret':process.env.APPSECRET||'supersecret',
    'appName':process.env.APPNAME||'MyApp',
    'cookieName':process.env.KEY||'tokenizer',
    'httpPort':process.env.PORT||'8080',
    'database'  : 'mongodb://localhost:27017/test'
};
