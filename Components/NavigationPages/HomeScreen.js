import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GroupPosts from './Groups/GroupPosts'; // Ensure default import

export default function HomeScreen({ route }) {
  const { groupPosts } = route.params;

  if (!groupPosts || groupPosts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Group Posts:</Text>
      <GroupPosts groupPosts={groupPosts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});
