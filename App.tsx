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
import { Routes } from './src/routes'
import { StatusBar } from 'react-native';
import { AuthContextProvider, useAuth } from './src/hooks/auth';

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Bold": Poppins_700Bold,
  });
  const { isUserLoading } = useAuth()
  if (!fontsLoaded || isUserLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
