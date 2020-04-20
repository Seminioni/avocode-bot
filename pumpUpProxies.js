import ProxyList from "free-proxy";


export const pumpUpProxies = async (lastPage = 10) => {
  const list = [];

  const proxyList = new ProxyList();

  console.log("Pumpying the proxies' list...");

  for (let page = 1; page < lastPage; page++) {
    list.push(...(await proxyList.fetchProxiesList(page)));
  }

  console.log(`Pumped up: ${list.length} proxies`);

  return list;
};
