'use strict';

class MemoryAdapter {
  constructor() {
    this.store = {};
  }

  // find(opts = {}) {
  //   let data = this.store[opts.hash];
  //
  //   if(data)
  //     return Promise.resolve({ hash: opts.hash, url: data });
  //   else
  //     return Promise.reject(new Error('Not found.'));
  // }

  findByHash(hash = {}) {
    let data = this.store[hash.hash];

    if (data) {
      return Promise.resolve({ hash: hash.hash, url: data });
    } else {
      return Promise.reject(new Error('Not found.'));
    }
  }

  findByUrl(url = {}) {
    let data = this.store[url.url];

    if (data) {
      return Promise.resolve({ hash: data, url: url.url });
    } else {
      return Promise.reject(new Error('Not found.'));
    }
  }

  save(opts = {}) {
    this.store[opts.hash] = opts.url;
    return Promise.resolve({ hash: opts.hash, url: opts.url });
  }
}

module.exports = MemoryAdapter;
