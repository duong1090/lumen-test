import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {RouteProvider} from './router';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RouteProvider />
    </GestureHandlerRootView>
  );
}

export default App;
