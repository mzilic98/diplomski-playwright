import { test, expect, chromium } from "@playwright/test";
import { Login } from "../pages/login.page";
const fs = require('fs');

// OVO JE DONE ZASAD - provjerit s Marijom za test 5
test.describe("Verify that login of the Demo web shop page works as intended", () => {
  let login: Login;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();
  });
  //REVIEW
  //ukloniti page jer ga se ne koristi osim za pauzu kad se sve izdevelopa 
  // MŽ com: šta ovo znači?

  test("TEST 1 Verify that validation of the login form works as intended", async ({
    page,
  }) => {
    await login.loginBtn.click();
    await expect(login.logInFailedMessage).toBeVisible();
  });

  test("TEST 2 Verify that user can successfully log in if valid data is given", async ({
    page,
  }) => {
    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.loginBtn.click();

    await expect(login.logInFailedMessage).toBeHidden();

    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
  });

  test("TEST 3 Verify that the login will not be successful if the wrong password is entered", async ({
    page,
  }) => {
    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("diploomskiii");
    await login.loginBtn.click();

    await expect(login.logInFailedMessage).toBeVisible();

    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).not.toHaveURL("https://demowebshop.tricentis.com/");
  });

  test("TEST 4 Verify that the login will not be successful if the wrong email is entered", async ({
    page,
  }) => {
    await login.emailInput.fill("mpw.diplomski@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.loginBtn.click();

    await expect(login.logInFailedMessage).toBeVisible();

    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
  });
  // Test 5 - provjeri jel radi ak ukucas tocan, mail, tocan pass, i kliknes remember me
  // u pravilu vjerujem da bi trebalo ugasiti brower, ponovno otići na taj link
  // i vidjeti jel user ostao ulogiran

  //Review
  // dodala sam fixme anotaciju koja skippa test i kaze da se na njega treba vratiti da se popravi -  da mi prolaze testovi koji su provjereno dobri

  // MŽ com: sta god ovdje napravim ne valja, više ne znam iskr šta da radim
  // mislim da cu maknut ovaj test, sumnjam da cu ikak moc ovo istestirat kad svaki put otvara novi incognito page 
  test("TEST 5 Verify that the Remember Me feature works as expected", async ({ page, context }) => {

    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.rememberMeCheckbox.click();
    await login.loginBtn.click();
    await login.loggedInUserMail.waitFor({ state: 'visible' });

    // Extract authentication cookies
    const cookies = await context.cookies()
    console.log(cookies);
    
    await page.pause();
    // Close the browser
    await context.close();

    // Re-open the browser and set authentication cookies
    const cookie = ([{name:"NOPCOMMERCE.AUTH", value: "E3F9072DEF8EF9C1FDC83CF76CB56989AC7D62376D51CCD1F7F5BF888C704501F48A5BBCFBA0CD69F1D46684DCFDA053F625B0842ECD971A686E68B6874F0E13ED9499CC7954EC7EC669A684680843C8217C1851BA6B963F0A93DFB1B78290D54C7C4CF11284C5C49BD1EEFC876EDC8BB74F7786AEFCFBDE0EE80AA0C2137162D928E680F56787838CE27325BCF32CB1", url: "https://demowebshop.tricentis.com/"}]);

    const newContext = await chromium.launchPersistentContext('userDataDir', { headless: false });
    const newPage = await newContext.newPage();
    await page.pause();
    // Set authentication cookies
    // const cookie = ([{name:"NOPCOMMERCE.AUTH", value: "E3F9072DEF8EF9C1FDC83CF76CB56989AC7D62376D51CCD1F7F5BF888C704501F48A5BBCFBA0CD69F1D46684DCFDA053F625B0842ECD971A686E68B6874F0E13ED9499CC7954EC7EC669A684680843C8217C1851BA6B963F0A93DFB1B78290D54C7C4CF11284C5C49BD1EEFC876EDC8BB74F7786AEFCFBDE0EE80AA0C2137162D928E680F56787838CE27325BCF32CB1", url: "https://demowebshop.tricentis.com/"}]);

    await newPage.goto('https://demowebshop.tricentis.com');
    for (const cookie of cookies) {
      await newContext.addCookies([cookie]);
    }
    await page.pause();
    // Navigate to a page that requires authentication
    await newPage.goto('https://demowebshop.tricentis.com');

    // Verify that the user is still logged in
    await expect(login.loggedInUserMail).toBeVisible();

    // Close the new browser
    await newContext.close();




      // if (!fs.existsSync('state.json')) {
      //   fs.writeFileSync('state.json', '{}');
      // }

      // const browser = await chromium.launch({ headless: false }); // Launch browser in non-headless mode for debugging
      // const context = await browser.newContext({ storageState: 'state.json' }); // Persist browser storage

      // await page.pause();
      // // Open the login page
      // await login.emailInput.fill("mpw+1@gmail.com");
      // await login.passwordInput.fill("dipl987");
      // await login.rememberMeCheckbox.click();
      // await login.loginBtn.click();
      // await page.pause();
      // // await page.goto('https://demowebshop.tricentis.com');

      // // // Fill in the username and password fields
      // // await page.fill('input[name="username"]', 'your_username');
      // // await page.fill('input[name="password"]', 'your_password');

      // // // Check the "remember me" checkbox
      // // await page.check('input[name="remember_me"]');

      // // Submit the login form
      // // await Promise.all([
      // //   page.waitForNavigation(), // Wait for navigation to complete
      // //   page.click('button[type="submit"]'), // Click on the submit button
      // // ]);

      // // Verify that the login was successful
      // // You can add your verification logic here
      // await expect(login.loggedInUserMail).toBeVisible();
      // await page.pause();

      // // Close the browser
      // await browser.close();

      // // Re-open the browser
      // const newBrowser = await chromium.launch({ headless: false });
      // const newContext = await newBrowser.newContext({ storageState: 'state.json' }); // Restore browser storage
      // const newPage = await newContext.newPage();

      // await page.pause();
      // // Navigate to a page that requires authentication
      // await newPage.goto('https://demowebshop.tricentis.com');
      // await page.pause();

      // // Verify that the user is still logged in
      // // You can add your verification logic here
      // await expect(login.loggedInUserMail).toBeVisible();
      // await page.pause();

      // // Close the new browser
      // await newBrowser.close();




      // // await page.pause();
      // // await login.emailInput.fill("mpw+1@gmail.com");
      // // await login.passwordInput.fill("dipl987");
      // // await login.rememberMeCheckbox.click();
      // // await login.loginBtn.click();

      // // await expect(login.logInFailedMessage).toBeHidden();
      // // await page.pause();
      // // await expect(login.loggedInUserMail).toBeVisible();
      // // await expect(page).toHaveURL("https://demowebshop.tricentis.com");
      // // await page.pause();

      // // await page.close();
      // // await page.pause();

      // // // genijalno je sto ovo radi :D
      // // // (async () => {
      // // //   const browser = await chromium.launch();
      // // //   const context = await browser.newContext();
      // // //   const page = await context.newPage();
      // // //   await page.goto("https://demowebshop.tricentis.com");
      // // // })();
      // // // await page.pause();
      // // const context = await browser.newContext();

      // // // await context.addCookies([cookieObject1]);
      // // await context.addCookies([{name:"NOPCOMMERCE.AUTH", value: "E3F9072DEF8EF9C1FDC83CF76CB56989AC7D62376D51CCD1F7F5BF888C704501F48A5BBCFBA0CD69F1D46684DCFDA053F625B0842ECD971A686E68B6874F0E13ED9499CC7954EC7EC669A684680843C8217C1851BA6B963F0A93DFB1B78290D54C7C4CF11284C5C49BD1EEFC876EDC8BB74F7786AEFCFBDE0EE80AA0C2137162D928E680F56787838CE27325BCF32CB1", url: "https://demowebshop.tricentis.com/"}]);

      // // await page.pause();

      // // await page.reload();

      // // // Ovo fejla zato sto se korisnik izlogira nakon closeanja browsera
      // // // ipak smo u incognitu
      // // // al kak da onda provjeirm jel radi taj feature?
      // // // local storage
      // // //REVIEW
      // // // ovo se sprema u cookie - desni klik > inspect > Application > Cookies > nađeš auth token i spremiš ga u file, daš ga ovdje da ga page pročita prilikom novog loadanja pa će radit
      // // await expect(login.loggedInUserMail).toBeVisible();
      // // await page.pause();
      // // await page.close();
   });

  test("TEST 6 Verify that the Log out feature works as expected", async ({
    page,
  }) => {
    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.loginBtn.click();

    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL("https://demowebshop.tricentis.com");
    await expect(login.logOutNavBar).toBeEnabled;

    await login.logOutNavBar.click();

    await expect(login.logOutNavBar).not.toBeVisible;

    await expect(login.logInNavBar).toBeVisible;
    // await page.pause();
  });

  test("TEST 7 Verify that the Forgot Password feature works as expected if valid email is given", async ({
    page,
  }) => {
    await login.forgotPasswordLabel.click();
    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/passwordrecovery"
    );

    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa57@gmail.com");
    await login.recoverBtn.click();

    //Review
    // ova provjera URL-a ne treba - ne mjenja se url, osim ako zelis ptvrditi da te ne redirecta negdje dalje? TBD
    // MŽ com: budem ga izbrisala onda kad bude sve done, evo zasad nek ostane zakomentiran
    // await expect(page).toHaveURL(
    //   "https://demowebshop.tricentis.com/passwordrecovery"
    // );
    await expect(login.successMessage).toBeVisible();
  });

  test("TEST 8 Verify that the Forgot Password feature works as expected if invalid email is given", async ({
    page,
  }) => {
    await login.forgotPasswordLabel.click();

    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/passwordrecovery"
    );
    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa0%&'gmail");
    await login.recoverBtn.click();
    //Review
    // isto kao i test prije
        // MŽ com: isto ko i test prije
    // await expect(page).toHaveURL(
    //   "https://demowebshop.tricentis.com/passwordrecovery"
    // );
    await expect(login.wrongEmailMessage).toBeVisible();
  });

  test("TEST 9 Verify that the Forgot Password feature works as expected for nonregistered user", async ({
    page,
  }) => {
    await login.forgotPasswordLabel.click();

    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/passwordrecovery"
    );

    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa57+diplomski999@gmail.com");
    await login.recoverBtn.click();
    
    await expect(login.emailNotFoundMessage).toBeVisible();
  });
  //Review
  // mozda ne da radi ispravno jer je to genericki, ne govori puno o samoj akciji, mozes napisati npr:
  // Verify that the register button on the login page redirects the user to the Register page - jer to i je bit ovog testa - ovo je vrlo minor, samo nesto sto poboljsava visibility
  // MŽ com: uvažen review
  test("TEST 10 Verify that the register button on the login page redirects the user to the Register page", async ({
    page,
  }) => {
    await login.registerBtn.click();
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/register");
  });
});
