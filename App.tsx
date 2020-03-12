import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
// Redux store with redux persist(Async storage) --> uncomment to use
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from '@apollo/react-hooks';
import { Platform } from 'react-native';
import IP from './env.js';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: `http://${Platform.OS === 'ios' ? 'localhost' : IP}:4000/graphql`,
});

// apollo client setup
const client = new ApolloClient({
  cache,
  link: uploadLink,
});

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

export default Main;
