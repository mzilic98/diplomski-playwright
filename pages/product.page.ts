import { Locator, Page } from '@playwright/test';

export class Product {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPhoto: Locator;
  readonly availability: Locator;
  readonly productPrice: Locator;
  readonly addReview: Locator;
  readonly qtyLabel: Locator;
  readonly qtyInput: Locator;
  readonly addToCartBtn: Locator;
  readonly emailAFriendBtn: Locator;
  readonly addToCompareListBtn: Locator;
  readonly shoppingCart: Locator;
  readonly addToCartSucces: Locator;

  constructor(page: Page) {
  this.page = page;
  this.productTitle = page.getByRole('heading', { name: 'Blue Jeans' });
  this.productPhoto = page.getByRole('img', { name: 'Picture of Blue Jeans' });
  this.availability = page.getByText('In stock');
  this.productPrice = page.getByText('1.00', { exact: true });
  this.addReview = page.getByRole('link', { name: 'Add your review' });
  this.qtyLabel = page.getByText('Qty:');
  this.qtyInput = page.locator('#addtocart_36_EnteredQuantity');
  this.addToCartBtn = page.locator('#add-to-cart-button-36');
  this.emailAFriendBtn = page.getByRole('button', { name: 'Email a friend' });
  this.addToCompareListBtn = page.getByRole('button', { name: 'Add to compare list' });
  this.shoppingCart = page.getByRole('link', { name: 'Shopping cart (1)' })
  this.addToCartSucces = page.getByText('There are 1 item(s) in your cart.');
  };

  async goto() {
    await this.page.goto('/blue-jeans');
  }
}
