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
  getText,
} = require('../lib/helpers');
describe('Home URL testing', () => {
  let browser;
  let page;
  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    page = await browser.newPage();
    await loadUrl(page, 'https://app.cymulate.com/login');
  });
  it('Open Blog', async function () {
    await setText(page, '#email', 'candidate_user@cymulate.com'); //type email
    await setText(page, '#password', 'Aa123456'); //type password
    await click(page, '.MuiButton-label'); //press login
    await clickByString(
      page,
      '.MuiTab-wrapper.cymulate-tabs-tab-wrapper',
      'Reports'
    ); //press Reports tab
    await click(page, '.fa.fa-history'); //press 'History' icon
    await click(page, '.table-row.attack-item-container'); //Press the first row
  });

  it('Check URL', async function () {
    expect(await contentTrim(page, 'div.report-summary-data')).to.equal(
      'https://ekslabs.cymulatedev.com'
    );
  });

  it('Check status', async () => {
    expect(await content(page, '.cymulate-tag-design.green')).to.equal(
      'Completed'
    );
  });

  it('Check score', async () => {
    expect(await content(page, '.pieChartInfoText')).to.equal('29');
  });

  it('Download file and check number of downloads', async () => {
    await click(page, '.fa.fa-angle-down.report'); //press Generate Report
    await click(page, '.fa.fa-file-text-o'); //press blue button CSV
    await clickByData(page, 'test-id', 'topbar-dropdown-downloads');
    await clickByData(page, 'data-cymulate-icon-name', 'download');
    let value = await getText(
      page,
      'span.MuiBadge-badge.MuiBadge-anchorOriginTopRightRectangle'
    );
    console.log(value);
    expect(
      await content(
        page,
        'span.MuiBadge-badge.MuiBadge-anchorOriginTopRightRectangle'
      )
    ).to.equal(value);
  });

  after(async function () {
    browser.close();
  });
});
