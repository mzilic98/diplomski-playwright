import { expect } from "@playwright/test";
import { Register } from "../../pages/register.page";

export async function generateUniqueUserEmail(page, email: string): Promise<string> {
  let number = 1;
  

  while (true) {
    const checkedEmail = `${email}+${number}@gmail.com`;
    // await page.pause();
   
    await page?.fill("#Email", checkedEmail);
    await page?.fill("#Password", "dipl987");
    await page?.fill("#ConfirmPassword", "dipl987");
    await page?.click("#register-button");

    // Provjerite je li prikazana poruka o grešci za već korištenu e-mail adresu
    // ovdje mi padne, ne znam kako locirati message error
    const errorMessage = await page?.textContent(".message-error");

    if (errorMessage?.includes("The specified email already exists")) {
      number++;
      await page?.fill("#Email", ""); // Izbrišite polje prije ponovnog unosa
    //   generateUniqueUserEmail(page, `${email}+${number}@gmail.com`);
    } else {
      return checkedEmail;
      
    //   break; // Registracija uspješna
    }
    
  }
  // ovo bi trebo bit zadnji expect
  // await expect(page.registrationCompleted).toBeVisible();

//  ovo dela, samo što još treba dodati kad napokon pronađe adresu koja
//  ne postoji i registrira se onda da završi proces
// jer kad pronađe adresu opet dođe do const errormessage na liniji 19 i timeouta
}

// ?. = optional chaining


