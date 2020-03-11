// Imports: Dependencies
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: ["authReducer"],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ["someReducerNotToStore"]
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Middleware: ReduxThunk
const enhancer = compose(
  applyMiddleware(ReduxThunk),
  applyMiddleware(createLogger())
);
// Redux: Store
const store = createStore(persistedReducer, enhancer);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
export { store, persistor };
