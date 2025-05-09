
# 📦 akshay0497-task

A React Native task management application with camera integration, image handling, and authentication features.

---

## 📁 Project Directory Structure

```text
akshay0497-task/
├── README.md                → This file
├── App.js                   → Root component
├── app.json                 → App configuration
├── babel.config.js          → Babel setup
├── package.json             → Dependency manifest
├── tsconfig.json            → TypeScript configuration
├── index.js                 → App entry point
├── gesture-handler.*.js     → Gesture handling for platform
├── __tests__/               → Unit tests
├── android/                 → Android-specific project files
├── ios/                     → iOS-specific project files
├── src/                     → Source code
│   ├── components/          → Reusable UI components
│   ├── screens/             → App screens (Camera, Login, etc.)
│   └── utils/               → Utility functions (e.g., local storage)
````

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v14 or higher)
* **Yarn** or **npm**
* **Android Studio** (for Android) or **Xcode** (for iOS)
* **React Native CLI**

---

### 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

---

### ▶️ Running the App

#### Android

```bash
npx react-native run-android
```

#### iOS (Mac only)

```bash
npx pod-install
npx react-native run-ios
```

---

### 🧪 Running Tests

```bash
npm test
```

> Test files are located in `__tests__/`

---

## 🧱 Important Files Overview

| File                                                | Purpose                                   |
| --------------------------------------------------- | ----------------------------------------- |
| `App.js`                                            | Entry point of the app                    |
| `src/components/*`                                  | Custom UI elements                        |
| `src/screens/*`                                     | Main screens like Login, Camera, Register |
| `src/utils/storage.js`                              | Async storage helpers                     |
| `android/`, `ios/`                                  | Platform-specific configs                 |
| `gesture-handler.*.js`                              | Platform gesture logic                    |
| `babel.config.js`, `.eslintrc.js`, `.prettierrc.js` | Tooling configuration                     |

---

## ✨ Features

* ✅ User Authentication (Login/Register)
* 📷 Camera Access (CameraScreen)
* 🖼️ Image Upload and Display
* 📁 Async Storage for Local Data
* 🌐 Ready for Platform Deployment (Android/iOS)

---

## ⚠️ Notes for Developers

* If running for the first time, **clean the build** if you encounter issues.
* Always ensure Android/iOS emulators are running properly before starting.
* iOS builds require Mac and Xcode.

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature-name`
3. Commit your changes
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Made with 💡 by [akshay0497](https://github.com/akshay0497)
