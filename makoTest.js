const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {
  click,
  setText,
  clickByString,
  contentTrim,
  content,
  loadUrl,
  waitForText,
} = require('./lib/helpers');

describe('Mako Test', () => {
  let browser;
  let page;
  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    page = await browser.newPage();
    await loadUrl(page, 'https://www.mako.co.il');
  });

  it('Check titles', async function () {
    await waitForText(page, 'body', 'התפנית');
  });

  after(async function () {
    browser.close();
  });
});
