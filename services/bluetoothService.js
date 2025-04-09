import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const listDispositivos = async () => {
  try {
    const devices = await RNBluetoothClassic.getBondedDevices();
    return devices;
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    return [];
  }
};
