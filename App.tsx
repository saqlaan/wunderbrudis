import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './src/navigation';
import {myTheme} from './src/configs/customTheme'
import {store, persistor} from './src/store'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={myTheme} >
          <Provider store={store}>
            <PersistGate loading={false} persistor={persistor}>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme}/>
                <StatusBar />
              </SafeAreaProvider>
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </>
    );
  }
}
