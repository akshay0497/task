/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistor = persistStore(store);

const Apps = () => {
    return (
      // <Provider store={store}>
        // {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
        // </PersistGate>
      // </Provider>
    );
  };

AppRegistry.registerComponent(appName, () => Apps);