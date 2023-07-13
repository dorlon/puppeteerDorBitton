const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const {
  click,
  setText,
} = require('/Users/dorbi/OneDrive/Desktop/puppeteerDorBitton/lib/helpers');
describe('Feedback Test', () => {
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

  it('Display Feedback Form', async function () {
    await page.goto('http://zero.webappsecurity.com/');
    await click(page, '#feedback');
  });

  it('Submit Feedback Form', async function () {
    await setText(page, '#name', 'Name');
    await setText(page, '#email', 'dor@dor.com');
    await setText(page, '#subject', 'Subject');
    await setText(page, '#comment', 'Hello world');
    await click(page, 'input[type="submit"]');
  });

  it('Display Results Page', async function () {
    await page.waitForSelector('#feedback-title');
    const url = await page.url();
    expect(url).to.include('/sendFeedback.html');
  });

  after(async function () {
    await browser.close();
  });
});
