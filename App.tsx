import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://localhose:4000/graphql',
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
