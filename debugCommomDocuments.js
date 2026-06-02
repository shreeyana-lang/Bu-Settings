const { chromium } = require('playwright');
const { KycPage } = require('./tests/Bulocators');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://staging.rosia.one/login', { waitUntil: 'networkidle' });
  const kyc = new KycPage(page);
  await kyc.login();
  await page.goto('https://staging.rosia.one/configuration/bu', { waitUntil: 'networkidle' });
  await kyc.navigateToKycConfig();
  await kyc.enableKyc();
  console.log('button count', await page.locator('button').count());
  const buttonHtmls = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button')).slice(0, 20).map(button => button.outerHTML)
  );
  buttonHtmls.forEach((html, i) => console.log('button', i, html));
  await kyc.saveKyc();
  console.log('Starting commomdocuments loop...');
  for (let i = 1; i <= 10; i++) {
    console.log('doc', i);
    await kyc.commomdocuments(`PAN ${i}`);
    console.log('done doc', i);
  }
  console.log('completed loop');
  await browser.close();
})();
