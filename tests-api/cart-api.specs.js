import { test, expect } from '@playwright/test';

test.describe('Testy API - Proces Koszyka (Pobieranie produktów i Autoryzacja)', () => {

    test('Pobranie pełnej listy produktów przed zakupem', async ({ request }) => {
        // Dodana końcówka: /api/productsList
        const response = await request.get('https://automationexercise.com');
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody).toHaveProperty('products');
    });

    test('Weryfikacja sesji użytkownika przed koszykiem', async ({ request }) => {
        // Dodana końcówka: /api/verifyLogin
        const response = await request.post('https://automationexercise.com', {
            form: { email: 'kicinskibartosz96@gmail.com', password: 'Bartosz132!' }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(200);
    });
});

