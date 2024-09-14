import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { getGroupsByUser, postPost } from '../../../api';
import { Picker } from '@react-native-picker/picker';

export default function AddPost({ route, navigation }) {
  const { user_id, username } = route.params;
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => {
    getGroupsByUser(user_id).then(setGroups).catch(err => {
      Alert.alert('Error', 'Could not fetch groups.');
      console.error(err);
    });
  }, [user_id]);

  const handlePostSubmit = () => {
    if (!selectedGroup) {
      Alert.alert('Error', 'Please select a group.');
      return;
    }

    const newPost = {
      is_group: true,
      group_id: selectedGroup.group_id,
      group_name: selectedGroup.group_name,
      run_id: 4, 
      user_id,
      username,
      title,
      description,
      picture_url: pictureUrl || 'testurl',
    };

    postPost(newPost)
      .then(() => {
        Alert.alert('Success', 'Post added successfully!');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', 'Could not submit post.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Post</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Select Group:</Text>
        <Picker
          selectedValue={selectedGroup}
          onValueChange={(itemValue) => setSelectedGroup(itemValue)}
          style={styles.picker}
        >
          {groups.map((group) => (
            <Picker.Item key={group.group_id} label={group.group_name} value={group} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Picture URL (optional)"
        value={pictureUrl}
        onChangeText={setPictureUrl}
        placeholderTextColor="#A9A9A9"
      />

      <TouchableOpacity onPress={handlePostSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 110,
    backgroundColor: '#F8F8F8', 
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333', 
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666', 
    marginRight: 10,
  },
  picker: {
    flex: 1,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10, 
    backgroundColor: '#FFFFFF', 
    color: '#333',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF', 
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitButton: {
    backgroundColor: '#66B2B2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
