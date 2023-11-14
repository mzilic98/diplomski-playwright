import { test, expect } from "@playwright/test";
import { Categories } from "../pages/categories.page";

test.describe
  .only("Verify that the categories of the Demo web shop page work as intended", () => {
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
    // provjera jel postoje proizvodi i koliko ih je
    // ovo je proslooooooooo!! :D
    // Maria nemoj me ubit sto koristim klasu kao lokator
    // NECU :P
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
    // za ovo bi mogla funkciju novu napravit pa ju pozvat i ovdje - NE NE BUŠ
    await page.waitForLoadState();
    const productCount = (await page.$$(".product-item")).length;
    expect(productCount).toBeGreaterThan(0);

    const priceCheck = (await page.$$(".price.actual-price")).length;
    expect(priceCheck).toBeGreaterThan(0);
    expect(productCount).toBe(priceCheck);
  });

  test.fixme(
    "TEST 5 Verify that the Add to cart button is clickable",
    async ({ page }) => {
      // ovo je locirano, dovrši test!!
      await categories.jewelry.click();
      await expect(page).toHaveURL("https://demowebshop.tricentis.com/jewelry");
      await expect(categories.addToCartBtn).toBeEnabled();
      // await page.pause();

      await categories.addToCartBtn.click();
      // await page.pause();

      await expect(categories.shoppingCart).toBeVisible();
      // await page.pause();
    }
  );

  // NEMOJ ZABORAVIT NA OVO!!
  test.fixme(
    "TEST 6 Verify that the Sort by feature works as expected",
    async ({ page }) => {
      // napravi screenshot!!
      // mission impossible locirati ovaj add to cart btn i zato fejla
      await categories.digitalDownloads.click();
      await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/digital-downloads"
      );

      await categories.sortBy.selectOption("Price: Low to High");
      // await categories.sortBy).();
      // ovdje dodat neki bolji expect da bi provjerili jel radi
      await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/digital-downloads?orderby=10"
      );
      // napravi screenshot!!
    }
  );

  // Filter by price? isto bih mogla ubacit
  // https://demowebshop.tricentis.com/books
  // 25-50, da bude 0 produkata
  // Review
  //ovo samo ako zelis, mislim da imas sasvim dovoljno svega
});
