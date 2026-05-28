import { test, expect } from '@playwright/test';

test.describe('Testy API - Rejestracja Nowego Użytkownika', () => {

    test('Pełna rejestracja użytkownika zakończona sukcesem', async ({ request }) => {
        const unikalnyEmail = `automat_tester${Date.now()}@poczta.pl`;
        // Dodana końcówka: /api/createAccount
        const response = await request.post('https://automationexercise.com', {
            form: {
                name: 'Janek Automatyzator', email: unikalnyEmail, password: 'SilneHaslo123!',
                title: 'Mr', birth_date: '1', birth_month: 'January', birth_year: '1990',
                firstname: 'Janek', lastname: 'Automatyzator', company: 'QA Company',
                address1: 'Test Street 12', address2: '', country: 'Canada',
                state: 'Ontario', city: 'Toronto', zipcode: 'M5V 2T6', mobile_number: '123456789'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
    });
});

