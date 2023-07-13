const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {
  click,
  setText,
  selectFromList,
  clickByString,
  contentTrim,
  content,
} = require('/Users/dorbi/OneDrive/Desktop/puppeteerDorBitton/lib/helpers');

describe('Currency Exchange Test', () => {
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      devtools: false,
    });
    page = await browser.newPage();
    await page.setDefaultTimeout(10000);
    await page.setDefaultNavigationTimeout(20000);

    await page.goto('http://zero.webappsecurity.com/login.html');
    await setText(page, '#user_login', 'username'); //type email
    await setText(page, '#user_password', 'password'); //type password
    await click(page, '#user_remember_me');
    await click(page, 'input[type="submit"]');
  });

  it('Display Currency Exchange Form', async function () {
    //TODO
  });

  it('Display Currency', async function () {
    //TODO
  });

  after(async function () {
    await browser.close();
  });
});
