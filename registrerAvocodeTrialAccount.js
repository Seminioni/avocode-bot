import puppeteer from "puppeteer";
import { getNewEmail } from "./getNewEmail.js";
import { checkEmail } from "./checkEmail.js";

const register = async (page, credentials) => {
  await page.goto(`https://avocode.com`);

  const response = await page.evaluate(async (credentials) => {
    credentials = JSON.parse(credentials);

    try {
      // Fetching csrf-token
      const { csrftoken } = await fetch(
        "https://manager.avocode.com/api/get-csrftoken/",
        {
          credentials: "include",
          method: "GET",
          mode: "cors",
        }
      ).then((res) => res.json());

      // Check whether email exists
      await fetch("https://manager.avocode.com/api/account/email-exists/", {
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: `{"email": "${credentials.email}" }`,
        method: "POST",
        mode: "cors",
      });

      // Register account
      await fetch("https://manager.avocode.com/api/account/create/", {
        credentials: "include",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:75.0) Gecko/20100101 Firefox/75.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
          "Content-Type": "application/json;charset=utf-8",
          "X-CSRFToken": csrftoken,
        },
        body: `{"email": "${credentials.email}",
          "password": "${credentials.pass}",
          "signup_source":"index~hero",
          "repeat_signup":false,
          "plan":"teamwork-monthly",
          "invited":false,
          "invited_type":"n/a",
          "onboarding_variant":
          "remove-sidebar-add-invite-empty-state",
          "onboarding_experiment":"044-remove-sidebar-add-invite-empty-state",
          "onboarding_type":"regular",
          "first_visited_page":"index",
          "referrer_url":"$direct",
          "referrer_domain":"$direct"}`,
        method: "POST",
        mode: "cors",
      });
    } catch (e) {
      return e;
    }
  }, JSON.stringify(credentials));

  console.log(`I'm done with registration!`);

  return response;
};

export const registerAvocodeTrialAccount = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const [page] = await browser.pages();

  const credentials = await getNewEmail();

  try {
    await register(page, credentials);

    const letter = await checkEmail(credentials);

    const [confirmationLink] = letter.text
      .match(/^<.+$/gm)
      .filter((string) => !string.includes("app.avocode.com"))
      .map((string) => {
        return string.trim().substr(1, string.length - 2);
      });

    return `*email:* ${credentials.email}\n*pass:* ${credentials.pass}\n*link: *${confirmationLink}`;
  } catch (e) {
    console.warn("Error while registration of trial account", e);
  } finally {
    await page.close();
    await browser.close();
  }
};
