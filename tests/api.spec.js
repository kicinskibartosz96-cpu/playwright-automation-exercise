import { test, expect } from '@playwright/test';

test('API - Pobranie pełnej listy produktów', async ({ request }) => {
    const response = await request.get('https://automationexercise.com');
    expect(response.status()).toBe(200);
});