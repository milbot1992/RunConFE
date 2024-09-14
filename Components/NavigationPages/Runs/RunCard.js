import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { postUserAttendingRun, deleteUserAttendingRun } from '../../../api';
import CustomButton from './RunCardButton'; 

export default function RunCard({ run, isPastRun, user_id, updateAttendance, navigation }) {
  console.log(run);
  const { date, meeting_point, distance, is_user_attending, run_id, group_id } = run;
  const [isAttending, setIsAttending] = useState(is_user_attending === 'yes');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Handle attendance update
  const handleAttendanceUpdate = () => {
    setLoading(true);
    if (isAttending) {
      deleteUserAttendingRun(user_id, run_id)
        .then(() => {
          setIsAttending(false);
          updateAttendance(run_id, false); // Update parent state
          setSuccessMessage('Cancelled attendance');
          setTimeout(() => {
            setModalVisible(false);
            setSuccessMessage('');
          }, 2000);
        })
        .catch((error) => {
          Alert.alert('Error', 'Could not update attendance.');
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      postUserAttendingRun({ user_id, run_id, status: 'confirmed' })
        .then(() => {
          setIsAttending(true);
          updateAttendance(run_id, true); // Update parent state
          setSuccessMessage('Confirmed attendance');
          setTimeout(() => {
            setModalVisible(false);
            setSuccessMessage('');
          }, 2000);
        })
        .catch((error) => {
          Alert.alert('Error', 'Could not update attendance.');
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleCardPress = (run_id, group_id) => {
    navigation.navigate('SingleRun', { run_id, group_id });
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleCardPress(run.run_id, run.group_id)}
    >
      <View>
        <Text style={styles.dateText}>Date: {date}</Text>
        <Text style={styles.dateText}>Time: {run.time}</Text>
        <Text style={styles.locationText}>Meeting point: {meeting_point}</Text>
        <Text style={styles.distanceText}>Distance: {distance} km</Text>
      </View>

      {!isPastRun && (
        <TouchableOpacity onPress={toggleModal}>
          <View style={[styles.attendanceBox, isAttending ? styles.attending : styles.notAttending]}>
            <Text style={styles.attendanceText}>
              {isAttending ? 'Attending' : 'Not Attending'}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {isPastRun && (
        <View style={[styles.attendanceBoxPast, isAttending ? styles.attending : styles.notAttending]}>
          <Text style={styles.attendanceText}>
            {isAttending ? 'Attended' : 'Did not Attend'}
          </Text>
        </View>
      )}

      {/* Modal for attendance confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {successMessage ? (
              <Text style={styles.modalText}>{successMessage}</Text>
            ) : (
              <>
                <Text style={styles.modalText}>
                  {isAttending
                    ? 'Are you sure you want to cancel your attendance to this run?'
                    : 'Do you want to attend this run?'}
                </Text>
                <CustomButton
                  title={isAttending ? 'Cancel Attendance' : 'Attend'}
                  onPress={handleAttendanceUpdate}
                  color={isAttending ? '#FF6F61' : '#66B2B2'} 
                  disabled={loading}
                />
              </>
            )}
            <CustomButton
              title="Close"
              onPress={toggleModal}
              color="#888" 
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  dateText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  distanceText: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    color: '#666',
  },
  attendanceBox: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  attendanceBoxPast: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  attending: {
    backgroundColor: '#D1F7F1',
  },
  notAttending: {
    backgroundColor: '#ccc',
  },
  attendanceText: {
    fontSize: 12,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
},
});
