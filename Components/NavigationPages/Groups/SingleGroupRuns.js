import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getRunsByGroup } from '../../../api';
import RunCard from '../Runs/RunCard';

export default function SingleGroupRuns({ group, navigation }) {
  const [upcomingRuns, setUpcomingRuns] = useState([]);
  const [pastRuns, setPastRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const user_id = 1;

  useEffect(() => {
    setIsLoading(true);

    // Fetch upcoming runs
    getRunsByGroup(group.group_id, 'y', user_id)
      .then((runs) => setUpcomingRuns(runs));

    // Fetch past runs
    getRunsByGroup(group.group_id, 'n', user_id)
      .then((runs) => setPastRuns(runs))
      .finally(() => setIsLoading(false));
  }, [group.group_id]);

  const handleTabPress = (tab) => setSelectedTab(tab);

  // Function to update run attendance in the state
  const updateAttendance = (runId, isAttending) => {
    setUpcomingRuns(prevRuns =>
      prevRuns.map(run =>
        run.run_id === runId
          ? { ...run, is_user_attending: isAttending ? 'yes' : 'no' }
          : run
      )
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>Runs</Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => handleTabPress('upcoming')}>
              <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.selectedTab]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('past')}>
              <Text style={[styles.tabText, selectedTab === 'past' && styles.selectedTab]}>
                Past Runs
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedTab === 'upcoming' ? (
              upcomingRuns.length > 0 ? (
                upcomingRuns.map(run => (
                  <RunCard
                    key={run._id}
                    run={run}
                    isPastRun={false}
                    user_id={user_id}
                    navigation={navigation}
                    updateAttendance={updateAttendance}
                  />
                ))
              ) : (
                <View style={styles.noRunsCard}>
                  <Text style={styles.noRunsText}>No upcoming runs to display</Text>
                </View>
              )
            ) : (
              pastRuns.length > 0 ? (
                pastRuns.map(run => (
                  <RunCard
                    key={run._id}
                    run={run}
                    isPastRun={true}
                    navigation={navigation}
                    user_id={user_id}
                  />
                ))
              ) : (
                <View style={styles.noRunsCard}>
                  <Text style={styles.noRunsText}>No past runs to display</Text>
                </View>
              )
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
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
