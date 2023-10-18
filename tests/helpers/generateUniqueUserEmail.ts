export async function generateUniqueUserEmail(page, email: string): Promise<string> {
  let number = 0;
  

  while (true) {
    const checkedEmail = `${email}+${number}@gmail.com`;
    await page.pause();
    // Unesite e-mail adresu
    await page?.emailInput.fill("#email", checkedEmail);

    // Kliknite na gumb za registraciju
    await page?.registerBtn.click();

    // Provjerite je li prikazana poruka o grešci za već korištenu e-mail adresu
    const errorMessage = await page?.textContent("#error-message");

    if (errorMessage?.includes("The specified email already exists")) {
      number++;
      await page?.fill("#email", ""); // Izbrišite polje prije ponovnog unosa
      generateUniqueUserEmail(page, `${email}+${number}@gmail.com`);
    } else {
      return `${email}+${number}@gmail.com`;
      break; // Registracija uspješna
    }
  }
}

// ?. = optional chaining

/**
 * class Greet {
 *   function hello() {
 *      return 'Hello!';
 *   }
 * }
 *
 * a = new Greet();
 * a.hello(); // 'Hello!';
 *
 * a.hi(); // Error undefined method hi() on object a.
 * a?.hi(); // null/undefined
 */
