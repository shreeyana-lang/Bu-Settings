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
  await page.click('.add-btn-container button');
  await page.waitForTimeout(2000);
  console.log('add button clicked');
  const textboxes = page.locator('input[type="text"], textarea');
  console.log('textbox count', await textboxes.count());
  for (let i = 0; i < await textboxes.count(); i++) {
    const box = textboxes.nth(i);
    console.log(i, 'visible', await box.isVisible(), 'enabled', await box.isEnabled(), 'name', await box.getAttribute('name'), 'placeholder', await box.getAttribute('placeholder'), 'class', await box.getAttribute('class'));
    try {
      console.log('html', await box.evaluate(n => n.outerHTML));
    } catch (e) {
      console.log('html err', e.message);
    }
  }
  const visibleTextboxes = page.locator('input[type="text"]:visible, textarea:visible');
  console.log('visible textboxes count', await visibleTextboxes.count());
  for (let i = 0; i < await visibleTextboxes.count(); i++) {
    const box = visibleTextboxes.nth(i);
    console.log(i, 'visible text html', await box.evaluate(n => n.outerHTML));
  }
  await browser.close();
})();
