import { Locator, Page } from '@playwright/test';

export class Categories {
  readonly page: Page;
  readonly books: Locator;
  readonly computers: Locator;
  readonly electronics: Locator;
  readonly apparelAndShoes: Locator;
  readonly digitalDownloads: Locator;
  readonly jewelry: Locator;
  readonly giftcards: Locator;
  readonly cellphones: Locator;
  readonly productItem: Locator;
  readonly smartphonePhoto: Locator;
  readonly usedPhonePhoto: Locator;
  readonly phoneCoverPhoto: Locator;
  readonly smartphoneTitle: Locator;
  readonly usedPhoneTitle: Locator;
  readonly phoneCoverTitle: Locator;
  readonly priceCheck: Locator;
  readonly addToCartBtn: Locator;
  readonly shoppingCart: Locator;
  readonly sortBy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.books = page.getByRole('list')
    .filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' })
    .getByRole('link', { name: 'Books' });
    this.computers = page.getByRole('listitem').filter({ hasText: 'Computers Desktops Notebooks Accessories' })
    .getByRole('link', { name: 'Computers' });
    this.electronics = page.getByRole('listitem').filter({ hasText: 'Electronics Camera, photo Cell phones' })
    .getByRole('link', { name: 'Electronics' });
    this.apparelAndShoes = page.getByRole('list').filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' })
    .getByRole('link', { name: 'Apparel & Shoes' });
    this.digitalDownloads = page.getByRole('list').filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' })
    .getByRole('link', { name: 'Digital downloads' });
    this.jewelry = page.getByRole('list').filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' })
    .getByRole('link', { name: 'Jewelry' });
    this.giftcards = page.getByRole('list').filter({ hasText: 'Books Computers Desktops Notebooks Accessories Electronics Camera, photo Cell ph' })
    .getByRole('link', { name: 'Gift Cards' });
    this.cellphones = page.getByRole('heading', { name: 'Cell phones' })
    .getByRole('link', { name: 'Cell phones' });
    this.productItem = page.locator('.product-item');
    this.smartphonePhoto = page.locator('img[alt="Picture of Smartphone"]');
    this.usedPhonePhoto = page.locator('img[alt="Picture of Used phone"]');
    this.phoneCoverPhoto = page.locator('img[alt="Picture of Phone Cover"]');
    this.smartphoneTitle = page.getByRole('link', { name: 'Smartphone', exact: true });
    this.usedPhoneTitle = page.getByRole('link', { name: 'Used phone', exact: true });
    this.phoneCoverTitle = page.getByRole('link', { name: 'Phone Cover', exact: true });
    this.priceCheck = page.locator('.price.actual-price');
    this.addToCartBtn = page.locator('div').filter({ hasText: '1.00 Add to cart' })
    .getByRole('button', { name: 'Add to cart' }).first();
    this.shoppingCart = page.getByRole('link', { name: 'Shopping cart (1)' });
    this.sortBy = page.locator('#products-orderby')

  };

  async goto() {
    await this.page.goto('/');
  }
}
