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
  // smijem li ovdje ponavljati registerBtn? pretpostavljam da da
  readonly registerBtn: Locator;



  //konstruktor u kojemu dodjeljuemo vrijednosti pojedinim varijablama koje su definirane iznad
  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
    this.registerBtn = page.getByRole('button', { name: 'Register' });

    
    

    

  }

  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/login");
  }
}
