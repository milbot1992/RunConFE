import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Modal, TouchableOpacity } from 'react-native';
import { getPicturesByGroup } from '../../../api';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SingleGroupPhotos({ group }) {
    const [groupPictures, setGroupPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track selected image index
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getPicturesByGroup(group.group_id)
            .then((response) => {
                if (response.message) {
                    setErrorMessage(response.message);
                    setGroupPictures([]);
                } else {
                    setGroupPictures(response);
                    setErrorMessage('');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching group pictures:", error);
                setIsLoading(false);
                setErrorMessage('Error fetching pictures.');
            });
    }, [group.group_id]);

    const handleImagePress = (index) => {
        setSelectedImageIndex(index);
        setIsModalVisible(true);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity 
            onPress={() => handleImagePress(index)}
            activeOpacity={1}  // Removes the opacity change on press
            style={{ ...styles.imageContainer, borderWidth: 0 }} // Explicitly remove border
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.url }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>PHOTOS</Text>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : errorMessage ? (
                <Text style={styles.noPhotosText}>{errorMessage}</Text>
            ) : groupPictures.length === 0 ? (
                <View style={styles.noPhotosContainer}>
                    <Text style={styles.noPhotosText}>No Group Photos yet</Text>
                </View>
            ) : (
                <FlatList
                    data={groupPictures}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                />
            )}

            {/* Modal for displaying full screen images with scrolling */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={groupPictures}
                        renderItem={({ item }) => (
                            <Image
                                style={styles.modalImage}
                                source={{ uri: item.url }}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={selectedImageIndex}
                        getItemLayout={(data, index) => ({
                            length: screenWidth,
                            offset: screenWidth * index,
                            index,
                        })}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333', 
        marginBottom: 8,
        textTransform: 'uppercase', 
        letterSpacing: 0.5,
    },
    imageContainer: {
        width: screenWidth * 0.7,
        height: 160, 
        borderRadius: 8,
        marginRight: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    noPhotosContainer: {
        width: screenWidth * 0.7,
        height: 160,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    noPhotosText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',  
    },
    modalImage: {
        width: screenWidth,
        height: screenHeight * 0.8,
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 25,
        padding: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, 
    },
    closeButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
