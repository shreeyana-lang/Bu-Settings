const { test, expect } = require('@playwright/test');
class KycPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[name="username"]');
        this.passwordInput = page.locator('[name="password"]');
        this.signInButton = page.locator('//button[contains(text(),"Sign In")]');
        this.kycSwitch = page.locator('.react-switch-handle').first();
        this.kyctab = page.locator('span:has-text("KYC Configuration")');
        this.cancelpage = page.locator(".sc-jXbUNg.dvPBMm.secondary.small");
        this.cancelheader = page.getByRole('heading', { name: 'KYC Configuration' })
        this.successmsg = page.getByText('KYC Configuration saved successfully', { exact: true });
        this.saveButton = page.locator('button:has-text("Save")').first();
        this.okButton = page.locator('button:has-text("Ok")').first();
        this.errorMessage = page.getByText('At least one Sub D must be selected.', { exact: true });
        this.Enablesubcheck = page.locator("(//div[@class='subd-col-check'])[4]");
        this.resultCheckboxLabel=page.locator('.subd-list-body .subd-list-item .subd-col-check label input[type="checkbox"]');
        this.subdssearch = page.locator("button[class='sc-jXbUNg cMkoqG iconBtnSmall search'] span[class='sc-eldPxv uSLPb']");
        this.EnableALLsubdcheck = page.locator("(//div[@class='subd-col-check'])").first();
        this.subssearchbox = page.getByRole('textbox', { name: 'Search' });
        this.scrollSUBds = page.locator('.subd-col-title');
        this.firstSubdCheckbox = page.locator("(//div[@class='subd-col-check']//input[@type='checkbox'])[1]");
        this.deslectsubd = page.getByRole('button', { name: 'Deselect All' })
        this.removeallsubd = page.getByRole('button', { name: 'Remove All' })
        this.documentInput = page.locator('input[name="name"]');
        this.lineaddcommon = page.locator('.add-btn-container button').nth(0);
        this.linefiletypes = page.locator('.zindex-2__input-container').first();
        this.linefiletypeInput = page.locator('.zindex-2__input').first();
        this.linesizelimt = page.locator('td:nth-child(3) > .form-select-input > .select-css > .zindex-2__control');
        this.linesizelimtInput = this.linesizelimt.locator('.zindex-2__input');
        this.linevalidation = page.getByText('Must not be empty').first();
        this.lineaddledger = page.locator('.add-btn-container button').nth(1);
        this.linesaveButton = page.locator('button.text-btn.save-btn');
        this.linecancelbutton = page.locator('button.cancel-btn').first();
        this.linecheckboxLabel = page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr[1]//td[4]//span[contains(@class,"control-label")]');
        this.linecheckbox = page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr[1]//td[4]//input[@type="checkbox"]');
        this.pageerrorvalidation=page.locator('div.alert.alert-custom.danger');
        this.editbutton= page.locator('div.icon-group').locator('span').nth(0);
        this.deletebutton=page.locator('div.icon-group').locator('span').nth(1);
    }

    async login() {
        await this.usernameInput.fill('admin@udn.com.np');
        await this.passwordInput.fill('Evolve@123');
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle' }),
            this.signInButton.click()
        ]);
}
    async navigateToKycConfig() {
        await expect(this.kyctab).toBeVisible({ timeout: 15000 });
        await this.kyctab.click();
    }

    async enableKyc() {
        await this.kycSwitch.click();
    }

    async saveKyc() {
        await this.saveButton.click();
        await this.okButton.click();
    }
    async verifyerrormessage() {
        await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
        await expect(this.errorMessage).toBeVisible();
        console.log('Error message is visible: ' + await this.errorMessage.isVisible());
        await this.page.waitForLoadState('networkidle');
        await expect(this.errorMessage).toBeVisible({ timeout: 15000 });
    }
    async enablesubds1() {
        await this.Enablesubcheck.first().click();
    }
    async SubDsdeleteall() {
        await this.EnableALLsubdcheck.click();
        await this.deslectsubd.click();
        await expect(this.firstSubdCheckbox).not.toBeChecked();
    }
    async SubDsremoveall() {
        await this.EnableALLsubdcheck.click();
        await this.removeallsubd.click();
        await expect(this.firstSubdCheckbox).not.toBeChecked();
    }
    currentEditRow() {
        return this.page.locator('//div[contains(@class,"doc-section")]//table//tbody//tr[contains(@class,"edit-row")]').first();
    }

    async commomdocuments(documentname) {
        await expect(this.lineaddcommon).toBeVisible({ timeout: 15000 });
        await expect(this.lineaddcommon).toBeEnabled({ timeout: 15000 });
        await this.lineaddcommon.click();
        const row = this.currentEditRow();
        const documentInput = row.locator('input[name="name"]');
        await expect(documentInput).toBeVisible({ timeout: 10000 });
        await documentInput.fill(documentname);
        await this.randomFileType(row);
        await this.insertsizelimit(row);
        await this.checkMandatory(row);
        await expect(this.lineaddcommon).toBeEnabled({ timeout: 15000 });
    }
    async validationcommondoc() {
        await this.lineaddcommon.click();
        const row = this.currentEditRow();
        const lineSaveButton = row.locator('button.save-btn');
        await expect(lineSaveButton).toBeVisible({ timeout: 10000 });
        await expect(lineSaveButton).toBeEnabled({ timeout: 10000 });
        await lineSaveButton.click();
        const lineValidation = row.getByText('Must not be empty').first();
        await expect(lineValidation).toBeVisible({ timeout: 10000 });
        console.log("DocumentLine validation is:-" + await lineValidation.isVisible());
        const lineCancelButton = row.locator('button.cancel-btn').first();
        await lineCancelButton.click();
        await expect(this.lineaddcommon).toBeEnabled({ timeout: 15000 });
    }
    async randomFileType(row = null) {
        const currentRow = row ?? this.currentEditRow();
        const fileTypeInput = currentRow.locator('.zindex-2__input').first();
        await expect(fileTypeInput).toBeVisible({ timeout: 10000 });
        await fileTypeInput.click();
        await this.page.waitForSelector('.zindex-2__menu-list[role="listbox"]:visible', { timeout: 10000 });

        const menu = this.page.locator('.zindex-2__menu-list[role="listbox"]:visible').first();
        const optionLocator = menu.locator('div[role="option"]:visible');
        await expect(optionLocator.first()).toBeVisible({ timeout: 10000 });

        const optionTexts = (await optionLocator.allTextContents())
            .map(text => text.trim())
            .filter(text => text.length > 0);

        if (optionTexts.length === 0) {
            throw new Error('No file type options available');
        }

        const selectionCount = Math.min(optionTexts.length, Math.max(1, Math.floor(Math.random() * 3) + 1));
        const selectedTexts = [];

        for (let i = 0; i < selectionCount; i++) {
            await expect(fileTypeInput).toBeVisible({ timeout: 10000 });
            await fileTypeInput.click();
            await this.page.waitForSelector('.zindex-2__menu-list[role="listbox"]:visible', { timeout: 10000 });
            const currentMenu = this.page.locator('.zindex-2__menu-list[role="listbox"]:visible').first();
            const currentOptionTexts = (await currentMenu.locator('div[role="option"]:visible').allTextContents())
                .map(text => text.trim())
                .filter(text => text.length > 0 && !selectedTexts.includes(text));

            if (currentOptionTexts.length === 0) {
                console.log('No remaining options available after previous selections');
                break;
            }

            const text = currentOptionTexts[Math.floor(Math.random() * currentOptionTexts.length)];
            const option = currentMenu.locator('div[role="option"]:visible').filter({ hasText: text }).first();
            const optionCount = await option.count();
            if (optionCount === 0) {
                throw new Error(`File type option not found: ${text}`);
            }
            await expect(option).toBeVisible({ timeout: 10000 });
            console.log(`Selecting file type: ${text}`);
            await option.click();
            selectedTexts.push(text);
            await this.page.waitForTimeout(200);
        }

        await this.page.keyboard.press('Escape');
    }
    async insertsizelimit(row = null) {
        const currentRow = row ?? this.currentEditRow();
        const sizeInput = currentRow.locator('td:nth-child(3) .zindex-2__input').first();
        await expect(sizeInput).toBeVisible({ timeout: 10000 });
        await sizeInput.click();
        await this.page.waitForSelector('.zindex-2__menu-list[role="listbox"]:visible', { timeout: 10000 });

        const menu = this.page.locator('.zindex-2__menu-list[role="listbox"]:visible').first();
        const optionLocator = menu.locator('div[role="option"]:visible');
        await expect(optionLocator.first()).toBeVisible({ timeout: 10000 });

        const count = await optionLocator.count();
        console.log(`Total size options: ${count}`);
        if (count === 0) {
            throw new Error('No size options available');
        }

        const randomIndex = Math.floor(Math.random() * count);
        const option = optionLocator.nth(randomIndex);
        await expect(option).toBeVisible({ timeout: 10000 });
        
        const selectedText = (await option.textContent() || '').trim();
        console.log(`Selected size limit: ${selectedText}`);
        await option.click();
        await this.page.keyboard.press('Escape');
    }
    async checkMandatory(row = null) {
    const currentRow = row ?? this.currentEditRow();
    const linecheckboxLabel = currentRow.locator('span.control-label');
    const linecheckbox = currentRow.locator('input[type="checkbox"]');
    const lineSaveButton = currentRow.locator('button.save-btn');

    const shouldCheck = Math.random() < 0.5;
    console.log(`Checkbox should be checked: ${shouldCheck}`);

    const labelVisible = await linecheckboxLabel.isVisible().catch(() => false);

    if (shouldCheck) {
        
        if (labelVisible) {
            await linecheckboxLabel.click();
        } else {
            await linecheckbox.check({ force: true });
        }

        await expect(linecheckbox).toBeChecked({ timeout: 5000 });
        console.log('Checkbox checked');
    } else {
        
        const isChecked = await linecheckbox.isChecked();

        if (isChecked) {
            if (labelVisible) {
                await linecheckboxLabel.click();
            } else {
                await linecheckbox.uncheck({ force: true });
            }
        }

        await expect(linecheckbox).not.toBeChecked({ timeout: 5000 });
        console.log('Checkbox unchecked');
    }

    await expect(lineSaveButton).toBeVisible({ timeout: 10000 });
    await expect(lineSaveButton).toBeEnabled({ timeout: 10000 });
    await lineSaveButton.click();

    await expect(this.lineaddcommon).toBeEnabled({ timeout: 15000 });
}
    async fillLedgerdocs(ledgerdoc) {
        await expect(this.lineaddledger).toBeVisible({ timeout: 15000 });
        await expect(this.lineaddledger).toBeEnabled({ timeout: 15000 });
        await this.lineaddledger.click();
        const row = this.currentEditRow();
        const documentInput = row.locator('input[name="name"]');
        await expect(documentInput).toBeVisible({ timeout: 10000 });
        await documentInput.fill(ledgerdoc);
        await this.checkMandatory(row);
        await expect(this.lineaddledger).toBeEnabled({ timeout: 15000 });
    }
    async validationLedgerdoc() {
        await this.lineaddledger.click();
        const row = this.currentEditRow();
        const lineSaveButton = row.locator('button.save-btn');
        await expect(lineSaveButton).toBeVisible({ timeout: 10000 });
        await expect(lineSaveButton).toBeEnabled({ timeout: 10000 });
        await lineSaveButton.click();
        const ledgerlineValidation = row.getByText('Must not be empty').first();
        await expect(ledgerlineValidation).toBeVisible({ timeout: 10000 });
        console.log("Ledger Line  validation is:-" + await ledgerlineValidation.isVisible());
        const lineCancelButton = row.locator('button.cancel-btn').first();
        await lineCancelButton.click();
        await expect(this.lineaddledger).toBeEnabled({ timeout: 15000 });
    }
    async pagesave() {
        await this.saveButton.click();
        await this.okButton.click();
        await expect(this.successmsg).toBeVisible({ timeout: 10000 });
        const isSaved = await this.successmsg.isVisible();
        console.log("Saved successfully: " + isSaved);
        return isSaved;
    }
    async pagecancel() {
        await this.cancelpage.click();
        await expect(this.cancelheader).toBeVisible({ timeout: 10000 });
        const isCancelled = await this.cancelheader.isVisible();
        console.log("Cancel successful: " + isCancelled);
        return isCancelled;
    }
    async reset() {
        await this.kycSwitch.click();
        await this.cancelpage.click();
        const cancelcheck = await this.cancelheader.isVisible();
        console.log("Reset Success:-" + cancelcheck);
    }
    async isKycSectionScrollable() {
        return await this.page.evaluate(() => {
            const scrollable = document.querySelector('div.sc-iMTnTL.hGFkmX') || document.querySelector('.sc-iMTnTL.hGFkmX');
            return !!scrollable && scrollable.scrollHeight > scrollable.clientHeight;
        });
    }
    async issubdSectionScrollable() {
        return await this.page.evaluate(() => {
            const scrollable = document.querySelector('.subd-list-container');
            return !!scrollable && scrollable.scrollHeight > scrollable.clientHeight;
        });
    }
    async search() {
        await this.subdssearch.click();
         const searchTexts = [
        "abv",
        "stores",
        
    ];
     const randomText = searchTexts[Math.floor(Math.random() * searchTexts.length)];
      console.log("Random search text:", randomText);
        await this.subssearchbox.fill(randomText);
        await this.page.waitForTimeout(2000);
        const count = await this.resultCheckboxLabel.count();

    console.log("Total checklist items:", count);

    if (count === 0) {
        console.log("No results found. Skipping...");
        await this.subssearchbox.clear();
        await this.page.waitForTimeout(2000);
        await this.enablesubds1();
    }

    for (let i = 0; i < count; i++) {
        const item = this.resultCheckboxLabel.nth(i);

        if (!(await item.isChecked().catch(() => false))) {
            await item.click({ force: true });
        }
        console.log("All available checklist items selected");
    }
}
async checkItemState() {
    const item = this.resultCheckboxLabel.first(); 

    if (!(await item.isChecked())) {
        await this.SubDsremoveall();
        await this.enablesubds1();
    }
}
async verifyCommonDocuments(docName) {
    const docRow = this.page.locator(`//div[contains(@class,"doc-section")]//td[normalize-space()="${docName}"]`);
    await expect(docRow).toBeVisible({ timeout: 10000 });
    console.log(`Verified Common Document exists: ${docName}`);
}
  async verifyLedgerDocuments(docName) {
    const ledgerRow = this.page.locator(`//div[contains(@class,"doc-section")]//td[normalize-space()="${docName}"]`);
    await expect(ledgerRow).toBeVisible({ timeout: 10000 });
    console.log(`Verified Ledger Document exists: ${docName}`);
}
async pagevalidation(){
    await expect(this.pageerrorvalidation).toBeVisible({ timeout: 10000 });
        console.log('Error message is visible: ' + await this.pageerrorvalidation.isVisible());
        await this.page.waitForLoadState('networkidle');
        await expect(this.pageerrorvalidation).toBeVisible({ timeout: 15000 });
         const errmsg = await this.pageerrorvalidation.textContent();
        console.log("Validation Message:- " + errmsg);
}
async checkallsub(){
    await this.EnableALLsubdcheck.click();
}
async verifySubdHeaderMatchesChecklist() {
    const headerText = await this.page.locator('#react-tabs-23 > div.custom-scroll.body > div > div.card-section.subd-section.card > div.subd-list-container > div.sc-fvtFIe.bGSskM.bulk-component > div.sc-jMakVo.bOyUuI > span').first().textContent();
    console.log("Header Text:", headerText);
    const match = headerText.match(/(#react-tabs-23 > div.custom-scroll.body > div > div.card-section.subd-section.card > div.subd-list-container > div.sc-fvtFIe.bGSskM.bulk-component > div.sc-jMakVo.bOyUuI > span)/);
    if (!match) {
        throw new Error("Header format is incorrect");
        await  this.page.pause();
    }
    const selectedCount = parseInt(match[1]);
    const totalCount = parseInt(match[2]);
    console.log(`Selected: ${selectedCount}, Total: ${totalCount}`);
    const checklistCount = await this.page.locator('.subd-list-body .subd-list-item').count();
    console.log("Checklist Count:", checklistCount);
    expect(checklistCount).toBe(totalCount);
    const checkedCount = await this.page.locator('.subd-list-body input[type="checkbox"]:checked').count();
    console.log("Checked Count:", checkedCount);
    expect(checkedCount).toBe(selectedCount);
    console.log(" SubD header matches checklist successfully");
}
async editfunction(){
     await this.editbutton.click();
     await this.commomdocuments("EditDOC");
     await this.page.pause();
}
}

module.exports = { KycPage };