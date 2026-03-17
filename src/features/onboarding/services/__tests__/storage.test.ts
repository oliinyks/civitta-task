import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOnboardingCompleted, setOnboardingCompleted } from '../storage';
import { STORAGE_KEYS } from '@constants/storageKeys';

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

beforeEach(() => {
  jest.clearAllMocks();
  (AsyncStorage as unknown as { _reset: () => void })._reset();
});

describe('getOnboardingCompleted', () => {
  it('returns false when key is not set', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    const result = await getOnboardingCompleted();
    expect(result).toBe(false);
  });

  it('returns false when stored value is not "true"', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce('false');
    const result = await getOnboardingCompleted();
    expect(result).toBe(false);
  });

  it('returns true when stored value is "true"', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce('true');
    const result = await getOnboardingCompleted();
    expect(result).toBe(true);
  });

  it('calls AsyncStorage.getItem with the correct key', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    await getOnboardingCompleted();
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith(
      STORAGE_KEYS.onboardingCompleted,
    );
  });
});

describe('setOnboardingCompleted', () => {
  it('calls AsyncStorage.setItem with correct key and value', async () => {
    mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);
    await setOnboardingCompleted();
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.onboardingCompleted,
      'true',
    );
  });

  it('resolves without error', async () => {
    mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);
    await expect(setOnboardingCompleted()).resolves.toBeUndefined();
  });
});
