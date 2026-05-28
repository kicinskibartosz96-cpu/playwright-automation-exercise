export class ProductsPage {
    constructor(page) {
        this.page = page;
        // 1. Lokator do pierwszego przycisku "Add to cart" pod produktem
        this.firstProductAddToCart = page.locator('.features_items .single-products a:has-text("Add to cart")').first();
        
        // 2. NAPRAWIONY LOKATOR: Łapiemy przycisk bezpośrednio po tekście, jaki wyświetla w okienku pop-up
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        
        // 3. Bezpieczny link "Cart" z górnego menu strony
        this.viewCartMenuLink = page.locator('a[href="/view_cart"]').first();
        // 4. Element w koszyku do asercji
        this.cartProductDescription = page.locator('.cart_description');
    }

    async dodajPierwszyProduktDoKoszyka() {
        // Najeżdżamy myszką na produkt i klikamy "Add to cart"
        await this.firstProductAddToCart.hover();
        await this.firstProductAddToCart.click();
        
        // Czekamy na pojawienie się przycisku w okienku i go klikamy
        await this.continueShoppingButton.waitFor({ state: 'visible' });
        await this.continueShoppingButton.click();
    }

    async przejdzDoKoszyka() {
        // Klikamy "Cart" na górnym pasku menu
        await this.viewCartMenuLink.click();
    }
}
