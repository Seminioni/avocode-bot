import dotenv from "dotenv";
import { bot } from "./bot.js";
// import { crawlTemporaryEmail } from "./crawlTemporaryEmail.js";
import axios from "axios-https-proxy-fix";
import FormData from "form-data";
// dotenv.config();

// bot(process.env.BOT_TOKEN);

() => {
  axios({
    method: "OPTIONS"
  }).then((result) => {
    // Handle result…
    console.log(result);
    console.log("Result", result, result.data);
  });
};
