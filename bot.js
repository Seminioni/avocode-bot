import Telegraf from "telegraf";
import { crawlTemporaryEmail } from "./crawlTemporaryEmail.js";

export const bot = (token) => {
  const bot = new Telegraf(token);
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.command("tempEmail", async (ctx) => {
    const email = await crawlTemporaryEmail();

    return ctx.reply(email);
  });
  bot.command("avocodeTrialAccount", async (ctx) => {
    
  });
  bot.help((ctx) => ctx.reply(`
    Here is the list of available commands:
    - /tempEmail — returns temorary email
    - /avocodeTrialAccount - returns Avocode's trial account
  `));
  bot.launch();
};
