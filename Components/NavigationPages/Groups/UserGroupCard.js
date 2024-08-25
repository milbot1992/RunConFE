import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

export default function UserGroupCard({ group_name, description, created_at, picture_url, upcomingRun }) {
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
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{group_name}</Text>
          <Text style={styles.description}>Bio: {description}</Text>
          <Text style={styles.description}>Next Run: {upcomingRun}</Text>
          <Text style={styles.description}>Active since: {formattedDate}</Text>
        </View>
        {picture_url ? (
          <Image 
            style={styles.image}
            source={{ uri: picture_url }}
          />
        ) : null}
      </View>
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
    flexDirection: 'row', 
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  textContainer: {
    flex: 1, 
    marginRight: 10, 
  },
  image: {
    width: 100, 
    height: 100,
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
});
