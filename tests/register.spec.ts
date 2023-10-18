import { test, expect } from "@playwright/test";
import { Register } from "../pages/register.page";
import { generateUniqueUserEmail } from "./helpers/generateUniqueUserEmail";

test.describe("Verify that registration of the Demo web shop page works as intended", () => {
  let register: Register;
  //na ovaj nacin nam je globalno dostupna varijabla register koju konstruiramo samo jednom u beforeEach
  test.beforeEach(async ({ page }) => {
    register = new Register(page);
    await register.goto();

  });

  test("TEST 1 Verify that validation of the register form works as intended", async ({
    page,
  }) => {

    await register.registerBtn.click();
    // await page.pause();
    
    await expect(register.firstNameValidationElement).toBeVisible();
    await expect(register.lastNameValidationElement).toBeVisible();
    await expect(register.emailValidationElement).toBeVisible();
    await expect(register.passwordValidationElement).toBeVisible();
    await expect(register.confirmPasswordValidationElement).toBeVisible();
    await expect(register.registerBtn).toBeVisible();
    // await page.pause();
  });
  // jel bi u testu jedan mogla koristiti expect(value).toThrow()

  test.only("TEST 2 Verify that user can successfully register if valid data is given", async ({
    page,
  }) => {

    const email = await generateUniqueUserEmail(page, "mpw@gmail.com");
    await register.femaleCheckbox.click();
    await page.pause();
    await register.firstNameInput.fill("Marija");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill(email);
    await register.passwordInput.fill("dipl987");
    await register.confirmPasswordInput.fill("dipl987");
    await register.registerBtn.click();
    await page.pause();

    await expect(page).toHaveURL('https://demowebshop.tricentis.com/registerresult/1');  
    await page.goto("https://demowebshop.tricentis.com/registerresult/1");
    await expect(register.registrationCompleted).toBeVisible();
    await expect(register.continueBtn).toBeVisible();
    // await expect(register.registrationConfirmed).toBeVisible();

  });

  // možeš napraviti isti test case samo sa male checkboxom gore ili bar provjerit jel clickable

// ovdje možeš jedan simple test ili jedan komplicirani gdje koristiš funkciju
  test("TEST 3 Verify email input error message if the email form is invalid", async ({
    page,
  }) => {
    await register.femaleCheckbox.click();
    await page.pause();
    await register.firstNameInput.fill("Marija");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill("invalidEmail#$%&");
    await register.passwordInput.fill("dipl987");
    await register.confirmPasswordInput.fill("dipl987");
    await register.registerBtn.click();
    await page.pause();

    
    await expect(register.invalidEmail).toBeVisible();
    await expect(register.registrationCompleted).toBeHidden();
  });

   test("TEST 4 Verify email input error message if the email form is already in use", async ({
    page,
  }) => {

    await register.femaleCheckbox.click();
    await page.pause();
    await register.firstNameInput.fill("Marija");
    await register.lastNameInput.fill("QA");
    await register.emailInput.fill("mpw+1@gmail.com");
    await register.passwordInput.fill("dipl987");
    await register.confirmPasswordInput.fill("dipl987");
    await register.registerBtn.click();
    await page.pause();

    await expect(register.emailInUse).toBeVisible();
    await expect(register.registrationCompleted).toBeHidden();
  });

  test("TEST 5 Verify password input field for minimum characters allowed", async ({
    page,
  }) => {

    await register.passwordInput.fill("123");
    await page.pause();
    await register.confirmPasswordInput.fill("123");
    await page.pause();

    await expect(register.passwordMinimum).toBeVisible();
    await page.pause();
  });
  
  test("TEST 6 Verify error message if password is not the same in both password fields", async ({
    page,
  }) => {

    await register.maleCheckbox.click();
    await register.firstNameInput.fill("Marko");
    await register.lastNameInput.fill("QA");
    // ovdje kod inputa emaila isto funkcija za email +broj
    await register.emailInput.fill("markopw+2@gmail.com");
    await register.passwordInput.fill("diplomski23");
    await register.confirmPasswordInput.fill("diplomski35");
    await page.pause();
    await register.registerBtn.click();
    await page.pause();

    // ovaj preskace, za sta to sluzi uopce? kak se koristi throw error?
    expect(() => {
      throw new Error('Something bad');
    }).toThrow();

    // await expect(register.registerBtn).toThrowError();
    await page.pause();
    await expect(register.passwordNotMatch).toBeVisible();
    // toContainText('The password and confirmation password do not match.');
    await page.pause();
    await expect(register.registrationCompleted).toBeHidden();
  });


  // ovaj test će failat zato što je to bug na stranici

  // trebam skuzit kak da kreiram funkciju za email
  // koja će uvijek koristiti dosad ne korištenu email adresu, baciti error
  // i onda ponovno koristiti istu mail adresu da bi se registrirao
  test("TEST 8 Verify if you can register with the same email address if the system initially threw an error during registration.", async ({
    page,
  }) => {

 });

//  još ću vidjet hoću li ga ovdje testirat ili u loginu
//  test("TEST 9 Verify that the logout works correctly after registration.", async ({
//   page,
// }) => {

//   await register.femaleCheckbox.click();
//     await page.pause();
//     await register.firstNameInput.fill("Marija");
//     await register.lastNameInput.fill("QA");
//     // email funkcija ako email već postoji
//     await register.emailInput.fill("mpw+9@gmail.com");
//     await register.passwordInput.fill("dipl987");
//     await register.confirmPasswordInput.fill("dipl987");
//     await register.registerBtn.click();
//     await page.pause();

//     await expect(page).toHaveURL('https://demowebshop.tricentis.com/registerresult/1');  
//     await page.goto("https://demowebshop.tricentis.com/registerresult/1");
//     await expect(register.registrationCompleted).toBeVisible();
//     await expect(register.continueBtn).toBeVisible();

// });


});
