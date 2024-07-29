import { test, expect } from "@playwright/test";
import { Shopping_cart } from "../pages/shoppingc_cart.page";

test.describe("Verify that the shopping cart behavior of the Demo web shop page work as intended", () => {
  let shopping_cart: Shopping_cart;
  test.beforeEach(async ({ page }) => {
    shopping_cart = new Shopping_cart(page);

    await page.goto("https://demowebshop.tricentis.com/album-3");
    await shopping_cart.firstItemAddToCartBtn.click();
    await page.waitForTimeout(1000); 
    await shopping_cart.goto();
  });

  test("TEST 1 Verify that the items are visible in the shopping cart", 
  async ({}) => {

    await expect(shopping_cart.informativeMessage).toBeHidden();
    await expect(shopping_cart.firstItemInCart).toBeVisible();
  });

  test("TEST 2 Verify that the item price is visible in the shopping cart", 
  async () => {

    await expect(shopping_cart.firstItemPrice).toBeVisible();
  });

  test("TEST 3 Verify that the sum of two items is equal to the subtotal", 
  async ({ page }) => {

    await page.goto(
      "https://demowebshop.tricentis.com/digital-downloads"
    );
    await shopping_cart.secondItem.click();
    await shopping_cart.secondItemAddtoCartBtn.click();

    await page.waitForTimeout(1000);
    await shopping_cart.goto();

    await expect(shopping_cart.firstItemPrice).toBeVisible();
    await expect(shopping_cart.secondItemPrice).toBeVisible();
    await expect(shopping_cart.subtotal).toHaveText("11.00");
  });

  test("TEST 4 Verify that you can remove the item from the cart", 
  async () => {

    await shopping_cart.removeCheckbox.click();
    await shopping_cart.updateShoppingCartBtn.click();
    await expect(shopping_cart.firstItemInCart).toBeHidden();
  });

  test("TEST 5 Verify that the Continue shopping button is working correctly", 
  async ({ page }) => {

    await shopping_cart.continueShoppingBtn.click();
    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/"
    );
  });

  test("TEST 6 Verify that the Terms of service button is required", 
  async () => {

    await expect(shopping_cart.termsOfServiceCheckbox).not.toBeChecked();
    await shopping_cart.checkoutBtn.click();
    await expect(shopping_cart.termsOfServiceWarningBox).toBeVisible();
  });

  test("TEST 7 Verify the ability to complete a purchase successfully", 
  async ({ page }) => {

    await shopping_cart.termsOfServiceCheckbox.click();
    await shopping_cart.checkoutBtn.click();
    await shopping_cart.checkoutAsGuestBtn.click();

    await shopping_cart.firstNameInput.fill("Marija");
    await shopping_cart.lastNameInput.fill("QA");
    await shopping_cart.emailInput.fill("mpw@gmail.com");
    await shopping_cart.countryInput.selectOption("Croatia");
    await shopping_cart.cityInput.fill("Osijek");
    await shopping_cart.addresInput.fill("Ul. Lorenza Jagera");
    await shopping_cart.postalCodeInput.fill("31000");
    await shopping_cart.phoneNumberInput.fill("987283947");
    await shopping_cart.continueCheckoutBtn.click();
    
    await page.waitForTimeout(1000);
    await shopping_cart.continueCheckoutBtn.click();
    await page.waitForTimeout(1000);
    await shopping_cart.continueCheckoutBtn.click();
    await shopping_cart.confirmBtn.click();
    await expect(shopping_cart.successMessage).toBeVisible();

  });

  test("TEST 8 Verify that the empty state of the shopping cart is displayed correctly", 
  async () => {

    await shopping_cart.removeCheckbox.click();
    await shopping_cart.updateShoppingCartBtn.click();
    await expect(shopping_cart.informativeMessage).toBeVisible();
  });

});
