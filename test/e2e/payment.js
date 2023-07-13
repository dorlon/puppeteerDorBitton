const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {
  click,
  setText,
  selectFromList,
} = require('/Users/dorbi/OneDrive/Desktop/puppeteerDorBitton/lib/helpers');
const { getText } = require('../../lib/helpers');
describe('Payment Test', () => {
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

  it('Display Payment Form', async function () {
    await page.goto('http://zero.webappsecurity.com/');
    await click(page, '#onlineBankingMenu');
    await click(page, '#pay_bills_link');
  });

  it('Make Payment', async function () {
    await selectFromList(page, '#sp_payee', 'Apple');
    await selectFromList(page, '#sp_account', 'Credit Card');
    await setText(page, '#sp_amount', '500');
    await setText(page, '#sp_date', '2023-04-22');
    await page.keyboard.press('Enter');
    await setText(page, '#sp_description', 'Payment for rent.');
    await click(page, '#pay_saved_payees');
    expect(await getText(page, '#alert_content')).to.equal();
  });

  after(async function () {
    await browser.close();
  });
});
