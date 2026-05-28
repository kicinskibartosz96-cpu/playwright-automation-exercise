# playwright-automation-exercise
Testy na stronie automationexercise.com
# Playwright Test Automation Portfolio - Automation Exercise

Projekt portfolio zawierający testy automatyczne UI (User Interface) oraz API dla platformy e-commerce **Automation Exercise**. Kod został zaprojektowany z myślą o stabilności oraz łatwości utrzymania.

---

## Stack Technologiczny & Narzędzia
* **Język programowania:** JavaScript (ES6+)
* **Framework testowy:** Playwright Test
* **Środowisko uruchomieniowe:** Node.js
* **CI/CD:** GitHub Actions (testy uruchamiane automatycznie na systemie Linux w chmurze przy każdym pushu)

---

## Architektura i Wzorce Projektowe

W projekcie zastosowano wzorzec **Page Object Model (POM)**. Lokatory oraz akcje biznesowe zostały w pełni odseparowane od samych scenariuszy testowych. Projekt podzielony jest na logiczne foldery:
* `pages/` – Klasy reprezentujące poszczególne podstrony (hermetyzacja selektorów i metod)
* `tests/` – Pliki ze scenariuszami testowymi podzielonymi tematycznie

---

## Zakres Testów

### Testy E2E (UI)
1. **Rejestracja użytkownika:** Walidacja pełnego procesu zakładania nowego konta.
2. **Autoryzacja (Logowanie):** 
   * *Ścieżka pozytywna:* Logowanie poprawnymi danymi i weryfikacja stanu sesji.
   * *Ścieżka negatywna:* Próba logowania z błędnym hasłem i walidacja komunikatu o błędzie.
3. **Proces zakupowy (Koszyk):** Logowanie, nawigacja do katalogu, dodanie produktu do koszyka z obsługą okien modalnych i weryfikacja zawartości koszyka.

### Testy API
* Weryfikacja endpointów backendowych bez uruchamiania przeglądarki (`@playwright/test` request).
* Walidacja statusów odpowiedzi (200 OK) oraz struktury obiektów JSON (obecność kontraktu danych).

---

## Status Projektu (CI/CD)

Projekt posiada skonfigurowany pipeline automatyzacji w **GitHub Actions**. Przy każdym wypchnięciu kodu na repozytorium uruchamiana jest czysta instancja systemu Linux, która pobiera zależności, instaluje przeglądarki i wykonuje cały zestaw testów regressyjnych, generując artefakty w postaci raportów HTML.

---

## Jak uruchomić projekt lokalnie?

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/kicinskibartosz96-cpu/playwright-automation-exercise
cd playwright-automation-exercise
```

### 2. Instalacja wymaganych zależności (Node.js)
```bash
npm install
```

### 3. Instalacja przeglądarek Playwright
```bash
npx playwright install
```

### 4. Uruchamianie testów

* **Wszystkie testy w tle (tryb headless):**
  ```bash
  npx playwright test
  ```

* **Testy w trybie graficznym (Interactive UI Mode):**
  ```bash
  npx playwright test --ui
  ```

* **Uruchomienie tylko testów API:**
  ```bash
  npx playwright test tests/api.spec.js
  ```
