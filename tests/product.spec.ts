import { test, expect } from "@playwright/test";
import { Product } from "../pages/product.page";


test.describe("Verify that the product behavior of the Demo web shop page work as intended", () => {
  let product: Product;
  test.beforeEach(async ({ page }) => {
    product = new Product(page);
    await product.goto();

  });


  test("TEST 1 Verify that the product has title", async ({
    page,
  }) => {

   await expect(product.productTitle).toBeVisible();

  });

  test("TEST 2 Verify that the product has photo", async ({
    page,
  }) => {

   await expect(product.productPhoto).toBeVisible();

  });

  test("TEST 3 Verify that the product is available", async ({
    page,
  }) => {

   await expect(product.availability).toContainText('In stock');

  });

  test("TEST 4 Verify that the product has price", async ({
    page,
  }) => {

  await expect(product.productPrice).toBeVisible();

  });

  // ovo PONOVNO PROĐI
  test.only("TEST 5 Verify that the user can change the quantity of the product", async ({
    page,
  }) => {

  await expect(product.qtyLabel).toBeVisible();
  await expect(product.qtyInput).toBeVisible();
  await expect(product.qtyInput).toBeVisible();
  await page.pause();

  await page?.fill('input#addtocart_36_EnteredQuantity', '');;
  await product.qtyInput.fill("3");
  await page.pause();
  
  // zaš ovaj ispod expect fejlaaaaa???????? :angry-bird:
  console.log(product.qtyInput);
  await page.pause();
  await expect(page.getByLabel('Qty:')).toHaveText("3");
  // await page.pause();
  });
 
 
  test("TEST 6 Verify that the Add to cart button works as expected", async ({
    page,
  }) => {

  await product.addToCartBtn.click();
  await product.shoppingCart.hover();

  await expect(product.addToCartSucces).toBeVisible();
  });

  // za Email a friend bih mogla radit novi page, al ce bit jako slican ko i login/register
  test("TEST 7 Verify that the Email a friend button on the product page is working correctly", async ({
    page,
  }) => {

  await product.emailAFriendBtn.click();

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/productemailafriend/36');
  });

  test("TEST 8 Verify that the Compare list button on the product page is working correctly", async ({
    page,
  }) => {

  await product.addToCompareListBtn.click();

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/compareproducts');

});

test("TEST 9 Verify that the Add your Review link on the product page is clickable", async ({
  page,
}) => {

await product.addReview.click();

await expect(page).toHaveURL('https://demowebshop.tricentis.com/productreviews/36');

});




});
