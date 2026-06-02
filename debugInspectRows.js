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
  const addButton = page.locator('.add-btn-container button').first();
  await addButton.click();
  await page.waitForTimeout(1000);
  const rows = page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr');
  console.log('row count', await rows.count());
  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    console.log('row', i, 'html', await row.evaluate(el => el.outerHTML));
    const nameInput = row.locator('input[name="name"]');
    console.log(' name count', await nameInput.count(), 'visible', await nameInput.first().isVisible().catch(() => false));
    const filetype = row.locator('.zindex-2__input-container');
    console.log(' filetype count', await filetype.count(), 'visible', await filetype.first().isVisible().catch(() => false));
    const saveBtn = row.locator('button.save-btn');
    console.log(' save count', await saveBtn.count());
  }
  await browser.close();
})();
