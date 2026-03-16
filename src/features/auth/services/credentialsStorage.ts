import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@constants/storageKeys';

export type BasicAuthCredentials = {
  username: string;
  password: string;
};

export const saveBasicAuthCredentials = async (
  credentials: BasicAuthCredentials,
): Promise<void> => {
  await SecureStore.setItemAsync(
    STORAGE_KEYS.basicAuthUsername,
    credentials.username,
  );
  await SecureStore.setItemAsync(
    STORAGE_KEYS.basicAuthPassword,
    credentials.password,
  );
};

export const getBasicAuthCredentials = async (): Promise<BasicAuthCredentials | null> => {
  const [username, password] = await Promise.all([
    SecureStore.getItemAsync(STORAGE_KEYS.basicAuthUsername),
    SecureStore.getItemAsync(STORAGE_KEYS.basicAuthPassword),
  ]);

  if (!username || !password) {
    return null;
  }

  return { username, password };
};

