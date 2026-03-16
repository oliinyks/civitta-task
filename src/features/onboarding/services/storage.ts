import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/storageKeys';

export const getOnboardingCompleted = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.onboardingCompleted);
  return value === 'true';
};

export const setOnboardingCompleted = async (): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.onboardingCompleted, 'true');
};

