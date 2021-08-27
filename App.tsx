import React from 'react';
import { ThemeProvider } from 'styled-components';
import "react-native-gesture-handler";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import theme from './src/global/styles/theme';
import {
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { Dashboard } from './src/screens/Dashboard';
import AppLoading from 'expo-app-loading';
import { HighlightCard } from './src/components/HighlightCard';
import {Register } from './src/screens/Register'
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_500Medium,
    Poppins_700Bold
  }) 

  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
   <ThemeProvider theme={theme}>
     <NavigationContainer>
       <StatusBar 
       barStyle="light-content"
       backgroundColor="transparent"
       translucent
       />
      <AppRoutes/>
    </NavigationContainer>
   
   </ThemeProvider>
  );
}
