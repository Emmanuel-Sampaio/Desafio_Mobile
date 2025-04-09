import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { connectBluetooth, sendMessage, receiveMessages } from '../services/bluetoothService';
import { loadMessages, saveMessages } from '../services/storageService';


export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      await connectBluetooth();
      const saved = await loadMessages();
      setMessages(saved);
      receiveMessages((msg) => {
        const newMsg = { type: 'text', content: msg, from: 'remote' };
        setMessages((prev) => {
          const updated = [...prev, newMsg];
          saveMessages(updated); // salva todas as mensagens atualizadas
          return updated;
        });
      });
    })();
  }, []);
  

  const handleSend = async (msgObj) => {
    await sendMessage(msgObj.content);
    const localMsg = { ...msgObj, from: 'local' };
    setMessages((prev) => [...prev, localMsg]);
    await saveMessages(localMsg);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => item ? <ChatMessage message={item} /> : null}
      />
      <ChatInput onSend={handleSend} /> {/* Corrigido aqui */}
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
});
