import puppetteer from 'puppeteer';

jest.setTimeout(80000); // default puppeteer timeout
describe('ItemsList', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('popup', () => {
    test('should open popup', async () => {
      await page.goto(baseUrl);
      const addItem = await page.$('.plus');
      addItem.click();
      await page.waitForSelector('.popup');
    });
    test('should add item IPHONE with price 100', async () => {
      await page.goto(baseUrl);
      const addItem = await page.$('.plus');
      addItem.click();
      await page.waitForSelector('.popup');
      const itemName = await page.$('.name');
      const itemPrice = await page.$('.price');
      await itemName.type('IPHONE');
      await itemPrice.type('100');
      const ok = await page.$('.button_ok');
      ok.click();
      await page.waitForSelector('.item');
      await page.waitForSelector('.item__name');
      await page.waitForSelector('.item__price');
      const result = [await page.$eval('.item__name', (e) => e.innerHTML), await page.$eval('.item__price', (e) => e.innerHTML)];
      expect(result).toEqual(['IPHONE', '100']);
    });
    test('should create and delete item', async () => {
      await page.goto(baseUrl);
      const addItem = await page.$('.plus');
      addItem.click();
      await page.waitForSelector('.popup');
      const itemName = await page.$('.name');
      const itemPrice = await page.$('.price');
      await itemName.type('IPHONE');
      await itemPrice.type('100');
      const ok = await page.$('.button_ok');
      ok.click();
      await page.waitForSelector('.delete');
      const del = await page.$('.delete');
      del.click();
      await page.waitForSelector('.button_ok');
      const ok2 = await page.$('.button_ok');
      ok2.click();
      await page.waitForSelector('.items');
      const item = await page.$('.item');
      expect(item).toBeNull();
    });
    test('should change price item Macbook, price 200', async () => {
      await page.goto(baseUrl);
      const addItem = await page.$('.plus');
      addItem.click();
      await page.waitForSelector('.popup');
      const itemName = await page.$('.name');
      const itemPrice = await page.$('.price');
      await itemName.type('IPHONE');
      await itemPrice.type('100');
      const ok = await page.$('.button_ok');
      ok.click();
      await page.waitForSelector('.item');
      await page.waitForSelector('.item__name');
      await page.waitForSelector('.item__price');
      await page.waitForSelector('.edit');
      const edit = await page.$('.edit');
      edit.click();
      await page.waitForSelector('.popup');
      const itemPrice2 = await page.$('.price');
      itemPrice2.click();
      const priceValue = await page.$eval('.price', (el) => el.value);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < priceValue.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await page.keyboard.press('Backspace');
      }
      await itemPrice2.type('200');
      const itemName2 = await page.$('.name');
      itemName2.click();
      const nameValue = await page.$eval('.name', (el) => el.value);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < nameValue.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await page.keyboard.press('Backspace');
      }
      await itemName2.type('Macbook');
      const ok2 = await page.$('.button_ok');
      ok2.click();
      await page.waitForSelector('.item');
      await page.waitForSelector('.item__name');
      await page.waitForSelector('.item__price');
      const result = [await page.$eval('.item__name', (e) => e.innerHTML), await page.$eval('.item__price', (e) => e.innerHTML)];
      expect(result).toEqual(['Macbook', '200']);
    });
    test('should displayError Tooltip', async () => {
      await page.goto(baseUrl);
      const addItem = await page.$('.plus');
      addItem.click();
      await page.waitForSelector('.popup');
      const itemName = await page.$('.name');
      const itemPrice = await page.$('.price');
      await itemName.type('');
      await itemPrice.type('100');
      const ok = await page.$('.button_ok');
      ok.click();
      await page.waitForSelector('.error');
    });
  });
  test('should  displayError Tooltip', async () => {
    await page.goto(baseUrl);
    const addItem = await page.$('.plus');
    addItem.click();
    await page.waitForSelector('.popup');
    const itemName = await page.$('.name');
    const itemPrice = await page.$('.price');
    await itemName.type('iPhone');
    await itemPrice.type('eda');
    const ok = await page.$('.button_ok');
    ok.click();
    await page.waitForSelector('.error');
  });
});
