const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {
  click,
  setText,
  getText,
  getCount,
  clickByString,
  contentTrim,
  content,
  loadUrl,
} = require('./lib/helpers');

describe('Home URL testing', () => {
  let browser;
  let page;
  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    page = await browser.newPage();
    await loadUrl(page, '');
  });

  after(async function () {
    browser.close();
  });
});
