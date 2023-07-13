const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const {
  click,
  clickByData,
  setText,
  clickByString,
  contentTrim,
  content,
  loadUrl,
} = require('../lib/helpers');

describe('Hello', () => {
  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    page = await browser.newPage();
    await loadUrl(
      page,
      'https://weather.com/he-IL/weather/today/l/32.07,34.78?par=google'
    );
  });
});
