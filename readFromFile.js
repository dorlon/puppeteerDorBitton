const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

describe('File Testing', () => {
  it('Read write files', async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      await page.goto('https://www.mako.co.il/');
      const imageHref = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src').replace('/', '');
      }, 'a > img');
      const viewSource = await page.goto(imageHref);
      const buffer = await viewSource.buffer();
      await writeFileAsync('Accessability.png', buffer);
      console.log('Image saved');
      const content = await readFileAsync('Accessability.png');
      console.log('File was read');
      await page.goto(
        'https://www.mako.co.il/finances-weekend/Article-da5a4773a09e681027.htm?sCh=3d385dd2dd5d4110&pId=1898243326'
      );
      await page.waitForSelector('.article-body');
      let element = await page.$('.article-body');
      let value = await page.evaluate((el) => el.textContent, element);
      fs.writeFileSync('file.txt', value);
      const blogPost = await fs.readFileSync('file.txt');
    } catch (error) {
      console.log(error);
    }

    await browser.close();
  });
});
// (async () => {

// })();
