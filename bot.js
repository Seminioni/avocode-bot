import Telegraf from "telegraf";
import { registerAvocodeTrialAccount } from "./registrerAvocodeTrialAccount.js";
import { getNewEmail } from "./getNewEmail.js";

export const bot = (token) => {
  const bot = new Telegraf(token);

  bot.start((ctx) => ctx.reply("Welcome"));

  bot.command("tempEmail", async (ctx) => {
    const email = await getNewEmail();

    return ctx.reply(email);
  });

  bot.command("avocodeTrialAccount", async (ctx) => {
    const credentials = await registerAvocodeTrialAccount();

    return ctx.replyWithMarkdown(credentials, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
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
