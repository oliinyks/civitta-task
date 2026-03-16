## Civitta Task – React Native App

### Startup Commands

- **Install Dependencies**

```bash
npm install
```

- **Start in Expo Go**

```bash
npm run start
```

- **Run on Android**

```bash
npm run android
```

- **Run on iOS**

```bash
npm run ios
```

- **Run linter**

```bash
npm run lint
```

### Technologies Used

- **React Native + Expo**: mobile application, running in Expo Go.
- **TypeScript (strict)**: strict typing, aliases for modules.
- **React Navigation (native stack)**: navigation between Onboarding/Auth/Account.
- **React Query (TanStack Query)**: management of the state of API requests.
- **Axios**: HTTP client for the backend `https://artjoms-spole.fly.dev`.
- **React Hook Form + Zod**: forms and validation (signup/signin).
- **AsyncStorage**: saving onboarding state (first opening).
- **Expo SecureStore**: secure storage of Basic Auth credentials.
- **React Native Reanimated**: animation of indicators on the onboarding screen.
- **React Native Gesture Handler / Safe Area Context / Screens**: gestures, safe areas, productive navigation.
- **ESLint**: linting of code (via `eslint-config-universe`).