'use strict';

class MySQLAdapter {
  constructor() {
    this.store = {};

  }

  find(opts = {}) {
    let data = this.store[opts.hash];
    return Promise.reject(new Error('Under construction.'));
  }

  save(opts = {}) {
    this.store[opts.hash] = opts.url;
    return Promise.reject(new Error('Under construction.'));
  }
}

module.exports = MySQLAdapter;
