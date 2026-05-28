import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/productspage';

test.describe('Testy Koszyka', () => {

    test('Dodanie produktu do koszyka jako zalogowany użytkownik', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // 1. Logujemy się najpierw (używamy Twojej gotowej metody!)
        await loginPage.otworzStroneLogowania();
        await loginPage.zalogujSie('kicinskibartosz96@gmail.com', 'Bartosz132!');
        await page.locator('text=Logged in as').waitFor({ state: 'visible' });
    
        // 2. Przechodzimy do zakładki z produktami
        await page.goto('https://automationexercise.com');

        // 3. Dodajemy produkt i wchodzimy do koszyka
        await productsPage.dodajPierwszyProduktDoKoszyka();
        await productsPage.przejdzDoKoszyka();

        // 4. ASERCJA: Sprawdzamy, czy w koszyku znajduje się dodany produkt
        await expect(productsPage.cartProductDescription).toBeVisible();
    });

});
