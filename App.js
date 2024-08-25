import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './Components/NavigationPages/NavigationBar';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapTab from './Components/Maps/MapTab'
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  const user_id = 1

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Main"
            component={NavigationBar}
            options={{ headerShown: false }}
            initialParams={{ user_id }}
          />
          <Stack.Screen
            name="MapTab"
            component={MapTab}
            options={{ title: 'Map View' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}