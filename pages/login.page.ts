import { Locator, Page } from "@playwright/test";

export class Login {
  readonly page: Page;

  readonly emailLabel: Locator;
  readonly emailInput: Locator;
  readonly passwordLabel: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLabel: Locator;
  readonly loginBtn: Locator;
  readonly registerBtn: Locator;
  readonly logInFailedMessage: Locator;
  readonly loggedInUserMail: Locator;
  readonly logOutNavBar: Locator;
  readonly logInNavBar: Locator;
  readonly passwordRecovery: Locator;
  readonly recoveryEmail: Locator;
  readonly recoverBtn: Locator;
  readonly successMessage: Locator;
  readonly wrongEmailMessage: Locator;
  readonly emailNotFoundMessage: Locator;



  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.emailLabel = page.getByText('Email:')
    this.emailInput = page.getByLabel('Email:');
    this.passwordLabel = page.getByText('Password:');
    this.passwordInput = page.getByLabel('Password:');
    this.rememberMeCheckbox = page.getByLabel('Remember me?');
    this.forgotPasswordLabel = page.getByRole('link', { name: 'Forgot password?' });
    this.logInFailedMessage = page.getByText('Login was unsuccessful. Please correct the errors and try again.');
    this.loggedInUserMail = page.getByRole('link', { name: 'mpw+1@gmail.com' });
    this.logOutNavBar = page.getByRole('link', { name: 'Log out' });
    this.logInNavBar = page.getByRole('link', { name: 'Log in' });

  // Forgot password elements
    this.passwordRecovery = page.getByRole('heading', { name: 'Password recovery' });
    this.recoveryEmail = page.getByLabel('Your email address:');
    this.recoverBtn = page.getByRole('button', { name: 'Recover' });
    this.successMessage = page.getByText('Email with instructions has been sent to you.');
    this.wrongEmailMessage = page.getByText('Wrong email');
    this.emailNotFoundMessage = page.getByText('Email not found.');
    


  };

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/login");
  }
}
