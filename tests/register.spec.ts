import { test, expect } from "@playwright/test";
import { Register } from "../pages/register.page";
import { generateUniqueUserEmail } from "../utils/helpers/generateUniqueUserEmail";

test.describe("Verify that registration of the Demo web shop page works as intended", () => {
  let register: Register;

  test.beforeEach(async ({ page }) => {
    register = new Register(page);
    await register.goto();
  });

  test("TEST 1 Verify that validation of the register form works as intended", 
  async () => {

    await register.registerBtn.click();
    await expect(register.firstNameValidationElement).toBeVisible();
    await expect(register.lastNameValidationElement).toBeVisible();
    await expect(register.emailValidationElement).toBeVisible();
    await expect(register.passwordValidationElement).toBeVisible();
    await expect(register.confirmPasswordValidationElement).toBeVisible();
    await expect(register.registerBtn).toBeVisible();
  });

  test("TEST 2 Verify that user can successfully register if valid data is given",
    async ({ page }) => {

      await register.femaleCheckbox.click();
      await register.firstNameInput.fill("Marija");
      await register.lastNameInput.fill("QA");
      await generateUniqueUserEmail(page, "mpw2");
      await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/registerresult/1"
      );
      await expect(register.registrationCompleted).toBeVisible();
      await expect(register.continueBtn).toBeVisible();
    }
  );

  test("TEST 3 Verify email input error message if the email form is invalid", 
  async () => {

    await register.femaleCheckbox.click();
    await register.firstNameInput.fill("Marija");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill("invalidEmail#$%&");
    await register.passwordInput.fill("dipl987");
    await register.confirmPasswordInput.fill("dipl987");
    await register.registerBtn.click();

    await expect(register.invalidEmail).toBeVisible();
    await expect(register.registrationCompleted).toBeHidden();
  });

  test("TEST 4 Verify email input error message if the email form is already in use", 
  async () => {

    await register.femaleCheckbox.click();
    await register.firstNameInput.fill("Marija");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill("mpw+1@gmail.com");
    await register.passwordInput.fill("dipl987");
    await register.confirmPasswordInput.fill("dipl987");
    await register.registerBtn.click();

    await expect(register.emailInUse).toBeVisible();
    await expect(register.registrationCompleted).toBeHidden();
  });

  test("TEST 5 Verify password input field for minimum characters allowed", 
  async () => {

    await register.passwordInput.fill("123");
    await register.confirmPasswordInput.fill("123");
    await expect(register.passwordMinimum).toBeVisible();
  });

  test("TEST 6 Verify error message if password is not the same in both password fields", 
  async () => {

    await register.maleCheckbox.click();
    await register.firstNameInput.fill("Marko");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill("markopw+2@gmail.com");
    await register.passwordInput.fill("diplomski23");
    await register.confirmPasswordInput.fill("diplomski35");
    await register.registerBtn.click();

    await expect(register.passwordNotMatch).toBeVisible();
    await expect(register.registrationCompleted).toBeHidden();
  });

});
