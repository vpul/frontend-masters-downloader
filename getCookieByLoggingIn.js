const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

puppeteer.use(pluginStealth());

module.exports = async ({ username, password }) => {
  try {
    puppeteer.launch({ headless: true }).then(async browser => {
      const page = await browser.newPage()
      await page.setViewport({ width: 800, height: 600 });
      await page.goto('https://frontendmasters.com/login/', { waitUntil: 'networkidle0' });
      await page.type('#username', username);
      await page.type('#password', password);
      await page.click('#remember');
      await page.click('button');
      await page.screenshot({ path: 'testresult.png', fullPage: true });
      if (await page.$('iframe') !== null) {
        console.error('Captcha detected. Please use cookies');
        return;
      }
      await page.waitForNavigation();
      console.log(await page.url());
      await page.screenshot({ path: 'testresult.png', fullPage: true });
      const cookies = await page.cookies();
      console.log(cookies);
      await browser.close();
    });
  } catch (err) {
    console.log(err);
  }
};