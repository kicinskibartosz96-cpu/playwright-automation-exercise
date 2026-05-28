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

## Zakres Testów i Pokrycie Scenariuszy

Projekt dąży do maksymalnego sparowania testów na poziomie interfejsu użytkownika (UI) oraz procesów w tle (API). 

### Testy E2E (UI) - Pełne Pokrycie Frontendu
1. **Rejestracja użytkownika:** Walidacja pełnego procesu zakładania konta w przeglądarce.
2. **Autoryzacja (Logowanie):** Ścieżka pozytywna (poprawne dane) oraz negatywna (błędne hasło).
3. **Proces zakupowy (Koszyk):** Pełna interakcja: wybór produktu, obsługa okien modalnych i weryfikacja zawartości koszyka.

### Testy API - Pokrycie Logiki Backendowej
1. **Pobieranie danych (GET):** Walidacja endpointu `/api/productsList` pod kątem kodu statusu HTTP 200 OK oraz integralności struktury obiektów JSON.
2. **Zarządzanie użytkownikiem (POST):** Pełna weryfikacja procesu tworzenia profilu oraz autoryzacji poprzez wysyłanie surowych żądań HTTP (odpowiednik testów UI rejestracji oraz logowania) przy użyciu dynamicznych adresów e-mail.


### Ograniczenia Techniczne (Technical Limitations)
* **Proces koszyka (Dodawanie produktów):** Architektura platformy *Automation Exercise* nie udostępnia publicznych endpointów API dla obsługi koszyka zakupowego (system operuje wyłącznie na ciasteczkach i sesji przeglądarki). Z tego powodu scenariusz ten **nie został celowo zduplikowany w warstwie API** i jest w 100% pokryty niezawodnymi testami w warstwie UI (E2E).


---

## Status Projektu (CI/CD)

Projekt posiada skonfigurowany pipeline automatyzacji w **GitHub Actions**. Przy każdym wypchnięciu kodu na repozytorium uruchamiana jest czysta instancja systemu Linux, która pobiera zależności, instaluje przeglądarki i wykonuje cały zestaw testów regressyjnych, generując artefakty w postaci raportów HTML.

---

## Jak uruchomić projekt lokalnie?

### 1. Klonowanie repozytorium
```bash
git clone https://github.com
cd playwright-automation-exercise
```

### 2. Instalacja wymaganych zależności (Node.js)
```bash
npm install
```

### 3. Uruchamianie testów

* **Uruchomienie wszystkich testów (UI + API) w tle:**
  ```bash
  npx playwright test
  ```

* **Uruchomienie tylko testów funkcjonalnych (UI):**
  ```bash
  npx playwright test tests-ui/
  ```

* **Uruchomienie tylko testów integracyjnych (API):**
  ```bash
  npx playwright test tests-api/
  ```

* **Uruchomienie testów w trybie interaktywnym (UI Mode):**
  ```bash
  npx playwright test --ui
  ```
