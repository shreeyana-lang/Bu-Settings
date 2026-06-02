const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://staging.rosia.one/login', { waitUntil: 'networkidle' });
  await page.fill('[name="username"]', 'admin@udn.com.np');
  await page.fill('[name="password"]', 'Evolve@123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('//button[contains(text(),"Sign In")]', { timeout: 20000 })
  ]);
  await page.goto('https://staging.rosia.one/configuration/bu', { waitUntil: 'networkidle' });
  await page.waitForSelector('span:has-text("KYC Configuration")', { timeout: 30000 });
  await page.click('span:has-text("KYC Configuration")');
  await page.waitForTimeout(2000);
  console.log('buttons after opening KYC tab:', await page.locator('button').allTextContents());
  console.log('save button count', await page.locator('button:has-text("Save")').count());
  console.log('ok button count', await page.locator('button:has-text("Ok")').count());
  await page.click('.react-switch-handle');
  await page.waitForTimeout(1000);
  console.log('buttons after toggling KYC:', await page.locator('button').allTextContents());
  console.log('save button count after toggle', await page.locator('button:has-text("Save")').count());
  console.log('ok button count after toggle', await page.locator('button:has-text("Ok")').count());
  await page.click('button:has-text("Save")');
  await page.waitForSelector('button:has-text("Ok")', { timeout: 30000 });
  await page.click('button:has-text("Ok")');
  await page.waitForTimeout(2000);
  await page.waitForSelector('.add-btn-container button', { timeout: 30000 });
  await page.click('.add-btn-container button');
  await page.waitForSelector('.zindex-2__input-container', { timeout: 30000 });
  console.log('linefiletypes count', await page.locator('.zindex-2__input-container').count());
  console.log('linefiletypes text', await page.locator('.zindex-2__input-container').allTextContents());
  await page.click('.zindex-2__input-container');
  await page.waitForTimeout(1000);
  console.log('menu count after first click', await page.locator('.zindex-2__menu-list').count());
  console.log('menu html', await page.locator('.zindex-2__menu-list').first().innerHTML().catch(() => 'no menu')); 
  console.log('option texts', await page.locator('div[role="option"]').allTextContents());
  await page.click('div[role="option"]:has-text("JPG")');
  await page.waitForTimeout(1000);
  console.log('after select option html snippet', await page.locator('.zindex-2__input-container').first().innerHTML().catch(() => 'no input html'));
  await page.click('.zindex-2__input-container');
  await page.waitForTimeout(1000);
  console.log('menu count after reopen', await page.locator('.zindex-2__menu-list').count());
  console.log('menu html after reopen', await page.locator('.zindex-2__menu-list').first().innerHTML().catch(() => 'no menu')); 
  console.log('option texts after reopen', await page.locator('div[role="option"]').allTextContents());
  await page.screenshot({ path: 'dropdownInspect.png', fullPage: true });
  await browser.close();
})();
