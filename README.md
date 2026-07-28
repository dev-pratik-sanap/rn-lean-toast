# rn-lean-toast 🍞

A blazing fast, zero-config, edge-to-edge toast library for React Native.

![npm version](https://img.shields.io/npm/v/rn-lean-toast)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&logoColor=white)
![license](https://img.shields.io/npm/l/rn-lean-toast)

<img src="https://raw.githubusercontent.com/dev-pratik-sanap/rn-lean-toast/main/docs/demo.gif" alt="Demo of rn-lean-toast" width="600" />

## ✨ Features

- **Zero-Config:** No massive Context Providers wrapping your app. Trigger toasts imperatively.
- **Edge-to-Edge Safe:** Automatically respects notches, Dynamic Islands, and home indicators without overlapping system UI.
- **Smart Position Selection:** Choose whether your toast appears at the `top` (default) or the `bottom` of the screen.
- **Smart Queue System:** Prevents overlapping. If multiple toasts fire at once, they queue up sequentially.
- **Accessible:** Native screen-reader support out of the box (`accessibilityRole="alert"`).
- **Trigger Anywhere:** Call toasts from outside React entirely—perfect for Redux thunks, Axios interceptors, or background tasks.
- **Blazing Fast:** Uses pure `Animated` with `useNativeDriver: true` for buttery smooth 60fps animations.

---

## 📦 Installation

This library relies on `react-native-safe-area-context` to calculate native edge-to-edge layouts. You must install both:

**Using npm:**

```sh
npm install rn-lean-toast react-native-safe-area-context
```

**Using yarn:**

```sh
yarn add rn-lean-toast react-native-safe-area-context
```

---

## 🚀 Setup

> **⚠️ IMPORTANT:** Your app **must** be wrapped in a `<SafeAreaProvider>` from `react-native-safe-area-context` for the edge-to-edge positioning to work.

Place the `<ToastHost/>` component **once** at the very root of your application (usually in `App.tsx` or your root layout file).

```tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastHost } from 'rn-lean-toast';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Your App Navigation / Components */}
      <AppNavigator />

      {/* Mount the toast host once at the root */}
      <ToastHost />
    </SafeAreaProvider>
  );
}
```

---

## 🛠 Usage

Import `Toast` and call it from **anywhere** in your codebase. No hooks required!

### Basic Usage

```tsx
import { Toast } from 'rn-lean-toast';

// Success Toast (Defaults to Top)
Toast.success('Profile saved successfully!');

// Error Toast
Toast.error('Network request failed. Please try again.');
```

### Bottom Position & Custom Styling

You can easily change the position to `bottom` and override default styles by passing an options object as the second parameter.

```tsx
// Bottom Toast
Toast.info('Downloading update...', {
  position: 'bottom',
  duration: 4000,
});

// Custom Styled Bottom Toast
Toast.success('Custom Theme Applied!', {
  position: 'bottom',
  duration: 5000,
  backgroundColor: '#8b5cf6', // Custom Purple Background
  textColor: '#fef08a', // Custom Yellow Text
});
```

### Calling Outside of React Components

Because `rn-lean-toast` uses a Singleton event controller, you can safely trigger toasts inside standard JavaScript files.

```typescript
// api/axiosInstance.ts
import axios from 'axios';
import { Toast } from 'rn-lean-toast';

const api = axios.create({ baseURL: 'https://api.example.com' });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Fire a toast directly from your API interceptor!
    Toast.error('An unexpected error occurred.', { position: 'bottom' });
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📖 API Reference

### Methods

- `Toast.success(message: string, options?: ToastOptions)`
- `Toast.error(message: string, options?: ToastOptions)`
- `Toast.info(message: string, options?: ToastOptions)`
- `Toast.hide()` - Programmatically dismisses the currently visible toast.

### `ToastOptions`

| Property          | Type                | Default      | Description                                                                  |
| :---------------- | :------------------ | :----------- | :--------------------------------------------------------------------------- |
| `message`         | `string`            | **Required** | The text displayed inside the toast.                                         |
| `position`        | `'top' \| 'bottom'` | `'top'`      | Controls whether the toast appears at the top or bottom of the screen.       |
| `duration`        | `number`            | `3000`       | How long (in milliseconds) the toast stays on screen before auto-dismissing. |
| `backgroundColor` | `string`            | `undefined`  | Overrides default colors (`#4ade80` for success, `#f87171` for error).       |
| `textColor`       | `string`            | `#ffffff`    | Overrides the default text color.                                            |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page on GitHub.

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
