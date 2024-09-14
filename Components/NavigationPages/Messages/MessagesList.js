import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { getMessagesByChat, postMessage } from '../../../api';

export default function MessagesList({ route }) {
  const { chat_id, chatName, pictureUrl, isGroupChat } = route.params;  // Assuming isGroupChat is passed

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);  // Create a ref for FlatList

  useEffect(() => {
    // Fetch messages when chat_id changes
    getMessagesByChat(chat_id)
      .then(setMessages)
      .catch(err => console.error(err));
  }, [chat_id]);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollToEnd({ animated: true });
      }
    }, 50); // Adjust timeout if necessary
  }, [messages]);

  const sendMessage = () => {
    const messageData = {
      sender_id: 1, 
      chat_id,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    postMessage(messageData).then(() => {
      setMessages(prevMessages => [...prevMessages, messageData]);
      setNewMessage('');
    }).catch(err => console.error(err));
  };

  const renderMessage = ({ item, index }) => {
    const previousMessage = messages[index - 1];
    const currentMessageDate = new Date(item.timestamp).toDateString();
    const previousMessageDate = previousMessage ? new Date(previousMessage.timestamp).toDateString() : null;

    const showDate = currentMessageDate !== previousMessageDate;

    return (
      <View>
        {/* Conditionally render the date */}
        {showDate && (
          <Text style={styles.messageDate}>
            {currentMessageDate}
          </Text>
        )}
        <View
          style={[
            styles.messageCard,
            item.sender_id === 1 ? styles.messageFromUser : styles.messageFromOther,
          ]}
        >
          {isGroupChat && item.sender_id !== 1 && (
            <Text style={styles.senderId}>{item.first_name}</Text>
          )}
          <Text style={styles.messageContent}>{item.content}</Text>
          <Text style={styles.messageTimestamp}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.chatBanner}>
        <Image
          source={{ uri: pictureUrl || 'https://via.placeholder.com/50' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>{chatName}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          ref={messagesEndRef} // Attach the ref to the FlatList
          data={messages}
          keyExtractor={(item) => String(item.message_id)}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingBottom: 20 }} // Ensures space for the input
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chatBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    paddingTop: 50
  },
  bannerImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 12,
    marginLeft: 40,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  messageCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  messageFromUser: {
    backgroundColor: '#cdf3ef', 
    alignSelf: 'flex-end', 
  },
  messageFromOther: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start', 
  },
  messageContent: {
    fontSize: 16,
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 4,
    color: '#777',
    alignSelf: 'flex-end', 
  },
  messageDate: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  senderId: {
    fontSize: 12,
    fontWeight:'bold',
    color: '#555',
    marginBottom: 4,
    marginTop: 4,
    textAlign: 'left ',
  },
});
