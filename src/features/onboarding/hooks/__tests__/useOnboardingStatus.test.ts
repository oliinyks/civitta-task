import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOnboardingStatus } from '../useOnboardingStatus';

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

beforeEach(() => {
  jest.clearAllMocks();
  (AsyncStorage as unknown as { _reset: () => void })._reset();
});

describe('useOnboardingStatus', () => {
  it('starts with isLoading true and hasCompletedOnboarding false', () => {
    mockAsyncStorage.getItem.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useOnboardingStatus());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasCompletedOnboarding).toBe(false);
  });

  it('sets isLoading to false after AsyncStorage resolves', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    const { result } = renderHook(() => useOnboardingStatus());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('sets hasCompletedOnboarding to false when key is not set', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    const { result } = renderHook(() => useOnboardingStatus());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.hasCompletedOnboarding).toBe(false);
  });

  it('sets hasCompletedOnboarding to true when stored value is "true"', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce('true');
    const { result } = renderHook(() => useOnboardingStatus());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.hasCompletedOnboarding).toBe(true);
  });

  it('markCompleted sets hasCompletedOnboarding to true', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useOnboardingStatus());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.markCompleted();
    });

    expect(result.current.hasCompletedOnboarding).toBe(true);
  });

  it('markCompleted calls AsyncStorage.setItem with correct args', async () => {
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);
    mockAsyncStorage.setItem.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useOnboardingStatus());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.markCompleted();
    });

    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      'onboardingCompleted',
      'true',
    );
  });
});
