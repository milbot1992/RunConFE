import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MyAccount, Groups, MessagesHome, MyRuns } from './index'
import Icon from 'react-native-ico-material-design';
import { useState, useEffect} from 'react'
import { getGroupPosts } from '../../api'

const Tab = createBottomTabNavigator();

export default function NavigationBar({route}) {
    const { user_id } = route.params;
    const [groupPosts, setGroupPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGroupPosts(user_id)
        .then(( posts ) => {
            setGroupPosts(posts);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        })
        .catch(error => {
            console.error("Error fetching group posts:", error);
            setIsLoading(false);
        });
    }, []);
    
    return (
        <>
        {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2' }}>
                    <Text>Loading...</Text>
                  </View>
                ) : (
                <Tab.Navigator initialRouteName='Home' 
                    screenOptions={{
                    tabBarActiveTintColor: '#0f98e1',
                }}>
                <Tab.Screen name="Home" 
                    component={HomeScreen}
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                        <Icon name="home-button" color='#66B2B2' />
                        ),
                    }}
                    initialParams={{ groupPosts }}
                    /> 
                <Tab.Screen name="Groups" 
                    component={Groups} 
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                        <Icon name="two-men" color='#66B2B2' />
                        ),
                    }} 
                    initialParams={{ user_id }}
                    />
                <Tab.Screen name="MessagesHome" 
                    component={MessagesHome} 
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                        <Icon name="chat-bubble" color='#66B2B2' />
                        ),
                    }} />
                <Tab.Screen name="MyRuns" 
                    component={MyRuns} 
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                        <Icon name="man-walking-directions-button" color='#66B2B2' />
                        ),
                    }} />
                <Tab.Screen name="MyAccount" 
                    component={MyAccount} 
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: () => (
                        <Icon name="user-shape" color='#66B2B2' />
                        ),
                    }} />

                </Tab.Navigator>
                )}
        </>
    );
}


const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });