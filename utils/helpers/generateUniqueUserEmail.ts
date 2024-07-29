import { expect } from "@playwright/test";
import { Register } from "../../pages/register.page";

export async function generateUniqueUserEmail(page, email: string): Promise<string> {
  let number = 1;
  

  while (true) {
    const checkedEmail = `${email}+${number}@gmail.com`;
    // await page.pause();
   
    await page?.fill("#Email", checkedEmail);
    await page?.fill("#Password", "hjrks987");
    await page?.fill("#ConfirmPassword", "hjrks987");
    await page?.click("#register-button"); 

    // OVO RADIIIIII - malo duze traje jer sam postavila timoute ali bitno da radi!!
    const errorMessageElement = await page.waitForSelector(".message-error", { timeout: 2000 }).catch(() => null);
    const registrationCompletedElement = await page.waitForSelector(".result", { timeout: 2000 }).catch(() => null);

    if (errorMessageElement) {
      const errorMessage = await errorMessageElement.textContent(".message-error");
      if (errorMessage?.includes("The specified email already exists")) {
        number++;
        await page.fill("#Email", ""); 
      }
    } else if (registrationCompletedElement) {
      
      const registrationCompletedText = await registrationCompletedElement.textContent(".result");
      if (registrationCompletedText?.includes("Your registration completed")) {
        return checkedEmail;
      }
    } else {
      
      throw new Error("Neither error message nor registration completion message was found.");
    }

    
  }
  
}





