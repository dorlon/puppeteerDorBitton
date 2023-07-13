module.exports = {
  click: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Could not click on Selector: ${selector}`);
    }
  },
  clickByData: async function (page, data, element) {
    try {
      await page.click('[' + data + '="' + element + '"]');
    } catch (error) {
      throw new Error(`Could not click on data: ${element}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (element) => element.innerHTML);
    } catch (error) {
      throw new Error(`Cannot get text from selector: ${selector}`);
    }
  },
  getCount: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$$eval(selector, (element) => element.length);
    } catch (error) {
      throw new Error(`Cannot get count of selector: ${selector}`);
    }
  },
  setText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, text);
      return;
    } catch (error) {
      throw new Error(
        `Cannot find selector: ${selector}, to type the text: ${text}`
      );
    }
  },
  clickByString: async function (page, selector, button) {
    try {
      await page.waitForSelector(selector);
      const elements = await page.$$(selector);
      for (let element of elements) {
        const text = await element.evaluate((el) => el.innerText);
        if (text.includes(button)) {
          await element.click();
          return;
        }
      }
    } catch (error) {
      throw new Error(`Cannot find selector: ${selector}, to click: ${text}`);
    }
  },
  contentTrim: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const urlElement = await page.$(selector);
      return await urlElement.evaluate((element) => element.textContent.trim());
    } catch (error) {
      throw new Error(`Cannot find selector: ${selector} to find url`);
    }
  },
  content: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const assessmentElement = await page.$(selector);
      const assessment = await assessmentElement.evaluate(
        (element) => element.textContent
      );
      return assessment;
    } catch (error) {
      throw new Error(
        `Cannot find selector: ${selector} to find: ${assessment}`
      );
    }
  },
  selectFromList: async function (page, selector, value) {
    try {
      await page.select(selector, value);
    } catch (error) {
      throw new Error(`Cannot find selector: ${selector} to select: ${value}`);
    }
  },
  loadUrl: async function (page, url) {
    await page.goto(url, { waitUntil: 'networkidle0' });
  },
  waitForText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector);
      await page.waitForFunction(
        (selector, text) =>
          document.querySelector(selector).innerText.includes(text),
        {},
        selector,
        text
      );
    } catch (error) {
      throw new Error(`Text: ${text} not found for selector ${selector}`);
    }
  },
};
