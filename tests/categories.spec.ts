import { test, expect } from "@playwright/test";
import { Categories } from "../pages/categories.page";

test.describe("Verify that the categories of the Demo web shop page work as intended", () => {
  let categories: Categories;
  test.beforeEach(async ({ page }) => {
    categories = new Categories(page);
    await categories.goto();

  });

  test("TEST 1 Verify that all categories are clickable", async ({
    page,
  }) => {

    await expect(categories.books).toBeEnabled();
    await expect(categories.computers).toBeEnabled();
    await expect(categories.electronics).toBeEnabled();
    await expect(categories.apparelAndShoes).toBeEnabled();
    await expect(categories.digitalDownloads).toBeEnabled();
    await expect(categories.jewelry).toBeEnabled();
    await expect(categories.giftcards).toBeEnabled();

    // await page.pause();
  });

  test("TEST 2 Verify the existence of products from the category.", async ({
    page,
  }) => {

    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/cell-phones');   
    // await page.pause();

    // provjera jel postoje proizvodi i koliko ih je
    // ovo je proslooooooooo!! :D
    // Maria nemoj me ubit sto koristim klasu kao lokator
    await page.waitForLoadState();
    const productCount = (await page.$$('.product-item')).length;
    // await page.pause();

    expect(productCount).toBeGreaterThan(0);
    // await page.pause();

  });

  test("TEST 3 Verify that the products have photos on them.", async ({
    page,
  }) => {

    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/cell-phones');   
    
    await page.pause();
    await expect(categories.smartphonePhoto).toBeVisible();
    await page.pause();

    // Flaky?
    await expect(categories.usedPhonePhoto).toBeVisible();
    await page.pause();

    await expect(categories.phoneCoverPhoto).toBeVisible();
    await page.pause();
    

  });

  test("TEST 4 Verify that all products have a price.", async ({
    page,
  }) => {

    await categories.electronics.click();
    await categories.cellphones.click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/cell-phones');   
    await page.pause();

    // za ovo bi mogla funkciju novu napravit pa ju pozvat i ovdje
    await page.waitForLoadState();
    const productCount = (await page.$$('.product-item')).length;
    expect(productCount).toBeGreaterThan(0);
    await page.pause();

    const priceCheck = (await page.$$('.price.actual-price')).length;
    expect(priceCheck).toBeGreaterThan(0);
    await page.pause();

    expect(productCount).toBe(priceCheck);
    await page.pause();
  });

  test("TEST 5 Verify that the Add to cart button is clickable", async ({
    page,
  }) => {

    // mission impossible locirati ovaj add to cart btn i zato fejla
    await categories.jewelry.click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/jewelry');   
    // await page.pause();
    await expect(categories.addToCartBtn).toBeEnabled();
    // await page.pause();

    await categories.addToCartBtn.click();
    // await page.pause();

    await expect(categories.shoppingCart).toBeVisible(); 
    // await page.pause();


    
  });

  // NEMOJ ZABORAVIT NA OVO!!
  test("TEST 6 Verify that the Sort by feature works as expected", async ({
    page,
  }) => {

    // mission impossible locirati ovaj add to cart btn i zato fejla
    await categories.digitalDownloads.click();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/digital-downloads');   
    await page.pause();

    await categories.sortBy.selectOption('Price: Low to High');
    // await categories.sortBy).();
    await page.pause();
    // ovdje dodat neki bolji expect da bi provjerili jel radi
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/digital-downloads?orderby=10');   

    
  });

  // Filter by price? isto bih mogla ubacit
  // https://demowebshop.tricentis.com/books
  // 25-50, da bude 0 produkata
 
  

});
