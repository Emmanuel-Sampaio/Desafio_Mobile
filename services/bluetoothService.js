import { Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

// Função para pedir permissões no Android
export const pedirPermissoesBluetooth = async () => {
  if (Platform.OS === 'android') {
    try {
      await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } catch (error) {
      console.error('Erro ao pedir permissões:', error);
    }
  }
};

// Função para listar dispositivos pareados
export const listDispositivos = async () => {
  try {
    const devices = await RNBluetoothClassic.getBondedDevices();
    return devices;
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    return [];
  }
};

// Exportando tudo junto como um objeto, se quiser importar com default
export default {
  pedirPermissoesBluetooth,
  listDispositivos
};
