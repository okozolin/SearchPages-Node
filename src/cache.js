const cache = new Map();
module.exports = {
  has(key) {
    console.log("key:", key);
    return cache.has(key);
  },

  set(key, value) {
    return cache.set(key, [value, Date.now()]);
  },

  get(key) {
    return cache.get(key)[0];
  },

  delete(key) {
    return cache.delete(key);
  },

  clear() {
    return cache.clear();
  },
  isExpired(key, hours) {
    const [_, timestamp] = cache.get(key);
    console.log("timestamp----", timestamp);
    console.log("date now", Date.now());
    const diff = (Date.now() - timestamp) / (1000 * 60 * 60);
    console.log("Date.now() - timestamp---", diff);
    // return (Date.now() - timestamp) / (1000 * 60 * 60) > hours;
    return diff > hours;
  },
};
