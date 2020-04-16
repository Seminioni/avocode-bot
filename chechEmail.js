import axios from "axios-https-proxy-fix";
import FormData from "form-data";

(() => {
  const form = new FormData();
  // Second argument  can take Buffer or Stream (lazily read during the request) too.
  // Third argument is filename if you want to simulate a file upload. Otherwise omit.
  form.append('email', 'plcz37qm@notua.com',);
  form.append('pass', 'dJm6kuE4zE');
  form.append('act', 'get');
  
  axios
    .post("https://tmpmail.pw/ajax.php", form, {
      headers: form.getHeaders(),
    })
    .then((result) => {
      // Handle result…
      console.log(result.data);
    });
})()
