import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { listDispositivos, conectarDispositivo, pedirPermissoesBluetooth } from '../services/bluetoothService';


export default function HomeScreen({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);

  useEffect(() => {
    pedirPermissoesBluetooth(); // Solicita as permissões Bluetooth ao iniciar
  }, []);

  const handleListar = async () => {
    const lista = await listDispositivos();
    setDispositivos(lista);
  };

  const handleConectar = async (device) => {
    const conectado = await conectarDispositivo(device);
    if (conectado) {
      navigation.navigate('Chat', { device });
    } else {
      alert('Erro ao conectar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Pareados</Text>
      <Button title="Listar dispositivos" onPress={handleListar} />
      <FlatList
        data={dispositivos}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleConectar(item)} style={styles.deviceButton}>
            <Text style={styles.deviceText}>{item.name || item.address}</Text>
          </TouchableOpacity>
        )}
        style={{ marginTop: 20, width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    fontSize: 22, marginBottom: 20
  },
  deviceButton: {
    padding: 15, backgroundColor: '#ccc', borderRadius: 8, marginBottom: 10
  },
  deviceText: {
    fontSize: 16
  }
});
