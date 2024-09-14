import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getRunsByUser } from '../../api';
import RunsList from './Runs/RunsList';
import { useIsFocused } from '@react-navigation/native';

export default function MyRuns({ route, navigation }) {
    const user_id = 1; 
    const [runs, setRuns] = useState([]);
    const [selectedTab, setSelectedTab] = useState('upcoming');
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused(); // Check if the screen is focused

    const refreshRuns = () => {
        setIsLoading(true);
        getRunsByUser(user_id, selectedTab === 'upcoming' ? 'y' : 'n')
            .then((fetchedRuns) => {
                setRuns(fetchedRuns);
            })
            .catch((error) => {
                console.error("Error fetching runs:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (isFocused) {
            refreshRuns(); // Fetch runs when the screen is focused
        }
    }, [isFocused, selectedTab]);

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => handleTabPress('upcoming')}>
                            <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.selectedTab]}>
                                Upcoming
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTabPress('past')}>
                            <Text style={[styles.tabText, selectedTab === 'past' && styles.selectedTab]}>
                                Past
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {runs.length > 0 ? (
                            <RunsList runs={runs} user_id={user_id} refreshRuns={refreshRuns} navigation={navigation} isPastRun={selectedTab}/>
                        ) : (
                            <View style={styles.noRunsCard}>
                                <Text style={styles.noRunsText}>
                                    {selectedTab === 'upcoming' ? 'No upcoming runs to display' : 'No past runs to display'}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 0,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabText: {
        marginTop:10,
        fontSize: 18,
        color: 'black',
    },
    selectedTab: {
        fontWeight: 'bold',
        color: '#66B2B2',
    },
    scrollViewContent: {
        paddingBottom: 100,
    },
    noRunsCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    noRunsText: {
        fontSize: 16,
        color: '#666',
    },
});
