import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MyAccount, Groups, MessagesHome, MyRuns } from './index'
import Icon from 'react-native-ico-material-design';
import { useState, useEffect } from 'react';
import { getGroupPosts } from '../../api';

const Tab = createBottomTabNavigator();

export default function NavigationBar({ route }) {
    const { user_id } = route.params;
    const [groupPosts, setGroupPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getGroupPosts(user_id)
        .then((posts) => {
            setGroupPosts(posts);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        })
        .catch(error => {
            console.error("Error fetching group posts:", error);
            setIsLoading(false);
        });
    }, [user_id]);
    
    return (
        <>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <Tab.Navigator 
                    initialRouteName='Home' 
                    screenOptions={{
                        tabBarActiveTintColor: '#66B2B2',
                        tabBarLabelStyle: { fontSize: 12, marginBottom: 5 }, // Style for tab labels
                    }}
                >
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color }) => (
                                <Icon name="home-button" color={color} />
                            ),
                        }}
                        initialParams={{ groupPosts }}
                    /> 
                    <Tab.Screen 
                        name="Groups" 
                        component={Groups} 
                        options={{
                            tabBarLabel: 'Groups',
                            tabBarIcon: ({ color }) => (
                                <Icon name="two-men" color={color} />
                            ),
                        }} 
                        initialParams={{ user_id }}
                    />
                    <Tab.Screen 
                        name="Messages" 
                        component={MessagesHome} 
                        options={{
                            tabBarLabel: 'Messages',
                            tabBarIcon: ({ color }) => (
                                <Icon name="chat-bubble" color={color} />
                            ),
                        }} 
                    />
                    <Tab.Screen 
                        name="Runs" 
                        component={MyRuns} 
                        options={{
                            tabBarLabel: 'Runs',
                            tabBarIcon: ({ color }) => (
                                <Icon name="man-walking-directions-button" color={color} />
                            ),
                        }} 
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={MyAccount} 
                        options={{
                            tabBarLabel: 'You',
                            tabBarIcon: ({ color }) => (
                                <Icon name="user-shape" color={color} />
                            ),
                        }} 
                    />
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
        backgroundColor: '#F2F2F2',
    },
});
