const Shrinku = require('./shrinku');
const shrinku = new Shrinku();

// shrinku.addAdapter('memory', new Shrinku.Adapters.MemoryAdapter());
shrinku.addAdapter('mysql', new Shrinku.Adapters.MySQLAdapter({
  host: 'localhost',
  user: 'loot',
  password: 'loot',
  database: 'shrinku_test',
  connectionLimit: 50,
  useTransation: {
    connectionLimit: 1
  }
}));

shrinku
  .shrink({ url : 'http://google.be' })
  .then((shorturl) => {
    console.log(shorturl);

    return shrinku.unshrink({ hash: shorturl.hash });
  })
  .then((longurl) => {
    console.log(longurl);
  })
  .then(() => shrinku.shrink({url: 'test'}))
  .then(console.log)
  .catch((err) => {
    console.log(err);
  });
