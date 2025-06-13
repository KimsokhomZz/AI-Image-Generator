# AI Image Generator - PWA Guide

This project is a Progressive Web App (PWA). You can use it offline and install it on your device for a native app-like experience.

---

## How to Test PWA Functionality

### 1. Run the Project on a Local Server

PWA features (like service workers) require a server environment.**Do not open `index.html` directly.**Use one of these methods:

* [ ] Using VS Code Live Server Extension

- Open the project folder in VS Code.
- Right-click `index.html` and select **"Open with Live Server"**.

#### Using Node.js http-server

```sh
npm install -g http-server
http-server .
```

Then open the URL shown in your terminal (e.g., `http://localhost:8080`).

#### Using Python (3.x)

```sh
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

### 2. Test PWA in Your Browser

1. Open the app in **Google Chrome** or another Chromium-based browser.
2. Open **DevTools** (F12), go to the **Application** tab.
3. Check:
   - **Manifest**: Should show your app info and icons.
   - **Service Worker**: Should show as "activated and running".
   - **Cache Storage**: Should list your cached files.
4. Try going offline (DevTools > Network > Offline) and refresh.
   The app should still load (from cache).

---

## How to Add to Home Screen (Mobile)

### On Android (Chrome)

1. Open the app URL in Chrome.
2. Tap the **three-dot menu** (⋮) in the top-right corner.
3. Tap **"Add to Home screen"** or **"Install app"**.
4. Confirm and the app icon will appear on your home screen.

### On iPhone (Safari)

1. Open the app URL in Safari.
2. Tap the **Share** button (square with arrow).
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm and the app icon will appear on your home screen.

---

## PWA Features

- Works offline (for previously loaded pages and assets)
- Installable on desktop and mobile
- App icon and splash screen
- Fast loading

**Tip:**
You can also test PWA installability and offline support using Chrome DevTools > Lighthouse > "Progressive Web App" audit.

---
