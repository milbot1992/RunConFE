import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function SingleGroupBanner({ group }) {
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: group.picture_url }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.groupName}>{group.group_name}</Text>
                <Text style={styles.description}>{group.description}</Text>
                <Text style={styles.description}>Meeting Point: Filler text</Text>
                <Text style={styles.description}>Active since: {group.created_at}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',

    },
    image: {
        width: '100%',
        height: 200, 
        backgroundColor: '#F0F0F0',
    },
    infoContainer: {
        padding: 20
    },
    groupName: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 4,
    },
});
