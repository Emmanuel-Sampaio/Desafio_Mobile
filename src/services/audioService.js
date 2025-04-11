import { Audio } from 'expo-av';

let recording = null;

export const startRecording = async () => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
    recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
  } catch (error) {
    console.error('Erro ao iniciar gravação:', error);
  }
};

export const stopRecording = async () => {
  try {
    await recording.stopAndUnloadAsync();
    return recording.getURI();
  } catch (error) {
    console.error('Erro ao parar gravação:', error);
  }
};
