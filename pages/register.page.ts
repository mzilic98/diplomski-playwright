import { Locator, Page } from "@playwright/test";

export class Register {
  readonly page: Page;
  readonly registerBtn: Locator;
  readonly genderLabel: Locator;
  readonly maleCheckbox: Locator;
  readonly femaleCheckbox: Locator;
  readonly firstNameLabel: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameLabel: Locator;
  readonly lastNameInput: Locator;
  readonly emailLabel: Locator;
  readonly emailInput: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordLabel: Locator;
  readonly confirmPasswordInput: Locator;
  readonly firstNameValidationElement: Locator;
  readonly lastNameValidationElement: Locator;
  readonly emailValidationElement: Locator;
  readonly passwordValidationElement: Locator;
  readonly confirmPasswordValidationElement: Locator;
  readonly registrationCompleted: Locator;
  readonly continueBtn: Locator;
  readonly registrationConfirmed: Locator; 
  readonly invalidEmail: Locator;
  readonly emailInUse: Locator;
  readonly passwordMinimum: Locator;
  readonly passwordNotMatch: Locator;
   
  constructor(page: Page) {
    this.page = page;
    this.registerBtn = page.locator("#register-button");
    this.genderLabel = page.getByText("Gender:");
    this.maleCheckbox = page.getByLabel("Male", { exact: true });
    this.femaleCheckbox = page.getByLabel("Female");
    this.firstNameLabel = page.locator('[for="FirstName"]');
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameLabel = page.locator('[for="LastName"]');
    this.lastNameInput = page.locator("#LastName");
    this.emailLabel = page.locator('[for="Email"]');
    this.emailInput = page.locator("#Email");
    this.passwordLabel = page.locator('[for="Password"]');
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordLabel = page.locator('[for="ConfirmPassword"]');
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.firstNameValidationElement = page.getByText('First name is required.');
    this.lastNameValidationElement = page.getByText('Last name is required.');
    this.emailValidationElement = page.getByText('Email is required.');
    this.passwordValidationElement = page.getByText('Password is required.').first();
    this.confirmPasswordValidationElement = page.getByText('Password is required.').nth(1);
    this.registrationCompleted = page.getByText('Your registration completed');
    this.continueBtn = page.getByRole('button', { name: 'Continue'});
    this.invalidEmail = page.getByText('Wrong email');
    this.emailInUse = page.locator(".message-error");
    this.passwordMinimum = page.getByText('The password should have at least 6 characters. ');
    this.passwordNotMatch = page.getByText('The password and confirmation password do not match. ');
  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/register");
  }
}
