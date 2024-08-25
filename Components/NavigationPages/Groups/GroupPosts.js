import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import GroupPostCard from './GroupPostCard';

export default function GroupPosts({ groupPosts }) {

  return (
    <ScrollView style={styles.container}>
      {groupPosts.map((post) => (
        <GroupPostCard
          key={post._id}
          title={post.title}
          description={post.description}
          created_at={post.created_at}
          picture_url={post.picture_url}
          username={post.username}
          group_name={post.group_name}
          user_url={post.user_url}
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
});
