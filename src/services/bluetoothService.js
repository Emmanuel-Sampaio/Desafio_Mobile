import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

export const pedirPermissoesBluetooth = async () => {
  if (Platform.OS === 'android') {
    await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
};

export const listDispositivos = async () => {
  try {
    const devices = await RNBluetoothClassic.getBondedDevices();java -version

    return devices;
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    return [];
  }
};

export const conectarDispositivo = async (device) => {
  try {
    const conectado = await device.connect();
    return conectado;
  } catch (error) {
    console.error('Erro ao conectar:', error);
    return false;
  }
};

export const enviarMensagem = async (device, mensagem) => {
  try {
    await device.write(mensagem + '\n'); // \n para indicar fim da mensagem
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};
