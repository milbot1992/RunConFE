import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getGroupsByUser, getLocalGroups } from '../../api';
import { useState, useEffect } from 'react';
import UserGroups from './Groups/UserGroups';

export default function Groups({ route, navigation }) {
  const { user_id } = route.params;
  const [userGroups, setUserGroups] = useState([]);
  const [localGroups, setLocalGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('userGroups');

  useEffect(() => {
    getGroupsByUser(user_id)
      .then((groups) => {
        setUserGroups(groups);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user groups:", error);
        setIsLoading(false);
      });
    
    getLocalGroups()
      .then((groups) => {
        setLocalGroups(groups);
      })
      .catch((error) => {
        console.error("Error fetching local groups:", error);
      });
  }, [user_id]);

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleMapPress = () => {
    navigation.navigate('MapTab');
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => handleTabPress('userGroups')}>
              <Text style={[styles.tabText, selectedTab === 'userGroups' && styles.selectedTab]}>
                Your Groups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('localGroups')}>
              <Text style={[styles.tabText, selectedTab === 'localGroups' && styles.selectedTab]}>
                Local Groups
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab === 'userGroups' ? (
            <UserGroups userGroups={userGroups} />
          ) : (
            <UserGroups userGroups={localGroups} /> 
          )}
          <TouchableOpacity style={styles.mapLinkContainer} onPress={handleMapPress}>
            <Text style={styles.mapLinkText}>View All Groups on Map</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabText: {
    fontSize: 18,
    color: 'black',
  },
  selectedTab: {
    fontWeight: 'bold',
    color: '#66B2B2',
  },
});
