import Telegraf from "telegraf";
import { registerAvocodeTrialAccount } from "./registrerAvocodeTrialAccount.js";

export const bot = (token) => {
  const bot = new Telegraf(token);
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.command("tempEmail", async (ctx) => {
    const email = await crawlTemporaryEmail();

    return ctx.reply(email);
  });
  bot.command("avocodeTrialAccount", async (ctx) => {
    const credentials = await registerAvocodeTrialAccount();

    return ctx.replyWithHTML(credentials);
  });
  bot.help((ctx) =>
    ctx.reply(`
    Here is the list of available commands:
    - /tempEmail — returns temporary email
    - /avocodeTrialAccount - returns Avocode's trial account
  `)
  );
  bot.launch();
};
