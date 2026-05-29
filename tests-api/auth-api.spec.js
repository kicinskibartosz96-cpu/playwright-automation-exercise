import { test, expect } from '@playwright/test';

test.describe('Testy API - Autoryzacja (Logowanie)', () => {

    test('Logowanie z poprawnymi danymi', async ({ page }) => {
        // 1. Przechwytujemy zapytanie POST i definiujemy sztuczną odpowiedź dla sukcesu
        await page.route('https://automationexercise.com', async (route) => {
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        responseCode: 200,
                        message: 'User exists!'
                    })
                });
            } else {
                await route.continue();
            }
        });

        // 2. Wykonujemy zapytanie przez page.request (aby zachować kontekst routingu okna przeglądarki)
        const response = await page.request.post('https://automationexercise.com', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*'
            },
            form: { email: 'kicinskibartosz96@gmail.com', password: 'Bartosz132!' }
        });

        // 3. Asercje sprawdzające dane z naszego mocka
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    test('Logowanie ze złym hasłem wyświetla błąd', async ({ page }) => {
        // 1. Przechwytujemy zapytanie POST i definiujemy sztuczną odpowiedź dla błędu
        await page.route('https://automationexercise.com', async (route) => {
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        responseCode: 404,
                        message: 'User not found!'
                    })
                });
            } else {
                await route.continue();
            }
        });

        // 2. Wykonujemy zapytanie
        const response = await page.request.post('https://automationexercise.com', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*'
            },
            form: { email: 'kicinskibartosz96@gmail.com', password: 'wrongpassword' }
        });

        // 3. Asercje
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
});


