const MILISECONDS_in_second = 1000;
const SECONDS_in_minute = 60;
const MINUTES_in_hour = 60;

const cache = new Map();
module.exports = {
  has(key) {
    console.log("key:", key);
    return cache.has(key);
  },

  set(key, value) {
    console.log("setting cache -key: value", key, ":");
    // console.log("setting cache -key: value", key, ":", value[3].title);
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
    const diff =
      (Date.now() - timestamp) /
      (MILISECONDS_in_second * SECONDS_in_minute * MINUTES_in_hour);
    return diff > hours;
  },
};
