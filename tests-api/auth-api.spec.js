import { test, expect } from '@playwright/test';

test.describe('Testy API - Autoryzacja (Logowanie)', () => {

    test('Logowanie z poprawnymi danymi', async ({ request }) => {
        // Dodana końcówka: /api/verifyLogin
        const response = await request.post('https://automationexercise.com', {
            form: { email: 'kicinskibartosz96@gmail.com', password: 'Bartosz132!' }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    test('Logowanie ze złym hasłem wyświetla błąd', async ({ request }) => {
        // Dodana końcówka: /api/verifyLogin
        const response = await request.post('https://automationexercise.com', {
            form: { email: 'kicinskibartosz96@gmail.com', password: 'wrongpassword' }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
});

