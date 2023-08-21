import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HelperLib } from './libs/helper.lib';

import AuthPage from './pages/AuthPage/AuthPage';
import CounterPage from './pages/CounterPage/CounterPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import Code404Page from './pages/HttpErrors/Code404Page';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { ELocalStorageKey } from './interfaces/local-storage-key.interface';

import './App.scss';

function App() {
  const authTokenFromLocalStorage = HelperLib.getFromLocalStorage<string>(ELocalStorageKey.AUTH_TOKEN);
  const [authToken, setAuthToken] = useState(authTokenFromLocalStorage);

  const localSetAuthToken = (token: string | null) => {
    token ?
      HelperLib.saveToLocalStorage(ELocalStorageKey.AUTH_TOKEN, token)
      : HelperLib.removeFromLocalStorage(ELocalStorageKey.AUTH_TOKEN);

    setAuthToken(token);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth'
          element={
            <AuthPage setAuthToken={localSetAuthToken} />
          }
        />

        <Route
          path='/'
          element={
            <PrivateRoute
              authToken={authToken}
            >
              <CounterPage
                authToken={authToken as string}
                setAuthToken={localSetAuthToken}
              />
            </PrivateRoute>
          }
        />

        <Route
          path='/history'
          element={
            <PrivateRoute
              authToken={authToken}
            >
              <HistoryPage
                setAuthToken={localSetAuthToken}
              />
            </PrivateRoute>
          }
        />

        <Route
          path='*'
          element={<Code404Page />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
