import * as SecureStore from 'expo-secure-store';
import {
  saveBasicAuthCredentials,
  getBasicAuthCredentials,
} from '../credentialsStorage';
import { STORAGE_KEYS } from '@constants/storageKeys';

const mockSecureStore = SecureStore as jest.Mocked<typeof SecureStore>;

beforeEach(() => {
  jest.clearAllMocks();
  (SecureStore as unknown as { _reset: () => void })._reset();
});

describe('saveBasicAuthCredentials', () => {
  it('calls setItemAsync for username with correct key and value', async () => {
    mockSecureStore.setItemAsync.mockResolvedValue(undefined);
    await saveBasicAuthCredentials({ username: 'user', password: 'civitta' });
    expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
      STORAGE_KEYS.basicAuthUsername,
      'user',
    );
  });

  it('calls setItemAsync for password with correct key and value', async () => {
    mockSecureStore.setItemAsync.mockResolvedValue(undefined);
    await saveBasicAuthCredentials({ username: 'user', password: 'civitta' });
    expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith(
      STORAGE_KEYS.basicAuthPassword,
      'civitta',
    );
  });

  it('calls setItemAsync exactly twice', async () => {
    mockSecureStore.setItemAsync.mockResolvedValue(undefined);
    await saveBasicAuthCredentials({ username: 'user', password: 'civitta' });
    expect(mockSecureStore.setItemAsync).toHaveBeenCalledTimes(2);
  });

  it('resolves without error', async () => {
    mockSecureStore.setItemAsync.mockResolvedValue(undefined);
    await expect(
      saveBasicAuthCredentials({ username: 'user', password: 'civitta' }),
    ).resolves.toBeUndefined();
  });
});

describe('getBasicAuthCredentials', () => {
  it('returns null when both username and password are missing', async () => {
    mockSecureStore.getItemAsync.mockResolvedValue(null);
    const result = await getBasicAuthCredentials();
    expect(result).toBeNull();
  });

  it('returns null when only username is present', async () => {
    mockSecureStore.getItemAsync
      .mockResolvedValueOnce('user')
      .mockResolvedValueOnce(null);
    const result = await getBasicAuthCredentials();
    expect(result).toBeNull();
  });

  it('returns null when only password is present', async () => {
    mockSecureStore.getItemAsync
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce('civitta');
    const result = await getBasicAuthCredentials();
    expect(result).toBeNull();
  });

  it('returns credentials object when both username and password are present', async () => {
    mockSecureStore.getItemAsync
      .mockResolvedValueOnce('user')
      .mockResolvedValueOnce('civitta');
    const result = await getBasicAuthCredentials();
    expect(result).toEqual({ username: 'user', password: 'civitta' });
  });
});
