const { MongoClient } = require("mongodb");
const debug = require("debug"),
      config = require("../config");


const dbDebug = debug('server:dbConnect');
const defaultDbName = "fbchatbot";

let _db;

const connectToServer = async function () {
    _db = await (await MongoClient.connect(config.dbConnString)).db(defaultDbName);
    if (_db){
        dbDebug(`Successfully connected to ${defaultDbName} on MongoDB`);
    }
    else{
        dbDebug(`Unable to connect to ${defaultDbName} on MongoDB`);
    }
};

const getDb = function() {
    return _db;
}

module.exports = {
    connectToServer,
    getDb
}