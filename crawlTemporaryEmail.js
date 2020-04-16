import { getProxy } from "./getProxy.js";

const url = "https://tmpmail.pw/";

const checkWhetherIsValidEmail = (string) => {
  return typeof string === "string" && string.includes("@");
};

export const crawlTemporaryEmail = async (browser) => {
  const startDate = new Date().getTime();

  let email = "";
  let page = await browser.newPage();

  try {
    console.log(`Visiting url: ${url}`);

    await page.goto(url, {
      timeout: 300000
    });

    email = await page.evaluate(
      () => document.querySelector(".output .value").textContent
    );

    console.log(`Your temprorary email: ${email}`);
  } catch (err) {
    console.log(`An error occured on url: ${url}`, err);
  } finally {
    await page.close();
  }

  if (!checkWhetherIsValidEmail(email)) {
    // В ответе как правило ничего не возвращается, если совершено много запросов
    email = "Вы создали слишком много почтовых ящиков в течение часа. Попробуйте чуть позже";
  }

  console.log(
    `Time elapsed ${Math.round((new Date().getTime() - startDate) / 1000)} s`
  );

  return email;
};
