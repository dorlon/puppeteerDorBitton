const puppeteer = require('puppeteer');
const {
  click,
  setText,
} = require('/Users/dorbi/OneDrive/Desktop/puppeteerDorBitton/lib/helpers');
describe('Login Test', () => {
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
  });

  it('Login Test - Invalid Credentials', async function () {
    await page.goto('http://zero.webappsecurity.com/');
    await click(page, '#signin_button');
    await setText(page, '#user_login', 'invalid creds'); //type email
    await setText(page, '#user_password', 'invalid password'); //type password
    await click(page, '#user_remember_me');
    await click(page, 'input[type="submit"]');
    await page.waitForSelector('.alert-error');
  });

  it('Login Test - Valid Credentials', async function () {
    await page.goto('http://zero.webappsecurity.com/');
    await click(page, '#signin_button');
    await setText(page, '#user_login', 'username'); //type email
    await setText(page, '#user_password', 'password'); //type password
    await click(page, '#user_remember_me');
    await click(page, 'input[type="submit"]');
    await page.waitForSelector('#error-information-button');
  });

  after(async function () {
    await browser.close();
  });
});
