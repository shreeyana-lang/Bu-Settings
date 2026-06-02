const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://staging.rosia.one/login', { waitUntil: 'networkidle' });
  await page.fill('[name="username"]', 'admin@udn.com.np');
  await page.fill('[name="password"]', 'Evolve@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('//button[contains(text(),"Sign In")]')
  ]);
  await page.goto('https://staging.rosia.one/configuration/bu', { waitUntil: 'networkidle' });
  await page.waitForSelector('span:has-text("KYC Configuration")', { timeout: 30000 });
  await page.click('span:has-text("KYC Configuration")');
  await page.waitForTimeout(2000);
  await page.click('.react-switch-handle');
  await page.waitForTimeout(1000);
  await page.click('button:has-text("Save")');
  await page.waitForSelector('button:has-text("Ok")', { timeout: 30000 });
  await page.click('button:has-text("Ok")');
  await page.waitForTimeout(2000);
  for (let i = 1; i <= 6; i++) {
    console.log('--- iteration', i, '---');
    const addButton = page.locator('.add-btn-container button').first();
    console.log('add button count', await page.locator('.add-btn-container button').count());
    console.log('add button visible', await addButton.isVisible());
    console.log('add button enabled', await addButton.isEnabled());
    try {
      await addButton.click({ timeout: 15000 });
      console.log('clicked add button');
    } catch (e) {
      console.log('click add button error', e.message);
      break;
    }
    try {
      await page.waitForSelector('input[name="name"]', { timeout: 15000 });
      console.log('name input count', await page.locator('input[name="name"]').count());
      console.log('visible name input count', await page.locator('input[name="name"]:visible').count());
      const visibleNames = page.locator('input[name="name"]:visible');
      for (let j = 0; j < await visibleNames.count(); j++) {
        console.log('name input', j, await visibleNames.nth(j).evaluate(el => el.outerHTML).catch(() => 'err'));
      }
    } catch (e) {
      console.log('name input wait error', e.message);
      break;
    }
    await page.waitForTimeout(1000);
  }
  await browser.close();
})();
