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
  console.log('add button visible', await addButton.isVisible());
  console.log('add button enabled', await addButton.isEnabled());

  for (let i = 1; i <= 4; i++) {
    console.log('--- iteration', i, '---');
    await addButton.waitFor({ state: 'visible', timeout: 15000 });
    console.log('add button enabled before click', await addButton.isEnabled());
    await addButton.click();
    await page.waitForTimeout(1000);
    const row = page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr[contains(@class,"edit-row")]').first();
    const nameInput = row.locator('input[name="name"]');
    await nameInput.fill('PAN ' + i);
    const fileTypeInput = row.locator('.zindex-2__input').nth(0);
    await fileTypeInput.click();
    await page.waitForSelector('.zindex-2__menu-list[role="listbox"]:visible');
    await page.click('div[role="option"]:has-text("JPG")');
    const sizeInput = row.locator('.zindex-2__input').nth(1);
    await sizeInput.click();
    await page.waitForSelector('.zindex-2__menu-list[role="listbox"]:visible');
    await page.click('div[role="option"]:has-text("6 Mb")');
    const checkboxLabel = row.locator('span.control-label');
    if (await checkboxLabel.isVisible().catch(() => false)) {
      await checkboxLabel.click();
    } else {
      await row.locator('input[type="checkbox"]').check({ force: true });
    }
    const rowSave = row.locator('button.save-btn');
    await rowSave.click();
    await page.waitForTimeout(1000);
    console.log('saved row', i);
    console.log('add button enabled after save', await addButton.isEnabled());
    console.log('line count', await page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr').count());
  }
  await browser.close();
})();
