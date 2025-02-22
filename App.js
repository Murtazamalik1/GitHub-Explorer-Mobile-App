import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStack from './Src/Navigation/AppStack/AppStack ';
import { Provider } from 'react-redux';
import store from './Src/Redux/Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}

