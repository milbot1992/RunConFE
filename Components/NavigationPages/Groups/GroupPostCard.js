import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Modal, TouchableHighlight } from 'react-native';

export default function GroupPostCard({title, description, created_at, picture_url, username, group_name, user_url}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Convert the created_at string into a Date object
  const date = new Date(created_at);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.groupImage}
          source={{ uri: user_url }}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.groupName}>{group_name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {picture_url ? (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image 
              style={styles.image}
              source={{ uri: picture_url }}
            />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.createdAt}>{formattedDate}</Text>
      </View>

      {/* Modal for displaying full screen image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableHighlight>
          <Image
            style={styles.modalImage}
            source={{ uri: picture_url }}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  groupName: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',  // Full black background
  },
  modalImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 0,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 20,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BEBEBE',
  },
});
