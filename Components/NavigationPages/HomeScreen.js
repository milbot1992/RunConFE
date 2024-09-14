import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GroupPosts from './Groups/GroupPosts';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ico-material-design'; // For the icon

export default function HomeScreen({ route }) {
  const { groupPosts } = route.params;
  const user_id = 1;
  const username = 'username1';
  const navigation = useNavigation();

  const handleAddPostPress = () => {
    navigation.navigate('AddPost', { user_id, username });
  };

  if (!groupPosts || groupPosts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Styled Add Post Section */}
      <View style={styles.addPostContainer}>
        <TouchableOpacity style={styles.addPostButton} onPress={handleAddPostPress}>
          <View style={styles.iconContainer}>
            <Icon name="add-button-inside-black-circle" height="20" width="20" color="white" />
          </View>
          <Text style={styles.addPostText}>Add a Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <GroupPosts groupPosts={groupPosts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  addPostContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#66B2B2', 
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  addPostText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#66B2B2',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});
