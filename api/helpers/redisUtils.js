const redis = require('redis');
const {REDIS_HOST, REDIS_PORT, REDIS_PASSWORD} = require('../config/environment');
 const client = redis.createClient({
  host: REDIS_HOST || 'localhost',
  port: REDIS_PORT || '6379',
  password: REDIS_PASSWORD,
});

 exports.read = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (error, response) => {
      if (error) reject(error);
      try {
        resolve(JSON.parse(response));
      } catch (e) {
        reject();
      }
    });
  });
};

 exports.write = (key, value, ttl = 60) =>
  new Promise((resolve, reject) => {
    try {
      resolve(client.set(key, JSON.stringify(value), 'EX', ttl));
    } catch (e) {
      reject({error: e.message});
    }
  });

 exports.flushAll = () => new Promise((resolve, reject) => {
  try {
    client.flushdb(() => resolve());
  } catch (e) {
    reject({error: e.message});
  }
});

 exports.quit = () => client.quit();