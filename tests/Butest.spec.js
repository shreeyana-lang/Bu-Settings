const { test, expect } = require('@playwright/test');
const { KycPage } = require('./Bulocators');
test('BUSettings', async ({ page }) => {
//SubDs Validation
    test.setTimeout(120000);
     const kycpage = new KycPage(page);
    await page.goto('https://staging.rosia.one/login');
    await kycpage.login();
     await page.goto('https://staging.rosia.one/configuration/bu'); 
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.saveKyc();
    await kycpage.verifyerrormessage();
//Documents Validation
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.enablesubds1();
    await kycpage.saveKyc();
    await kycpage.pagevalidation();
//Ledger Validation
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.enablesubds1();
    for (let i = 1; i <= 2; i++) 
    {
    await kycpage.commomdocuments(`Documents ${i}`);
    }
    await kycpage.saveKyc();
    await kycpage.pagevalidation();
//Line(Documents)Row Validation
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.validationcommondoc();
//Line(Ledgers)Row Validation
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.validationLedgerdoc();
//Adding all the mandatory fields and click on the cancel button
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.enablesubds1();
    for (let i = 1; i <= 2; i++) 
{
    await kycpage.commomdocuments(`Documents ${i}`);
}
    for (let i = 1; i <= 2; i++) 
{
    await kycpage.fillLedgerdocs(`Ledger Documents ${i}`);
}
    await kycpage.pagecancel();
//SubDs Removeall functionality
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.SubDsremoveall();
//SubDs Search and list selected when search list is matached
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.checkallsub();
    await kycpage.search();
    //await kycpage.verifySubdHeaderMatchesChecklist();
    for (let i = 1; i <= 2; i++) 
{
    await kycpage.commomdocuments(`Documents ${i}`);
}
  
    for (let i = 1; i <= 2; i++) 
{
    await kycpage.fillLedgerdocs(`Ledger Documents ${i}`);
}
  // SubDs Search and list selected when search isnot found 
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.search();
   for (let i = 1; i <= 2; i++) 
{
    await kycpage.commomdocuments(`Documents ${i}`);
}
  
    for (let i = 1; i <= 2; i++) 
{
    await kycpage.fillLedgerdocs(`Ledger Documents ${i}`);
}
//Details Verification
    await kycpage.navigateToKycConfig();
    await kycpage.enableKyc();
    await kycpage.enablesubds1();
    const commonDocs = [];
    for (let i = 1; i <= 5; i++) {
        const name = `Documents ${i}`;
        commonDocs.push(name);
        await kycpage.commomdocuments(name);
    }
    const ledgerDocs = [];
    for (let i = 1; i <= 5; i++) {
        const name = `Ledger Documents ${i}`;
        ledgerDocs.push(name);
        await kycpage.fillLedgerdocs(name);
    }
    await kycpage.pagesave();
    for (const doc of commonDocs) {
        await kycpage.verifyCommonDocuments(doc);
    }
    for (const doc of ledgerDocs) {
        await kycpage.verifyLedgerDocuments(doc);
    }
    console.log("All created documents verified successfully");
//Successfully Save kyc page and then clcik on cancel
      await kycpage.reset();
//Edit Verification for Common documents
     await kycpage.editFunctionrandom();
//Edit Verification for ledger documents
    await kycpage.editledgerFunctionrandom();
    await kycpage.saveKyc();
});








































































































































































































































































































































































































































































































































