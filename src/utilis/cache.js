// A minimal in-memory cache using a plain JS Map.
// Good enough for a single-server fresher project — no Redis needed.
// Note: this resets whenever the server restarts, and won't work across
// multiple server instances — that's the tradeoff vs. Redis, worth mentioning
// in interviews as the natural next upgrade for a production system.

const cache = new Map();  //creates an in-memory storage.
const TTL_MS = 5 * 60 * 1000; // cache each entry for 5 minutes

export const getFromCache = (key) => {
  const entry = cache.get(key);  //give me the cached value for the this key
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL_MS;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.value;
};

export const setInCache = (key, value) => {
  cache.set(key, { value, timestamp: Date.now() });  //putsomething into the cache
};

export const clearCacheKey = (key) => {
  cache.delete(key);
};
