'use strict';

var db = require('node-mysql');
var DB = db.DB;

/**
  * MySQL Adapter for shrinku
  *
  **/
class MySQLAdapter {
  constructor(connectionOptions) {
    this.store = new DB(connectionOptions);
  }

  // find(opts = {}) {
  //   let data = this.store[opts.hash];
  //   return Promise.reject(new Error('Under construction.'));
  // }

  findByHash(hash = {}) {

  }

  findByUrl(url = {}) {

  }

  save(opts = {}) {
    
    return Promise.reject(new Error('Under construction.'));
  }
}

module.exports = MySQLAdapter;
