import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { getChatsByUser, getLatestMessageFromChat } from '../../api'; 
import moment from 'moment';

export default function MessagesHome({ navigation }) {
  const user_id = 1; 
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestMessages, setLatestMessages] = useState({});

  useEffect(() => {
    // Fetch chats for the user
    getChatsByUser(user_id)
      .then((fetchedChats) => {
        setChats(fetchedChats);
        setLoading(false);

        // Fetch the latest message for each chat
        fetchedChats.forEach(chat => {
          getLatestMessageFromChat(chat.chat_id)
            .then(message => {
              setLatestMessages(prevMessages => ({
                ...prevMessages,
                [chat.chat_id]: message,
              }));
            })
            .catch(console.error);
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderChat = ({ item }) => {
    const latestMessage = latestMessages[item.chat_id];
    
    const chatName = item.is_group
      ? item.group_name
      : item.users.length > 0 ? item.users[0].first_name : 'Unknown User';
  
    const chatSubtitle = item.users.length > 0
      ? item.users[0].username
      : 'No Username';
  
    const pictureUrl = item.is_group 
      ? item.group_picture_url 
      : item.users.length > 0 ? item.users[0].picture_url : null;
  
    const formattedTimestamp = latestMessage ? moment(latestMessage.timestamp).format('h:mm A') : '';
  
    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => navigation.navigate('MessagesList', { chat_id: item.chat_id, chatName, pictureUrl, isGroupChat: item.is_group })}
      >
        <View style={item.is_group ? styles.groupImageContainer : styles.chatImageContainer}>
          <Image
            source={{ uri: pictureUrl || 'https://via.placeholder.com/50' }}
            style={styles.chatImage}
          />
          {item.is_group && (
            <View style={styles.groupBanner}>
              <Text style={styles.groupBannerText}>Group</Text>
            </View>
          )}
        </View>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatTitle}>{chatName}</Text>
          <Text style={styles.chatSubtitle}>{chatSubtitle}</Text>
          <Text style={styles.latestMessage} numberOfLines={1}>
            {latestMessage ? `${latestMessage.username}: ${latestMessage.content}` : 'No messages yet'}
          </Text>
        </View>
        {latestMessage && (
          <Text style={styles.timestamp}>{formattedTimestamp}</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chats...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={renderChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
  },
  chatCard: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  chatImageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  groupImageContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
    position: 'relative',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupBanner: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    backgroundColor: '#00BFAE',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderTopLeftRadius: 5,
  },
  groupBannerText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  chatTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  latestMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-start', // Align the timestamp to the top right
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
