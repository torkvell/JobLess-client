import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { PersistGate } from 'redux-persist/integration/react';
import { createUploadLink } from 'apollo-upload-client';
import { theme } from './src/core/theme';
import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { Platform } from 'react-native';
import IP from './env';
import App from './src';

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
