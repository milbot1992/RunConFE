import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getGroupsByUser, getGroupsNotInUserGroups } from '../../api';
import { useState, useEffect } from 'react';
import { getDistance } from 'geolib'
import UserGroups from './Groups/UserGroups';

export default function Groups({ route, navigation }) {
  const { user_id } = route.params;
  const [userGroups, setUserGroups] = useState([]);
  const [localGroups, setLocalGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('userGroups');
  const userLattitude = 53.474524;
  const userLongitude = -2.242604;

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

    getGroupsNotInUserGroups(user_id)
      .then((groups) => {
        const allGroupsDistance = groups.map((group) => {
          const groupCopy = { ...group };

          const stringGroup = JSON.stringify(groupCopy);
          const parsedGroup = JSON.parse(stringGroup);

          groupCopy.distance = getDistance(
            { latitude: userLattitude, longitude: userLongitude },
            { latitude: parsedGroup.location[0], longitude: parsedGroup.location[1] }
          );

          return groupCopy;
        });

        // Filter groups to include only those within 5 km
        const filteredGroups = allGroupsDistance.filter((group) => group.distance < 5000);

        setLocalGroups(filteredGroups);
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
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.tabContainer}>
              <TouchableOpacity onPress={() => handleTabPress('userGroups')}>
                <Text style={[styles.tabText, selectedTab === 'userGroups' && styles.selectedTab]}>
                  Your Groups
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTabPress('localGroups')}>
                <Text style={[styles.tabText, selectedTab === 'localGroups' && styles.selectedTab]}>
                  Other Local Groups
                </Text>
              </TouchableOpacity>
            </View>
            {selectedTab === 'userGroups' ? (
              <UserGroups userGroups={userGroups} navigation={navigation} />
            ) : (
              <UserGroups userGroups={localGroups} navigation={navigation} />
            )}
          </ScrollView>

          {/* Map Link Button */}
          <TouchableOpacity style={styles.mapLinkContainer} onPress={handleMapPress}>
            <Text style={styles.mapLinkText}>View All Groups on Map</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 0,
    paddingBottom: 100, 
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
    marginTop:10,
    fontSize: 18,
    color: 'black',
  },
  selectedTab: {
    fontWeight: 'bold',
    color: '#66B2B2',
  },
  mapLinkContainer: {
    position: 'absolute',
    bottom: 40, 
    left: 20,
    right: 20,
    backgroundColor: '#66B2B2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  mapLinkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
