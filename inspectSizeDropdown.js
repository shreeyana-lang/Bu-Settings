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
  await page.waitForSelector('input[name="name"]', { timeout: 30000 });
  await page.fill('input[name="name"]', 'Test Doc');
  await page.waitForTimeout(1000);
  const sizeControl = page.locator('td:nth-child(3) > .form-select-input > .select-css > .zindex-2__control');
  console.log('sizeControl count', await sizeControl.count());
  console.log('sizeControl visible', await sizeControl.first().isVisible());
  console.log('sizeControl enabled', await sizeControl.first().isEnabled());
  console.log('sizeControl html', await sizeControl.first().evaluate(el => el.outerHTML));
  await sizeControl.first().click();
  await page.waitForTimeout(1000);
  const menuCount = await page.locator('.zindex-2__menu-list[role="listbox"]').count();
  console.log('menuCount', menuCount);
  for (let i = 0; i < menuCount; i++) {
    const menu = page.locator('.zindex-2__menu-list[role="listbox"]').nth(i);
    console.log('menu visible', await menu.isVisible());
    console.log('menu html', await menu.innerHTML());
  }
  const options = page.locator('div[role="option"]');
  console.log('option count', await options.count());
  for (let i = 0; i < await options.count(); i++) {
    const option = options.nth(i);
    console.log(i, await option.textContent(), 'visible', await option.isVisible());
  }
  await browser.close();
})();
