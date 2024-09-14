import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './Components/NavigationPages/NavigationBar';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapTab from './Components/Maps/MapTab'
import SingleGroup from './Components/NavigationPages/Groups/SingleGroup';
import SingleRun from './Components/NavigationPages/Runs/SingleRun';
import MessagesList from './Components/NavigationPages/Messages/MessagesList';
import EditProfile from './Components/NavigationPages/Profile/EditProfile';
import AddPost from './Components/NavigationPages/Posts/AddPost';
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
          <Stack.Screen
            name="SingleGroup"
            component={SingleGroup}
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="SingleRun"
            component={SingleRun}
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="MessagesList"
            component={MessagesList}
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="AddPost"
            component={AddPost}
            options={{ headerTitle: "", headerTransparent: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}