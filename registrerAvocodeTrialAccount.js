import puppeteer from "puppeteer";
import { getProxy } from "./getProxy.js";
import { crawlTemporaryEmail } from "./crawlTemporaryEmail.js";
import { nanoid } from 'nanoid';
import randomUserAgent from 'modern-random-ua';
import { sleep } from './sleep.js';

export const registerAvocodeTrialAccount = async () => {
  const proxy = await getProxy();

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${proxy.ip}:${proxy.port}`],
  });

  // const email = await crawlTemporaryEmail(browser);
  const email = 'pjrc36zw@notua.com';

  const password = nanoid();

  async function register(browser, email) {
    const startDate = new Date().getTime();
    
    const url = 'https://avocode.com/';

    let page = await browser.newPage();


    await page.setUserAgent(randomUserAgent.generate());

    try {
      console.log(`Visiting url: ${url}`);

      await page.goto(url, {
        timeout: 300000,
      });

      await page.type('#email', email); // Types instantly

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="login-form__email-btn"]`)
      ]);

      await page.type('#password', password);

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="registration-form__password-btn"]`)
      ])

      await page.type('#name', 'Vladimir Pytin');

      await page.select('select#jobTitle', 'designer');

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="registration-form__submit-btn"]`)
      ])

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="answer__other..."]`)
      ])

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="onboarding__skipInvitation-btn"]`)
      ])

      await Promise.all([
        page.waitForNavigation(),
        page.click(`[data-test="onboarding__skipInvitation-btn"]`)
      ])

    } catch (err) {
      console.log(`An error occured on url: ${url}`, err);
    } finally {
      // await page.close();

    }
  }

  await register(browser, email);
  // сконфигурировать паппетир
  // отдать его для работы модулю по получению временного эмейла
  // получить временный эмейл и вернуть паппетир
  //
};

registerAvocodeTrialAccount();
