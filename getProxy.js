import { sleep } from './sleep.js';
import { shuffle } from './shuffle.js';
import { pumpUpProxies } from './pumpUpProxies.js';
import axios from "axios-https-proxy-fix";

export const getProxy = async () => {
  const proxies = await pumpUpProxies();

  const check = async (proxy) => {
    console.log(`Trying to connect over ${proxy.url} proxy`);

    try {
      const response = await axios
        .get("https://www.wikipedia.org/", {
          timeout: 10000,
          proxy: {
            host: proxy.ip,
            port: proxy.port,
          },
        })

      if (response.status == 200 || response.statusText == 'OK') {
        return {
          ...response,
          proxy
        };
      }
    } catch (e) {
      console.log('Connection attempt has failed. Will try another proxy...');
      await sleep(200);
    }
  };

  let response;
  const shuffled = shuffle(proxies);

  for (let i = 0; i < shuffled.length - 1; i++) {
    if (shuffled[i + 1] === undefined) {
      console.log('Proxies is over!');
      break;
    }

    const proxy = shuffled[i];
    
    response = await check(proxy);

    if (!!response && response.status == 200) break;
  }

  console.log("Successful proxy:", response.proxy.url);

  return response.proxy;
}
