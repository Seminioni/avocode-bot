import axios from "axios-https-proxy-fix";
import FormData from "form-data";

(() => {
  const form = new FormData();
  // Second argument  can take Buffer or Stream (lazily read during the request) too.
  // Third argument is filename if you want to simulate a file upload. Otherwise omit.
  form.append('lang', 'EN');
  form.append('act', 'new');
  
  axios
    .post("https://tmpmail.pw/ajax.php", form, {
      headers: form.getHeaders(),
    })
    .then((result) => {
      // Handle result…
      console.log(result.data);
    });
})()
