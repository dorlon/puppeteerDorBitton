const fs = require('fs');
const puppeteer = require('puppeteer');

const sleep = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};

let items = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    'https://www.amazon.com/s?k=the+last+of+us&i=movies-tv&rh=n%3A2625373011%2Cn%3A2649512011&dc&language=he&ds=v1%3ATu9cR9cFUGQ60frEDyc805WL74bHbdVSRV1wej%2FppKs&crid=3AWJ2F8HSOF1S&qid=1677340585&rnid=2625373011&sprefix=the+last+of+us%2Caps%2C485&ref=sr_nr_n_1'
  );

  // let items = [];
  let isBtnDisabled = false;
  while (!isBtnDisabled) {
    await page.waitForSelector('[data-cel-widget="search_result_0"]');
    const productsHandles = await page.$$(
      'div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item'
    );
    for (const productHandle of productsHandles) {
      let title = 'Null';
      let price = 'Null';
      let image = 'Null';
      try {
        title = await page.evaluate(
          (el) => el.querySelector('h2 > a > span').textContent,
          productHandle
        );
      } catch (error) {}

      try {
        price = await page.evaluate(
          (el) => el.querySelector('.a-price').textContent,
          productHandle
        );
      } catch (error) {}
      try {
        image = await page.evaluate(
          (el) => el.querySelector('.s-image').getAttribute('src'),
          productHandle
        );
      } catch (error) {}

      //console.log(title, price, image);

      if (title !== 'Null') {
        items.push({ title, price, image });

        fs.appendFile(
          'results.csv',
          `${title.replace(/,/g, '.')}, ${price}, ${image}\n`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }
    await page.waitForSelector('.s-pagination-next', { visible: true });
    const is_disabled =
      (await page.$('.s-pagination-next.s-pagination-disabled ')) !== null;

    isBtnDisabled = is_disabled;
    if (!is_disabled) {
      await Promise.all([
        page.click('.s-pagination-next'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
      ]);
    }
  }

  //console.log(items);
  console.log(items.length);
  //await browser.close();
  //expect(items).to.equal();
})();
