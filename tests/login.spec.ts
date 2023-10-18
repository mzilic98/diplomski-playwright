import { test, expect } from "@playwright/test";
import { Login } from "../pages/login.page";

test.describe("Verify that login of the Demo web shop page works as intended", () => {
  let login: Login;
  //na ovaj nacin nam je globalno dostupna varijabla register koju konstruiramo samo jednom u beforeEach
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();

  });

  test("TEST 1 Verify that validation of the login form works as intended", async ({
    page,
  }) => {
    
    await login.registerBtn.click();

    await page.pause();
  });
 
  // Test 2 - provjeri jel radi ak ukucas tocan email i password
  // Test 3 - provjeri jel radi ak ukucas tocan email i krivi pass
  // Test 4 - provjeri jel radi ak ukucas krivi mail i tocan pass
  // Test 5 - provjeri jel radi ak ukucas tocan, mail, tocan pass, i kliknes remember me
    // u pravilu vjerujem da bi trebalo ugasiti brower, ponovno otići na taj link
    // i vidjeti jel user ostao ulogiran


    // ali možeš bar provjerit jel vodi na novi url
  // Test 6 - logaut

  //Test 7 - Forgot password - ovo bi mogao bit novi spec i page,
  // Test 8 - Register button jel vodi na register url

  


});
