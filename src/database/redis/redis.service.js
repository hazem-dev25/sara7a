import { client } from "./redis.js";

export const set = async ({ key, value, ttl } = {}) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  if (ttl) {
    return await client.set(key, value, { EX: ttl });
  }

  return await client.set(key, value);
};

export const get = async (key) => {
  let data = await client.get(key);

  try {
    data = JSON.parse(data);
  } catch (err) {}

  return data;
};

export const del = async (key) => {
  return await client.del(key);
};

export const exists = async (key) => {
  return await client.exists(key);
};

export const mget = async (keys = []) => {
  let values = await client.mGet(keys);

  return values.map((val) => {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  });
};

export const keysByPrefix = async (prefix) => {
  return await client.keys(`${prefix}*`);
};

export const setIfNotExists = async ({ key, value, ttl }) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  return await client.set(key, value, {
    NX: true,
    EX: ttl,
  });
};

export const increment = async (key) => {
  return await client.incr(key);
};

export const ttl = async (key) => {
  return await client.ttl(key);
};

export const deleteByPrefix = async (prefix) => {
  const keys = await client.keys(`${prefix}*`);

  if (keys.length === 0) return 0;

  return await client.del(keys);
};