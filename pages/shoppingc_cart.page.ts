import { Locator, Page } from "@playwright/test";

export class Shopping_cart {
  readonly page: Page;
  readonly informativeMessage: Locator;
  readonly shoppingCartEmptyBtn: Locator;
  readonly firstItem: Locator;
  readonly secondItem: Locator;
  readonly firstItemAddToCartBtn: Locator;
  readonly secondItemAddtoCartBtn: Locator;
  readonly goToCartBtn: Locator;
  readonly removeCheckbox: Locator;
  readonly updateShoppingCartBtn: Locator;
  readonly continueShoppingBtn: Locator;
  readonly termsOfServiceCheckbox: Locator;
  readonly termsOfServiceWarningBox: Locator;
  readonly checkoutBtn: Locator;
  readonly firstItemInCart: Locator;
  readonly secondItemInCart: Locator;
  readonly firstItemPrice: Locator;
  readonly secondItemPrice: Locator;
  readonly subtotal: Locator;
  readonly checkoutAsGuestBtn: Locator;
  readonly continueCheckoutBtn: Locator;
  readonly confirmBtn: Locator;
  readonly successMessage: Locator;

  // Billing 
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly addresInput: Locator;
  readonly postalCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartEmptyBtn = page.getByRole("link", {
      name: "Shopping cart (0)",
    });
    this.informativeMessage = page.getByText("Your Shopping Cart is empty!");
    this.firstItem = page.getByRole("link", { name: "Picture of 3rd Album" });
    this.secondItem = page
      .getByRole("link", { name: "Picture of Music 2" })
      .first();
    this.firstItemAddToCartBtn = page.locator("#add-to-cart-button-53");
    this.secondItemAddtoCartBtn = page.locator("#add-to-cart-button-51");
    this.goToCartBtn = page.getByRole("button", { name: "Go to cart" });
    this.removeCheckbox = page
      .getByRole("row", { name: "Picture of 3rd Album 3rd Album 1.00 1.00" })
      .getByRole("checkbox");
    this.updateShoppingCartBtn = page.getByRole("button", {
      name: "Update shopping cart",
    });
    this.continueShoppingBtn = page.getByRole("button", {
      name: "Continue shopping",
    });
    this.termsOfServiceCheckbox = page.locator("#termsofservice");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
    this.firstItemInCart = page.getByRole("link", { name: "3rd Album" });
    this.secondItemInCart = page.getByRole("link", { name: "Music 2" });
    this.firstItemPrice = page
      .getByRole("row", { name: "Picture of 3rd Album 3rd Album 1.00 1.00" })
      .getByText("Total: 1.00");
    this.secondItemPrice = page.getByText("Total: 10.00");
    this.subtotal = page
      .getByRole("row", { name: "Sub-Total: 11.00" })
      .getByText("11.00");
    this.termsOfServiceWarningBox = page.locator(
      "#terms-of-service-warning-box"
    );
    this.checkoutAsGuestBtn = page.getByRole("button", {
      name: "Checkout as Guest",
    });
    // Billing
    this.firstNameInput = page.getByLabel('First name:');
    this.lastNameInput = page.getByLabel('Last name:');
    this.emailInput = page.getByLabel('Email:');
    this.countryInput = page.getByRole('combobox', { name: 'Country:' });
    this.cityInput = page.getByLabel('City:');
    this.addresInput = page.getByLabel('Address 1:');
    this.postalCodeInput = page.getByLabel('Zip / postal code:');
    this.phoneNumberInput = page.getByLabel('Phone number:');
    this.continueCheckoutBtn = page.getByRole('button', { name: 'Continue' });
    
    this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
    this.successMessage = page.getByText('Your order has been successfully processed!');

  }
  //Review
  //Dodala sam ovaj load ovdje da vidimo hoce ovo popraviti flakyness testova
  async goto() {
    await this.page.goto("https://demowebshop.tricentis.com/cart", {
      waitUntil: "load",
    });
  }
}
