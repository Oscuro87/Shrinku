const shortid = require('shortid');

const DumbAdapter = require('./adapters/DumbAdapter');
const MemoryAdapter = require('./adapters/MemoryAdapter');
const MemoryAdapter = require('./adapters/MySQLAdapter');

class Shrinku {
  constructor(opts) {
    this.opts = opts || {};
    this.adapters = {};
  }

  static get Adapters() {
    return {
      MemoryAdapter,
      DumbAdapter,
      MySQLAdapter,
    };
  }

  addAdapter(name, adapter, opts) {
    if (name === 'default') {
      return Promise.reject(new Error('Name \'default\' is reserved.'));
    }

    const adaptersLength = Object.keys(this.adapters).length;

    this.adapters[name] = adapter;

    if (!adaptersLength || !opts) {
      this.adapters.default = this.adapters[name];
    }

    return Promise.resolve(this.adapters[name]);
  }

  shrink(opts = {}) {
    const options = Object.assign({}, {
      save: true,
    }, opts);

    return new Promise((resolve, reject) => {
      if(!opts.url) return reject(new Error('No opts.url specified.'));
      if(! ("string" === typeof opts.url)) return reject(new Error('Please provide a string as Url.'));

      const hash = shortid.generate();

      if (options.save && Object.keys(this.adapters).length) {
        return this.adapters.default.save({
          url: options.url,
          hash,
        }).then(resolve);
      }

      return resolve({ hash, url: options.url });
    });
  }

  unshrink(opts = {}) {
    return new Promise((resolve, reject) => {
      if(!opts.hash) return reject(new Error('No opts.hash specified.'));

      return this.adapters['default'].findByHash({ hash: opts.hash }).then(resolve);
    });
  }
}

module.exports = Shrinku;
