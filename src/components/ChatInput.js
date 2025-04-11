import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSendText = () => {
    if (text.trim()) {
      onSend({ type: 'text', content: text });
      setText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma mensagem"
        value={text}
        onChangeText={setText}
      />
      <Button title="Enviar" onPress={handleSendText} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginRight: 10, padding: 8 },
});
