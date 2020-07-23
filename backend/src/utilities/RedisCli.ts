const redis = require("redis");
import config from "../config/redis";

const redisClient = process.env.ENVIRONMENT !== 'test' ? redis.createClient(config) : null

const getCache = async (key: string) =>
  new Promise((resolve, reject) =>
    redisClient.get(key, (err, value) => {
      if (value) resolve(JSON.parse(value));
      else reject("not cached");
    })
  );

const setCache = async (key: string, value: any, expireInSeconds?: number): Promise<any> => {
  const callback = (err, value) => {if (err) throw err;}
  expireInSeconds ? 
    redisClient.set(key, JSON.stringify(value), 'EX', expireInSeconds, callback) :   
    redisClient.set(key, JSON.stringify(value), callback);    
  return value;
};

const getOrSet = (key:string, callback:() => any, expireInSeconds?: number): Promise<any> => {
  return new Promise(async (resolve) => {
    let value;        

    try {
      value = await getCache(key);
      colorTrace(`Cache de ${key} utilizado`, "green");
    } catch (err) {
      value = await callback();
      setCache(key, value, expireInSeconds);
      colorTrace(
        `Cache de ${key} não encontrado, novo cache realizado!`,
        "blue"
      );
    }
    // redisClient.quit();
    resolve(value);
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    redisClient.keys("*", (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const flushall = () => {
  return new Promise((resolve, reject) => {
    redisClient.flushall((err) => {
      if (err) reject(err);
      else resolve("all flushed");
    });
  });
};

function colorTrace(msg, color) {
  console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}

const RedisCli = { getCache, setCache, getAll, flushall, getOrSet };

export { RedisCli };
