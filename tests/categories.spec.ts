import { test, expect } from "@playwright/test";
import { Categories } from "../pages/categories.page";

// OVO JE DONE - PROVJERIT S MARIJOM ZA TEST 6
test.describe
  ("Verify that the categories of the Demo web shop page work as intended", () => {
  let categories: Categories;
  test.beforeEach(async ({ page }) => {
    categories = new Categories(page);
    await categories.goto();
  });

  test("TEST 1 Verify that all categories are clickable", async ({ page }) => {
    await expect(categories.books).toBeEnabled();
    await expect(categories.computers).toBeEnabled();
    await expect(categories.electronics).toBeEnabled();
    await expect(categories.apparelAndShoes).toBeEnabled();
    await expect(categories.digitalDownloads).toBeEnabled();
    await expect(categories.jewelry).toBeEnabled();
    await expect(categories.giftcards).toBeEnabled();
  });

  test("TEST 2 Verify the existence of products from the category.", async ({
    page,
  }) => {
    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/cell-phones"
    );

    await page.waitForLoadState();
    const productCount = (await page.$$(".product-item")).length;
    expect(productCount).toBeGreaterThan(0);
  });

  test("TEST 3 Verify that the products have photos on them.", async ({
    page,
  }) => {
    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/cell-phones"
    );
    await expect(categories.smartphonePhoto).toBeVisible();
    // Flaky?
    await expect(categories.usedPhonePhoto).toBeVisible();
    await expect(categories.phoneCoverPhoto).toBeVisible();
  });

  test("TEST 4 Verify that all products have a price.", async ({ page }) => {
    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL(
      "https://demowebshop.tricentis.com/cell-phones"
    );

    await page.waitForLoadState();
    const productCount = (await page.$$(".product-item")).length;
    expect(productCount).toBeGreaterThan(0);

    const priceCheck = (await page.$$(".price.actual-price")).length;
    expect(priceCheck).toBeGreaterThan(0);
    expect(productCount).toBe(priceCheck);
  });

  // fixed
  test(
    "TEST 5 Verify that the Add to cart button is clickable",
    async ({ page }) => {
      await categories.digitalDownloads.click();
      // await page.pause();

      await expect(page).toHaveURL("https://demowebshop.tricentis.com/digital-downloads");
      await expect(categories.addToCartBtn).toBeEnabled();
      // await page.pause();

      await categories.addToCartBtn.click();
      // await page.pause();

      await expect(categories.shoppingCart).toBeVisible();
      // await page.pause();
    }
  );

  // Ovo prolazi, screenshoti su dodani, ali se trebam konzultirat s komentoricom za dalje
  test(
    "TEST 6 Verify that the Sort by feature works as expected",
    async ({ page }) => {
      // napravi screenshot!!
      // await expect(page).toHaveScreenshot();
      // await page.pause();
      await page.pause();
      
      await categories.digitalDownloads.click();
      await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/digital-downloads"
      );

      await page.screenshot({ path: 'screenshot_before.png' });
      await page.pause();

      await categories.sortBy.selectOption("Price: Low to High");
      // await categories.sortBy).();
      // ovdje dodat neki bolji expect da bi provjerili jel radi
      await page.pause();

      await page.screenshot({ path: 'screenshot_after.png' });
      await page.pause();

      await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/digital-downloads?orderby=10"
      );
      // napravi screenshot!!
    }
  );


});
