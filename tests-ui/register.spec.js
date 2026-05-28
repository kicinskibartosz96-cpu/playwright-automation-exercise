import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerpage'; // Importujemy naszą osobną stronę rejestracji

test.describe('Testy Rejestracji Nowego Użytkownika', () => {

    test('Pełna rejestracja użytkownika zakończona sukcesem', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        
        // Generujemy unikalny e-mail, aby test mógł przechodzić za każdym razem
        const unikalnyEmail = `automat_tester${Date.now()}@poczta.pl`;

        // 1. Przygotuj i wejdź na stronę
        await registerPage.otworzStroneLogowaniaIRejestracji();

        // 2. Działaj - Krok 1 (Wpisanie imienia i maila)
        await registerPage.wypelnijPierwszyKrok('Janek Automatyzator', unikalnyEmail);

        // Upewniamy się na sekundę, że formularz się załadował
        await expect(page.locator('text=Enter Account Information')).toBeVisible();

        // 3. Działaj - Krok 2 (Wypełnienie wielkiego formularza danych)
        await registerPage.wypelnijDaneOsoboweIAdres(
            'SilneHaslo123!', 
            'Janek', 
            'Automatyzator', 
            'Test Street 12', 
            'Toronto', 
            '123456789'
        );

        // 4. Sprawdź (Asercja Końcowa)
        // Po udanej rejestracji system przenosi na stronę z wielkim napisem "ACCOUNT CREATED!"
        const sukcesNaglowek = page.locator('b:has-text("Account Created!")');
        await expect(sukcesNaglowek).toBeVisible();
    });

});
