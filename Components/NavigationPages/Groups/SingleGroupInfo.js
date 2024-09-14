import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SingleGroupInfo({ group, user_joined_group }) {
    return (
        <View style={styles.infoContainer}>
            <Text style={styles.header}>STATUS</Text>
            <Text style={styles.description}>Member Since: {user_joined_group}</Text>
            <Text style={styles.header}>UPDATES</Text>
            <View style={styles.updateBox}>
                <Text style={styles.updateText}>{group.latest_update}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        width: '100%',
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333', 
        marginBottom: 8,
        textTransform: 'uppercase', 
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 16,
        color: '#555', 
        marginBottom: 20,
    },
    updateBox: {
        width: '100%',
        alignSelf: 'center',
        padding: 15,
        backgroundColor: 'white', 
    },
    updateText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
});
