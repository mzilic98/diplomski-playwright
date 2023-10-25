import { test, expect, chromium } from "@playwright/test";
import { Login } from "../pages/login.page";

test.describe("Verify that login of the Demo web shop page works as intended", () => {
  let login: Login;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();

  });

  test("TEST 1 Verify that validation of the login form works as intended", async ({
    page,
  }) => {
    await login.loginBtn.click();

    await expect(login.logInFailedMessage).toBeVisible();
    // await page.pause();
  });
 

  test("TEST 2 Verify that user can successfully log in if valid data is given", async ({
    page,
  }) => {

    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987")
    await login.loginBtn.click();


    await expect(login.logInFailedMessage).toBeHidden();
    await page.pause();
    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await page.pause();

  });

  test("TEST 3 Verify that the login will not be successful if the wrong password is entered", async ({
    page,
  }) => {

    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("diploomskiii")
    await login.loginBtn.click();


    await expect(login.logInFailedMessage).toBeVisible();
    await page.pause();
    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).not.toHaveURL('https://demowebshop.tricentis.com/');
    // await page.pause();

  });


  test("TEST 4 Verify that the login will not be successful if the wrong email is entered", async ({
    page,
  }) => {

    await login.emailInput.fill("mpw.diplomski@gmail.com");
    await login.passwordInput.fill("dipl987")
    await login.loginBtn.click();


    await expect(login.logInFailedMessage).toBeVisible();
    await page.pause();
    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    await page.pause();

  });
  // Test 5 - provjeri jel radi ak ukucas tocan, mail, tocan pass, i kliknes remember me
    // u pravilu vjerujem da bi trebalo ugasiti brower, ponovno otići na taj link
    // i vidjeti jel user ostao ulogiran

    test("TEST 5 Verify that the Remember Me feature works as expected", async ({
      page,
    }) => {
  
      await login.emailInput.fill("mpw+1@gmail.com");
      await login.passwordInput.fill("dipl987");
      await login.rememberMeCheckbox.click();
      await login.loginBtn.click();
  
  
      await expect(login.logInFailedMessage).toBeHidden();
      await page.pause();
      await expect(login.loggedInUserMail).toBeVisible();
      await expect(page).toHaveURL('https://demowebshop.tricentis.com');
      await page.pause();

      await page.close();
      await page.pause();

      // genijalno je sto ovo radi :D 
      (async () => {
        const browser = await chromium.launch();  
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://demowebshop.tricentis.com');
      })();
      await page.pause();

      // Ovo fejla zato sto se korisnik izlogira nakon closeanja browsera
      // ipak smo u incognitu 
      // al kak da onda provjeirm jel radi taj feature?
      // local storage
      await expect(login.loggedInUserMail).toBeVisible();
      await page.pause();
      await page.close();
    });


     test("TEST 6 Verify that the Log out feature works as expected", async ({
    page,
  }) => {

    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987")
    await login.loginBtn.click();
    // await page.pause();

    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com');
    await expect(login.logOutNavBar).toBeEnabled;
    // await page.pause();

    await login.logOutNavBar.click();
    // await page.pause();

    await expect(login.logOutNavBar).not.toBeVisible;
    // await page.pause();
    await expect(login.logInNavBar).toBeVisible;
    // await page.pause();

  });


  test("TEST 7 Verify that the Forgot Password feature works as expected if valid email is given", async ({
    page,
  }) => {

    await login.forgotPasswordLabel.click();
    await page.pause();

    await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
    await page.pause();
    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa57@gmail.com");
    await login.recoverBtn.click();
    await page.pause();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
    await page.pause();
    await expect(login.successMessage).toBeVisible();
  });

    test("TEST 8 Verify that the Forgot Password feature works as expected if invalid email is given", async ({
      page,
    }) => {
  
      await login.forgotPasswordLabel.click();
      await page.pause();
  
      await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
      await page.pause();
      await expect(login.passwordRecovery).toBeVisible();
      await login.recoveryEmail.fill("mzqa0%&'gmail");
      await login.recoverBtn.click();
      await page.pause();
      await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
      await page.pause();
      await expect(login.wrongEmailMessage).toBeVisible();
      await page.pause();
    });


    test("TEST 9 Verify that the Forgot Password feature works as expected for nonregistered user", async ({
      page,
    }) => {
  
      await login.forgotPasswordLabel.click();
      await page.pause();
  
      await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
      await page.pause();
      await expect(login.passwordRecovery).toBeVisible();
      await login.recoveryEmail.fill("mzqa57+diplomski999@gmail.com");
      await login.recoverBtn.click();
      
      // await expect(page).toHaveURL('https://demowebshop.tricentis.com/passwordrecovery');
      // await expect(login.wrongEmailMessage).not.toBeVisible();
      
      await expect(login.emailNotFoundMessage).toBeVisible();
    });

  test("TEST 10 Verify that the register button on the login page is working correctly", async ({
    page,
  }) => {

    await login.registerBtn.click();
    await page.pause();
    
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/register');
    await page.pause();

  });

});
