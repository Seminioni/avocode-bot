import axios from "axios-https-proxy-fix";
import FormData from "form-data";
import { sleep } from "./sleep.js";

export const checkEmail = async ({ email, pass }) => {
  const form = new FormData();

  console.log(`Checking emails with login: ${email} and password: ${pass}`);

  form.append("email", email);
  form.append("pass", pass);
  form.append("act", "get");

  console.log(`I'm checking for emails...`);
  const post = await axios.post("https://tmpmail.pw/ajax.php", form, {
    headers: form.getHeaders(),
  });

  if (post.data.mails.length === 0) {
    await sleep(1000);
    return await checkEmail({ email, pass });
  } else {
    console.log("I've found emails!");
    return post.data.mails[0];
  }
};
