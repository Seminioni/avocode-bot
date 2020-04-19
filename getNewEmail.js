import axios from "axios-https-proxy-fix";
import FormData from "form-data";
import { getProxy } from './getProxy.js';

export const getNewEmail = async (useProxy = false) => {
  const form = new FormData();

  const proxy = useProxy && await getProxy();

  form.append("lang", "EN");
  form.append("act", "new");

  const response = await axios.post("https://tmpmail.pw/ajax.php", form, {
    headers: form.getHeaders(),
    timeout: 20000,
    ...(useProxy && { proxy: {
      host: proxy.ip,
      port: proxy.port
    } })
  });

  console.log('Returning email:', response.data);
  return response.data;
};
