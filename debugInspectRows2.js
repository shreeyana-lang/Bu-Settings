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
  await page.waitForSelector('span:has-text("KYC Configuration")');
  await page.click('span:has-text("KYC Configuration")');
  await page.waitForTimeout(2000);
  await page.click('.react-switch-handle');
  await page.waitForTimeout(1000);
  await page.click('button:has-text("Save")');
  await page.waitForSelector('button:has-text("Ok")');
  await page.click('button:has-text("Ok")');
  await page.waitForTimeout(2000);
  await page.click('.add-btn-container button');
  await page.waitForSelector('input[name="name"]');
  await page.fill('input[name="name"]', 'Test Doc 1');
  await page.click('.zindex-2__input[role="combobox"]');
  await page.waitForSelector('.zindex-2__menu-list[role="listbox"]');
  await page.click('div[role="option"]:has-text("JPG")');
  await page.click('td:nth-child(3) .zindex-2__input');
  await page.waitForSelector('.zindex-2__menu-list[role="listbox"]');
  await page.click('div[role="option"]:has-text("6 Mb")');
  await page.click('input[type="checkbox"]');
  await page.click('button.save-btn');
  await page.waitForTimeout(2000);
  console.log('after first save row count', await page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr').count());
  const rows = page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr');
  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    console.log('row', i, 'class', await row.getAttribute('class'));
    console.log(' row html', await row.evaluate(el => el.outerHTML).catch(() => 'err'));
  }
  console.log('add button enabled', await page.locator('.add-btn-container button').first().isEnabled());
  await page.click('.add-btn-container button');
  await page.waitForTimeout(1000);
  console.log('after add second row, row count', await rows.count());
  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    console.log('row', i, 'class', await row.getAttribute('class'));
    console.log(' row html', await row.evaluate(el => el.outerHTML).catch(() => 'err'));
  }
  await browser.close();
})();
