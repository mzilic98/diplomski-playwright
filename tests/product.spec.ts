import { test, expect } from '@playwright/test';
import { Product } from '../pages/product.page';

test.describe('Verify that the product behavior of the Demo web shop page work as intended', () => {
  let product: Product;
  test.beforeEach(async ({ page }) => {
    product = new Product(page);
    await product.goto();
  });

  test('TEST 1 Validating Essential Product Information', 
  async () => {

    await expect(product.productTitle).toBeVisible();
    await expect(product.productPhoto).toBeVisible();
    await expect(product.availability).toContainText('In stock');
    await expect(product.productPrice).toBeVisible();
  });

  test('TEST 2 Verify that the user can change the quantity of the product',
  async () => {

    await expect(product.qtyLabel).toBeVisible();
    await expect(product.qtyInput).toBeVisible();
    await product.qtyInput.fill('3');
    await expect(product.qtyInput).toHaveValue('3');
  });

  test('TEST 3 Verify that the Add to cart button works as expected', 
  async () => {

    await product.addToCartBtn.click();
    await product.shoppingCart.hover();
    await expect(product.addToCartSucces).toBeVisible();
  });

  test('TEST 4 Verify that the Email a friend button on the product page is working correctly', 
  async ({ page }) => {

    await product.emailAFriendBtn.click();
    await expect(page).toHaveURL(
      '/productemailafriend/36'
    );
  });

  test('TEST 5 Verify that the Compare list button on the product page is working correctly', 
  async ({  page }) => {

    await product.addToCompareListBtn.click();
    await expect(page).toHaveURL(
      '/compareproducts'
    );
  });

  test('TEST 6 Verify that the Add your Review link on the product page is clickable', 
  async ({ page }) => {

    await product.addReview.click();
    await expect(page).toHaveURL(
      '/productreviews/36'
    );
  });
});
