const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());

module.exports = async () => {
  puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 600 });
    await page.goto("https://frontendmasters.com/login/", { waitUntil: 'networkidle0' });
    await page.type('#username', 'username');
    await page.type('#password', 'password');
    await page.click('#remember');
    await page.click('button');
    await page.waitForNavigation();
    await page.screenshot({ path: "testresult.png", fullPage: true });
    const cookies = await page.cookies();
    console.log(cookies);
    await browser.close();
  });
};