import { StyleSheet, View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getAllGroups } from '../../api';

export default function MapTab({ navigation }) {
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllGroups()
      .then((groups) => {
        setAllGroups(groups);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching groups:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  function handleMarkerPress(group_id) {
    navigation.navigate('SingleGroup', { group_id });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 54.7023545,
          longitude: -4.2765753,
          latitudeDelta: 13,
          longitudeDelta: 13,
        }}
        showsUserLocation={true}
      >
        {allGroups.map(group => (
          <Marker
            key={group._id}
            coordinate={{
              latitude: group.location[0],
              longitude: group.location[1],
            }}
          >
            <Callout onPress={() => handleMarkerPress(group.group_id)}>
              <Text style={{ fontWeight: "bold" }}>{group.group_name}</Text>
              <Text>{group.description}</Text>
              <Text>Click for more info!</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  startext: {
    color: '#489fe1',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
