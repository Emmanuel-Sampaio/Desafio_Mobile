import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveMessages = async (messages) => {
  try {
    await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
  } catch (error) {
    console.error('Erro ao salvar mensagens:', error);
  }
};

export const loadMessages = async () => {
  try {
    const data = await AsyncStorage.getItem('chatMessages');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar mensagens:', error);
    return [];
  }
};
