import { expect } from '@playwright/test';

export class LoginPage {
    // 1. Konstruktor - tutaj definiujemy "adresy" (lokatory) elementów na stronie
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[data-qa="login-email"]');
        this.passwordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.locator('button[data-qa="login-button"]');
        this.errorMessage = page.locator('p[style*="color: red;"]'); // Komunikat o błędzie na Automation Exercise
    }

    // 2. Metody - tutaj tworzymy gotowe funkcje (akcje), które bot może wykonać
    async otworzStroneLogowania() {
        // 1. Wejdź na stronę główną
        await this.page.goto('https://automationexercise.com');
        
        // 2. Obsługa baneru cookies (Consent)
        const consentButton = this.page.getByRole('button', { name: 'Consent' }).or(this.page.getByRole('button', { name: 'Zgoda' }));
        
        // Jeśli taki przycisk się pojawi, bot w niego kliknie
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }

        // 3. Kliknij przycisk Signup / Login w menu górnym
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    // TUTAJ DOPISALIŚMY BRAKUJĄCĄ METODĘ LOGOWANIA:
    async zalogujSie(email, haslo) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(haslo);
        await this.loginButton.click();
    }
} // <--- Ta klamra zamyka całą klasę LoginPage
