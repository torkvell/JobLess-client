import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
// Imports: Redux Persist Persister
import { store, persistor } from './src/store';
// Imports: Dependencies
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default Main;
