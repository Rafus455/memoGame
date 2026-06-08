import { Stack } from 'expo-router';
import { AppProvider } from '../components/AppContext';

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Accueil' }} />
        <Stack.Screen name="camera" options={{ title: 'Prise de photos', headerShown: false }} />
        <Stack.Screen name="game" options={{ title: 'Jeu de Mémoire' }} />
      </Stack>
    </AppProvider>
  );
}