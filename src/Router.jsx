import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { accountService } from './services/AccountService.js';
import AuthGuard from './utils/AuthGuard.jsx';


export const router = createHashRouter([
  {
    // default path
    path: "/",
    // the element that will load on the app
    element: <App />,
    // this element will direct you to error page if errors occur during routing
    errorElement: <ErrorPage />,
    // children of the app route all at same level
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "account",
        // before getting into this route, must make sure you can get account info. Authgaurd ensures account page will not load if not logged in
        loader: accountService.getAccount,
        element:
          <AuthGuard>
            <AccountPage />
          </AuthGuard>,
      },

    ],
  },
]);