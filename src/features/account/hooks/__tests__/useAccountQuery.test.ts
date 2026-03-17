import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccountQuery } from '../useAccountQuery';
import * as credentialsStorage from '@features/auth/services/credentialsStorage';
import * as accountService from '../../services/accountService';
import { Account } from '../../types';

jest.mock('@features/auth/services/credentialsStorage');
jest.mock('../../services/accountService');

const mockGetCredentials = credentialsStorage.getBasicAuthCredentials as jest.MockedFunction<
  typeof credentialsStorage.getBasicAuthCredentials
>;
const mockGetAccount = accountService.getAccount as jest.MockedFunction<
  typeof accountService.getAccount
>;

const mockAccount: Account = {
  accountType: 'Savings',
  accountNumber: '1234567890',
  availableBalance: 12000,
  currency: 'NGN',
  dateAdded: '15/05/20, 10:03 AM',
  transactions: [
    {
      name: 'John Ogaga',
      bank: 'Zenith Bank',
      time: '12:03 AM',
      amount: 20983,
    },
  ],
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0 },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useAccountQuery', () => {
  it('throws "Missing credentials" error when credentials are null', async () => {
    mockGetCredentials.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toContain('Missing credentials');
  });

  it('does not call getAccount when credentials are null', async () => {
    mockGetCredentials.mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetAccount).not.toHaveBeenCalled();
  });

  it('calls getAccount with credentials when they are present', async () => {
    const credentials = { username: 'user', password: 'civitta' };
    mockGetCredentials.mockResolvedValueOnce(credentials);
    mockGetAccount.mockResolvedValueOnce(mockAccount);

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetAccount).toHaveBeenCalledWith(credentials);
  });

  it('returns account data on success', async () => {
    const credentials = { username: 'user', password: 'civitta' };
    mockGetCredentials.mockResolvedValueOnce(credentials);
    mockGetAccount.mockResolvedValueOnce(mockAccount);

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockAccount);
  });

  it('starts in loading state', () => {
    mockGetCredentials.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('sets error state when getAccount fails', async () => {
    const credentials = { username: 'user', password: 'civitta' };
    mockGetCredentials.mockResolvedValueOnce(credentials);
    mockGetAccount.mockRejectedValueOnce(new Error('Server error'));

    const { result } = renderHook(() => useAccountQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Server error');
  });
});
