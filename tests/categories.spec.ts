import { test, expect } from "@playwright/test";
import { Categories } from "../pages/categories.page";

test.describe
  ("Verify that the categories of the Demo web shop page work as intended", () => {
  let categories: Categories;
  test.beforeEach(async ({ page }) => {
    categories = new Categories(page);
    await categories.goto();
  });

  test("TEST 1 Verify that all categories are clickable", 
  async ({}) => {
    await expect(categories.books).toBeEnabled();
    await expect(categories.computers).toBeEnabled();
    await expect(categories.electronics).toBeEnabled();
    await expect(categories.apparelAndShoes).toBeEnabled();
    await expect(categories.digitalDownloads).toBeEnabled();
    await expect(categories.jewelry).toBeEnabled();
    await expect(categories.giftcards).toBeEnabled();
  });

  test("TEST 2 Verify the existence of products from the category.", 
  async ({ page }) => {
    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      '/cell-phones'
    );

    await page.waitForLoadState();
    const productCount = (await page.$$('.product-item')).length;
    expect(productCount).toBeGreaterThan(0);
  });

  test("TEST 3 Verify that the products have photos on them.", 
  async ({ page }) => {

    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      '/cell-phones'
    );
    await expect(categories.smartphonePhoto).toBeVisible();
    await expect(categories.usedPhonePhoto).toBeVisible();
    await expect(categories.phoneCoverPhoto).toBeVisible();
  });

  test("TEST 4 Verify that all products have a price.", 
  async ({ page }) => {
    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      '/cell-phones'
    );

    await page.waitForLoadState();
    const productCount = (await page.$$('.product-item')).length;
    expect(productCount).toBeGreaterThan(0);

    const priceCheck = (await page.$$('.price.actual-price')).length;
    expect(priceCheck).toBeGreaterThan(0);
    expect(productCount).toBe(priceCheck);
  });

  test("TEST 5 Verify that a product can be added to the cart from the category page.",
    async ({ page }) => {
      await categories.digitalDownloads.click();
      await expect(page).toHaveURL(
        '/digital-downloads'
      );
      await expect(categories.addToCartBtn).toBeEnabled();

      await categories.addToCartBtn.click();
      await expect(categories.shoppingCart).toBeVisible();
    }
  );

  test(
    "TEST 6 Verify that the Sort By feature correctly sorts items based on the selected criteria.",
    async ({ page }) => {
     
      await categories.digitalDownloads.click();
      await expect(page).toHaveURL(
        '/digital-downloads'
      );

      await expect(page).toHaveScreenshot('before_sort_by.png'); 
      await categories.sortBy.selectOption('Price: Low to High');
      await expect(page).toHaveScreenshot('after_sort_by.png'); 
    }
  );

});
