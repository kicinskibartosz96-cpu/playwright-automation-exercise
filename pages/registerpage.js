export class RegisterPage {
    constructor(page) {
        this.page = page;
        
        // Pola z pierwszego ekranu (Signup)
        this.signUpNameInput = page.locator('input[data-qa="signup-name"]');
        this.signUpEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signUpButton = page.locator('button[data-qa="signup-button"]');
        
        // Pola z drugiego ekranu (Wielki formularz)
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.addressInput = page.locator('input[data-qa="address"]');
        this.countrySelect = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');
    }

    async otworzStroneLogowaniaIRejestracji() {
        await this.page.goto('https://automationexercise.com');
        const consentButton = this.page.getByRole('button', { name: 'Consent' }).or(this.page.getByRole('button', { name: 'Zgoda' }));
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    async wypelnijPierwszyKrok(imie, email) {
        await this.signUpNameInput.fill(imie);
        await this.signUpEmailInput.fill(email);
        await this.signUpButton.click();
    }

    async wypelnijDaneOsoboweIAdres(haslo, imie, nazwisko, adres, miasto, telefon) {
        await this.passwordInput.fill(haslo);
        await this.firstNameInput.fill(imie);
        await this.lastNameInput.fill(nazwisko);
        await this.addressInput.fill(adres);
        await this.countrySelect.selectOption('Canada');
        await this.stateInput.fill('Ontario');
        await this.cityInput.fill(miasto);
        await this.zipcodeInput.fill('M5V 2T6');
        await this.mobileNumberInput.fill(telefon);
        await this.createAccountButton.click();
    }
} // <-- TA KLAMRA ZAMYKA KLASĘ (Upewnij się, że tu jest!)

