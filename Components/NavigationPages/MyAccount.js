import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { getUserById, patchUserById } from '../../api';

export default function MyAccount() {
  const navigation = useNavigation(); // Initialize navigation
  const user_id = 1; // Assuming user_id is static or fetched elsewhere
  const [userDetails, setUserDetails] = useState(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isSingleOpen, setIsSingleOpen] = useState(false);

  useEffect(() => {
    // Fetch the user details when the component mounts
    getUserById(user_id)
      .then((data) => {
        setUserDetails(data);
        setIsConnectOpen(data.connect_open);
        setIsSingleOpen(data.single_open);
      })
      .catch((err) => console.error(err));
  }, []);

  // Function to handle confirmation and patching for both switches
  const handleSwitchChange = (type, value) => {
    let message;
    if (type === 'connect_open' && !value) {
      message = 'Are you sure you want to mark yourself as not open to chat?';
    } else if (type === 'single_open') {
      message = value
        ? 'Are you sure you want to mark yourself as single?'
        : 'Are you sure you want to mark yourself as not single?';
    }

    if (message) {
      Alert.alert(
        'Confirmation',
        message,
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          {
            text: 'Yes',
            onPress: () => {
              // Update the respective switch
              if (type === 'connect_open') {
                setIsConnectOpen(value);
              } else if (type === 'single_open') {
                setIsSingleOpen(value);
              }

              // Patch the user data
              const updatedUser = { [type]: value };
              patchUserById(user_id, updatedUser)
                .catch((err) => console.error(err));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // No confirmation needed, just update the state and patch directly
      if (type === 'connect_open') {
        setIsConnectOpen(value);
      } else if (type === 'single_open') {
        setIsSingleOpen(value);
      }

      const updatedUser = { [type]: value };
      patchUserById(user_id, updatedUser)
        .catch((err) => console.error(err));
    }
  };

  if (!userDetails) {
    return <Text>Loading...</Text>; // Show a loading state while fetching user details
  }

  return (
    <>
    <View style={styles.profileBanner}>
      <Image
        source={{ uri: userDetails.picture_url || 'https://via.placeholder.com/50' }}
        style={styles.profileImage}
      />
      <View style={styles.profileTextContainer}>
        <Text style={styles.profileTitle}>{userDetails.first_name} {userDetails.second_name}</Text>
        <Text style={styles.profileSubTitle}>{userDetails.username}</Text>
      </View>
    </View>

    <View style={styles.container}>
      {/* Open to chat section */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>Open to chat</Text>
        <View style={styles.optionRow}>
          <Text style={styles.emoji}>😊</Text>
          <Switch
            value={isConnectOpen}
            onValueChange={(value) => handleSwitchChange('connect_open', value)}
            thumbColor={isConnectOpen ? '#489FE1' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
      </View>

      {/* Single and running towards love section */}
      <View style={styles.optionBox}>
        <Text style={styles.optionTitle}>Single and running towards love</Text>
        <View style={styles.optionRow}>
          <Text style={styles.emoji}>❤️</Text>
          <Switch
            value={isSingleOpen}
            onValueChange={(value) => handleSwitchChange('single_open', value)}
            thumbColor={isSingleOpen ? '#FF6347' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#FFB6C1' }}
          />
        </View>
      </View>

      {/* My details section */}
      <Text style={styles.header}>My details</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile', { userDetails })} // Navigate to EditProfile and pass userDetails
      >
        <Text style={styles.editButtonText}>Edit profile</Text>
      </TouchableOpacity>

      {/* Support section */}
      <Text style={styles.header}>Support</Text>
      <TouchableOpacity style={styles.supportButton}>
        <Text style={styles.supportButtonText}>Safety</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 12,
    marginLeft: 10,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  profileSubTitle: {
    fontSize: 18,
    color: '#333',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  optionBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#489FE1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  supportButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  supportButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
