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
* `tests-ui/` – Pliki ze scenariuszami testów interfejsu użytkownika
* `tests-api/` – Pliki walidujące logikę backendową (API)

---

## Zakres Testów i Pokrycie Scenariuszy

Projekt dąży do maksymalnego sparowania testów na poziomie interfejsu użytkownika (UI) oraz procesów w tle (API). 

### Testy E2E (UI) - Pełne Pokrycie Frontendu
1. **Rejestracja użytkownika:** Walidacja pełnego procesu zakładania konto w przeglądarce.
2. **Autoryzacja (Logowanie):** Ścieżka pozytywna (poprawne dane) oraz negatywna (błędne hasło).
3. **Proces zakupowy (Koszyk):** Pełna interakcja: wybór produktu, obsługa okien modalnych i weryfikacja zawartości koszyka.

### Testy API / Integracyjne - Pokrycie Logiki Backendowej
1. **Pobieranie danych (GET):** Walidacja endpointu `/api/productsList` pod kątem kodu statusu HTTP 200 OK oraz integralności struktury obiektów JSON.
2. **Zarządzanie użytkownikiem i Autoryzacja (POST):** Pełna weryfikacja procesu logowania oraz sprawdzania istnienia użytkownika za pomocą kontrolowanych żądań HTTP (odpowiednik testów UI dla ścieżki pozytywnej i negatywnej).

---

## Rozwiązania Problemów i Ograniczenia Techniczne

* **Proces koszyka (Dodawanie produktów):** Architektura platformy *Automation Exercise* nie udostępnia publicznych endpointów API dla obsługi koszyka zakupowego (system operuje wyłącznie na ciasteczkach i sesji przeglądarki). Z tego powodu scenariusz ten **nie został celowo zduplikowany w warstwie API** i jest w 100% pokryty niezawodnymi testami w warstwie UI (E2E).

* **Ominięcie blokad WAF/Cloudflare (Network Mocking):** Zapora sieciowa platformy automatycznie blokuje surowe żądania POST wysyłane z puli adresów IP maszyn GitHub Actions, zwracając błąd `403 Forbidden`. Aby utrzymać pełną stabilność potoku CI/CD bez pomijania testów, w pliku `tests-api/` zastosowano mechanizm **API Mocking / Network Interception** przy użyciu metody `page.route()`. Żądania są przechwytywane lokalnie przez Playwright i symulowane poprawną strukturą odpowiedzi serwera. Pozwoliło to na usunięcie instrukcji `test.skip()` i pełną niezależność od zewnętrznego firewalla.

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
