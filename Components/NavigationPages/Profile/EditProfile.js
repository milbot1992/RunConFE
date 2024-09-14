import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Modal, StyleSheet, Switch } from 'react-native';
import { patchUserById, getUserById } from '../../../api'; 
import { useFocusEffect } from '@react-navigation/native';

export default function EditProfile({ route }) {
  const { userDetails: initialUserDetails } = route.params;

  // Local state for user info
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [editableField, setEditableField] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch the user details when the screen gains focus
      getUserById(userDetails.user_id)
        .then((data) => setUserDetails(data))
        .catch((err) => console.error(err));
    }, [userDetails.user_id])
  );

  // Optimistically update the field value
  const handleFieldUpdate = (field, value) => {
    const updatedUserDetails = { ...userDetails, [field]: value };
    setUserDetails(updatedUserDetails);

    // Patch the user data
    const updatedUser = { [field]: value };
    patchUserById(userDetails.user_id, updatedUser)
      .catch((err) => {
        console.error(err);
        // If patch fails, revert the changes
        setUserDetails(userDetails);
        Alert.alert('Error', 'Failed to update, please try again.');
      });
  };

  // Open modal to edit a specific field
  const handleEditField = (field) => {
    setEditableField(field);
    setTempValue(userDetails[field]);
    setModalVisible(true);
  };

  // Confirm edit and update the value
  const confirmEdit = () => {
    setModalVisible(false);
    handleFieldUpdate(editableField, tempValue);
  };

  return (
    <View style={styles.container}>
      {/* List of user details */}
      <TouchableOpacity onPress={() => handleEditField('gender')}>
        <View style={styles.listItem}>
          <Text style={styles.listLabel}>Gender</Text>
          <Text style={styles.listValue}>{userDetails.gender}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleEditField('open_to_gender')}>
        <View style={styles.listItem}>
          <Text style={styles.listLabel}>Open to Gender</Text>
          <Text style={styles.listValue}>{userDetails.open_to_gender}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for editing text fields */}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit {editableField}</Text>
              <TextInput
                style={styles.input}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus={true}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={confirmEdit}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  listValue: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#489FE1',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#489FE1',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
