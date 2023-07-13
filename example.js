const puppeteer = require('puppeteer');
const chai = require('chai');
const { expect, assert } = require('chai');
describe('Home URL testing', () => {
  it('Open Blog', async () => {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto('https://www.mako.co.il');
    const title = await page.$eval('.headline', (el) => el.innerText);
    await expect(title).to.equal(
      'מת מפצעיו אור אשכר, שנפצע אנוש בפיגוע בדיזנגוף'
    );
  });
});
