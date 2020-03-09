import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
// Redux store with redux persist
// import { store, persistor } from './src/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Platform } from 'react-native';
import IP from './env.js';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
// });

const client = new ApolloClient({
  uri: `http://${Platform.OS === 'ios' ? 'localhost' : { IP }}:4000/graphql`,
});

const Main = () => (
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
  <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  </ApolloProvider>
  //   </PersistGate>
  // </Provider>
);

export default Main;
