import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Testy Autoryzacji (Logowanie)', () => {

    test('Logowanie z poprawnymi danymi', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.otworzStroneLogowania();
        await loginPage.zalogujSie('kicinskibartosz96@gmail.com', 'Bartosz132!');
        await expect(page.locator('text=Logged in as')).toBeVisible();
    });

    test('Logowanie ze złym hasłem wyświetla błąd', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.otworzStroneLogowania();
        await loginPage.zalogujSie('kicinskibartosz96@gmail.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Your email or password is incorrect!');
    });

});
