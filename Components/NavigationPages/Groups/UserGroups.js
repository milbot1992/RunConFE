import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import UserGroupCard from './UserGroupCard';
import { getUpcomingRunForGroup } from '../../../api';

export default function UserGroups({ userGroups }) {
  const [upcomingRun, setUpcomingRun] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRuns = async () => {
      const runsData = {};
      for (const group of userGroups) {
        try {
          const upcomingRun = await getUpcomingRunForGroup(group.group_id);
          runsData[group.group_id] = upcomingRun;
        } catch (error) {
          runsData[group.group_id] = "Error fetching runs";
        }
      }
      setUpcomingRun(runsData);
      setIsLoading(false);
    };

    fetchRuns();
  }, [userGroups]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {userGroups.map((group) => (
        <UserGroupCard
            key={group._id}
            group_id={group.group_id}
            group_name={group.group_name}
            description={group.description}
            created_at={group.created_at}
            picture_url={group.picture_url}
            upcomingRun={upcomingRun[group.group_id]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
