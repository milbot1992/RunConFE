import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { deleteUserAttendingRun } from '../../../api';
import CustomButton from './RunCardButton';

export default function RunsList({ runs, user_id, refreshRuns, navigation, isPastRun }) {
    const [deletingRun, setDeletingRun] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [runToBeRemoved, setRunToBeRemoved] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // Track success message
    const [loading, setLoading] = useState(false); // Track loading state

    const handleRemoveRun = (run_id) => {
        setRunToBeRemoved(run_id);
        setModalVisible(true);
    };

    const confirmRemoveRun = () => {
        setLoading(true);
        if (runToBeRemoved) {
            deleteUserAttendingRun(user_id, runToBeRemoved)
                .then(() => {
                    setDeletingRun(runToBeRemoved);
                    setSuccessMessage('Cancelled attendance'); // Set success message
                    setTimeout(() => {
                        refreshRuns(); 
                        setModalVisible(false); // Close modal after 2 seconds
                        setSuccessMessage(''); // Reset success message
                    }, 2000); // Delay closing the modal by 2 seconds
                })
                .catch((error) => {
                    console.error('Error removing user from run:', error);
                })
                .finally(() => {
                    setLoading(false); // Stop loading
                    setRunToBeRemoved(null);
                });
        }
    };

    const handleCardPress = (run_id, group_id) => {
        navigation.navigate('SingleRun', { run_id, group_id });
    };

    return (
        <View style={styles.container}>
            {runs.map((run) => (
                <TouchableOpacity
                    key={run._id}
                    style={styles.card}
                    onPress={() => handleCardPress(run.run_id, run.group_id)}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.header}>{run.group_name}</Text>
                            <Text>Date: {run.date}</Text>
                            <Text>Time: {run.time}</Text>
                            <Text>Meeting Point: {run.meeting_point}</Text>
                            <Text>Distance: {run.distance} {run.distance_unit}</Text>
                        </View>
                        {isPastRun === 'upcoming' && (  // Conditionally render the cancel button
                            <View style={styles.cancelButtonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleRemoveRun(run.run_id)}
                                >
                                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {deletingRun === run._id && (
                        <Text style={styles.cancellationMessage}>
                            You have now selected to cancel attendance to this run.
                        </Text>
                    )}
                </TouchableOpacity>
            ))}

            {/* Modal for cancellation confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {successMessage ? (
                            <Text style={styles.modalText}>{successMessage}</Text>
                        ) : (
                            <>
                                <Text style={styles.modalText}>
                                    Are you sure you want to cancel your attendance to this run?
                                </Text>
                                <CustomButton
                                    title="Cancel Attendance"
                                    onPress={confirmRemoveRun}
                                    color="#FF6F61" 
                                    disabled={loading}
                                />
                            </>
                        )}
                        <CustomButton
                            title="Close"
                            onPress={() => setModalVisible(false)}
                            color="#888" 
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    card: {
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 12,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    cancelButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButton: {
        paddingVertical: 5,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#FF6F61',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 14,
    },
    cancellationMessage: {
        color: '#FF6F61',
        marginTop: 5,
        fontStyle: 'italic',
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
