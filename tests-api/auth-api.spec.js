import { test, expect } from '@playwright/test';

test.describe('Testy API - Autoryzacja (Logowanie)', () => {

    test('Logowanie z poprawnymi danymi', async ({ request }) => {
        const response = await request.post('https://automationexercise.com', {
            
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*'
            },
            form: { email: 'kicinskibartosz96@gmail.com', password: 'Bartosz132!' }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    test('Logowanie ze złym hasłem wyświetla błąd', async ({ request }) => {
        const response = await request.post('https://automationexercise.com', {
            
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*'
            },
            form: { email: 'kicinskibartosz96@gmail.com', password: 'wrongpassword' }
        });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });
});


