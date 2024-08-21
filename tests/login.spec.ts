import { test, expect, chromium } from "@playwright/test";
import { Login } from "../pages/login.page";
// import fs from "fs";

test.describe("Verify that login of the Demo web shop page works as intended", () => {
  let login: Login;
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();
  });
 
  test("TEST 1 Verify that validation of the login form works as intended", 
  async ({}) => {

    await login.loginBtn.click();
    await expect(login.logInFailedMessage).toBeVisible();
  });

  test("TEST 2 Verify that user can successfully log in if valid data is given", 
  async ({ page }) => {

    await login.emailInput.fill('mpw+1@gmail.com');
    await login.passwordInput.fill('dipl987');
    await login.loginBtn.click();
    await page.pause();
    await expect(login.logInFailedMessage).toBeHidden();
    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL(
      "/"
    );
  });

  test("TEST 3 Verify that the login will not be successful if the wrong password is entered", 
  async ({ page }) => {

    await login.emailInput.fill('mpw+1@gmail.com');
    await login.passwordInput.fill('diploomskiii');
    await login.loginBtn.click();
    await expect(login.logInFailedMessage).toBeVisible();
    await page.pause();
    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).not.toHaveURL(
      "/"
    );
  });

  test("TEST 4 Verify that the login will not be successful if the wrong email is entered", 
  async ({ page }) => {

    await login.emailInput.fill("mpw.diplomski@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.loginBtn.click();
    await expect(login.logInFailedMessage).toBeVisible();
    await expect(login.loggedInUserMail).toBeHidden();
    await expect(page).toHaveURL(
      '/login'
    );
  });

  test("TEST 5 Verify that the Log out feature works as expected", 
  async ({ page }) => {

    await login.emailInput.fill("mpw+1@gmail.com");
    await login.passwordInput.fill("dipl987");
    await login.loginBtn.click();
    await expect(login.loggedInUserMail).toBeVisible();
    await expect(page).toHaveURL(
      '/'
    );
    await expect(login.logOutNavBar).toBeEnabled;
    await login.logOutNavBar.click();
    await expect(login.logOutNavBar).not.toBeVisible;
    await expect(login.logInNavBar).toBeVisible;
  });

  test("TEST 6 Verify that the Forgot Password feature works as expected if valid email is given", 
  async ({ page }) => {

    await login.forgotPasswordLabel.click();
    await expect(page).toHaveURL(
      '/passwordrecovery'
    );
    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa57@gmail.com");
    await login.recoverBtn.click();
    await expect(login.successMessage).toBeVisible();
  });

  test("TEST 7 Verify that the Forgot Password feature works as expected if invalid email is given",
  async ({ page }) => {

    await login.forgotPasswordLabel.click();
    await expect(page).toHaveURL(
      '/passwordrecovery'
    );
    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa0%&'gmail");
    await login.recoverBtn.click();
    await expect(login.wrongEmailMessage).toBeVisible();
  });

  test("TEST 8 Verify that the Forgot Password feature works as expected for nonregistered user", 
  async ({ page }) => {

    await login.forgotPasswordLabel.click();
    await expect(page).toHaveURL(
      '/passwordrecovery'
    );
    await expect(login.passwordRecovery).toBeVisible();
    await login.recoveryEmail.fill("mzqa57+diplomski999@gmail.com");
    await login.recoverBtn.click();
    await expect(login.emailNotFoundMessage).toBeVisible();
  });

  test("TEST 9 Verify that the register button on the login page redirects the user to the Register page", 
  async ({  page }) => {

    await login.registerBtn.click();
    await expect(page).toHaveURL(
      '/register'
    );
  });
});
