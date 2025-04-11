import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ChatMessage({ message }) {
  if (message.type === 'text') {
    return (
      <View style={[styles.bubble, message.from === 'local' ? styles.local : styles.remote]}>
       <Text>{message.content?.toString() || ''}</Text>
      </View>
    );
  }

  if (message.type === 'image') {
    return (
      <Image source={{ uri: message.content }} style={styles.image} />
    );
  }

  if (message.type === 'audio') {
    return (
      <Text style={styles.audio}>🎤 Áudio recebido</Text>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  bubble: { padding: 10, marginVertical: 5, borderRadius: 8 },
  local: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' },
  remote: { alignSelf: 'flex-start', backgroundColor: '#eee' },
  image: { width: 200, height: 150, marginVertical: 5 },
  audio: { fontStyle: 'italic', color: '#555', marginVertical: 5 },
});
