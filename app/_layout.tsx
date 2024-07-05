import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  LibreBaskerville_400Regular,
  LibreBaskerville_400Regular_Italic,
} from '@expo-google-fonts/libre-baskerville';
import indexScreen from './index';

const Stack = createNativeStackNavigator();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Baskerville: LibreBaskerville_400Regular,
    BaskervilleItalics: LibreBaskerville_400Regular_Italic,
    Bodoni: require('../assets/fonts/BodoniSvtyTwoSCITCTT-Book.woff.otf'),
    Caslon: require('../assets/fonts/ACaslonPro-Regular.otf'),
    Bauhaus: require('../assets/fonts/BauhausRegular.ttf'),
    Reross: require('../assets/fonts/fonnts.com-Reross_Quadratic.otf'),
    IMFell: require('../assets/fonts/IMFellDWPicaSC-Regular.ttf'),
    KaiseiRegular: require('../assets/fonts/KaiseiDecol-Regular.ttf'),
    KaiseiMedium: require('../assets/fonts/KaiseiDecol-Medium.ttf'),
    CorbenRegular: require('../assets/fonts/Corben-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="index" component={indexScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
