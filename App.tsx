import React from 'react'
import 'react-native-gesture-handler';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme'
import AppLoading from 'expo-app-loading'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes'
import { StatusBar } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Bold": Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
