// 1. Referenzen holen (Wie Pointer/Objekt-Referenzen in Java)
// Wir speichern die HTML-Elemente in Konstanten, um damit zu arbeiten.
const userSlider = document.getElementById('userSlider');
const userCountDisplay = document.getElementById('userCountDisplay');
const billingToggle = document.getElementById('billingToggle'); // Jährlich?
const supportToggle = document.getElementById('supportToggle'); // Premium?
const totalPriceElement = document.getElementById('totalPrice');

// 2. Konstanten definieren (Preise)
const BASE_PRICE_PER_USER = 15.00; // Euro pro Monat
const PREMIUM_SUPPORT_PRICE = 50.00; // Euro Pauschal
const DISCOUNT_RATE = 0.8; // 20% Rabatt bei jährlicher Zahlung

// 3. Die Rechen-Funktion (Business Logic)
function calculatePrice() {
    // A. Werte aus den Inputs lesen
    // Das '+' verwandelt den String "10" in die Zahl 10 (Type Casting)
    let users = +userSlider.value; 
    let isYearly = billingToggle.checked; // true oder false
    let isPremium = supportToggle.checked; // true oder false

    // B. Mathe
    let price = users * BASE_PRICE_PER_USER;

    // Wenn jährlich, 20% Rabatt anwenden
    if (isYearly) {
        price = price * DISCOUNT_RATE;
    }

    // Wenn Premium, 50€ draufrechnen
    if (isPremium) {
        price = price + PREMIUM_SUPPORT_PRICE;
    }

    // C. UI Updates
    // Text im Badge aktualisieren
    userCountDisplay.innerText = users + (users === 1 ? " User" : " Users");

    // Preis formatieren (Deutsch: 1.250,00 €)
    // Das ist wie der 'DecimalFormat' in Java, nur moderner
    let formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });
    
    totalPriceElement.innerText = formatter.format(price);
}

// 4. Event Listener (Der "Observer")
// Wir sagen dem Browser: "Wenn sich was ändert, rechne neu!"
userSlider.addEventListener('change', calculatePrice);
billingToggle.addEventListener('change', calculatePrice);
supportToggle.addEventListener('change', calculatePrice);

// 5. Init
// Einmal beim Laden ausführen, damit nicht "0,00 €" da steht
calculatePrice();