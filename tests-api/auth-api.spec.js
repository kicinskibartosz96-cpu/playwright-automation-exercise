import { test, expect } from '@playwright/test';

test.describe('Testy API - Autoryzacja (Logowanie)', () => {

    test('Logowanie z poprawnymi danymi', async ({ page }) => {
        const targetUrl = 'https://automationexercise.com';

        // 1. Ustawiamy przechwytywanie dokładnego endpointu API
        await page.route(targetUrl, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    responseCode: 200,
                    message: 'User exists!'
                })
            });
        });

        // 2. Wykonujemy żądanie bezwzględnie wewnątrz kontekstu przeglądarki (Natywny Fetch)
        const responseText = await page.evaluate(async (url) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: 'kicinskibartosz96@gmail.com',
                    password: 'Bartosz132!'
                })
            });
            return res.text();
        }, targetUrl);

        // 3. Asercje na danych zwróconych przez nasz mock
        const responseBody = JSON.parse(responseText);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    test('Logowanie ze złym hasłem wyświetla błąd', async ({ page }) => {
        const targetUrl = 'https://automationexercise.com';

        // 1. Ustawiamy przechwytywanie dokładnego endpointu API dla błędu
        await page.route(targetUrl, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    responseCode: 404,
                    message: 'User not found!'
                })
            });
        });

        // 2. Wykonujemy żądanie w przeglądarce
        const responseText = await page.evaluate(async (url) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: 'kicinskibartosz96@gmail.com',
                    password: 'wrongpassword'
                })
            });
            return res.text();
        }, targetUrl);

        // 3. Asercje
        const responseBody = JSON.parse(responseText);
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
});



