# Login Feature Plan

This document outlines the plan for implementing the new login feature with "Continue with Google" authentication using Firebase.

## 1. File Structure

The following new files will be created to support the `/login` route:

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx      # The main component for the /login route
│   └── ...
├── components/
│   ├── auth/
│   │   ├── login-card.tsx      # UI component for the login card
│   │   └── google-login-button.tsx # Button to trigger Google login
│   └── ...
└── lib/
    ├── firebase.ts     # Firebase initialization and configuration
    └── ...
```

## 2. Firebase Configuration File

- **File:** [`src/lib/firebase.ts`](src/lib/firebase.ts)
- **Purpose:** This file will initialize the Firebase application using the credentials from environment variables. It will export the Firebase auth instance to be used throughout the application for authentication purposes.

## 3. Environment Variables

The following environment variables need to be created in a `.env.local` file at the root of the project. The `NEXT_PUBLIC_` prefix is required to expose these variables to the browser.

```
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDQ3y24EoGJyD3HX8uYo9xDsVjGdaCMPZo"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="zzqcrm.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="zzqcrm"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="zzqcrm.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="966773599115"
NEXT_PUBLIC_FIREBASE_APP_ID="1:966773599115:web:87f3f7676c76211a105d8e"
```

## 4. Component Breakdown

The login page will be built using the following React components, utilizing `shadcn` for the UI.

### a. `LoginPage`

- **File:** [`src/app/login/page.tsx`](src/app/login/page.tsx)
- **Responsibility:** This is the main page component for the `/login` route. It will be responsible for the overall layout of the login page and will render the `LoginCard` component in the center of the page.

### b. `LoginCard`

- **File:** [`src/components/auth/login-card.tsx`](src/components/auth/login-card.tsx)
- **Props:** None
- **Responsibility:** This component will use `shadcn`'s `Card`, `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent` components to create the visual container for the login functionality. It will render the `GoogleLoginButton`.

### c. `GoogleLoginButton`

- **File:** [`src/components/auth/google-login-button.tsx`](src/components/auth/google-login-button.tsx)
- **Props:** None
- **Responsibility:** This will be a client component that uses `shadcn`'s `Button`. It will contain the logic to handle the `onClick` event, which will trigger the Firebase "Continue with Google" popup authentication flow. It will also handle the success and error states of the authentication process.
