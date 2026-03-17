import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '../useAuth';
import * as authService from '../../services/authService';
import * as credentialsStorage from '../../services/credentialsStorage';
import { SignupPayload, SignupResponse } from '../../types';

jest.mock('../../services/authService');
jest.mock('../../services/credentialsStorage');

const mockSignup = authService.signup as jest.MockedFunction<typeof authService.signup>;
const mockSaveCredentials = credentialsStorage.saveBasicAuthCredentials as jest.MockedFunction<
  typeof credentialsStorage.saveBasicAuthCredentials
>;

const mockPayload: SignupPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret123',
};

const mockResponse: SignupResponse = {
  message: 'User signup successful!',
  nextStep: 'Get account details from /interview/account endpoint.',
  basicAuthCredentials: {
    username: 'user',
    password: 'civitta',
  },
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: 0 },
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

describe('useAuth', () => {
  it('exposes signupMutation', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });
    expect(result.current.signupMutation).toBeDefined();
    expect(typeof result.current.signupMutation.mutate).toBe('function');
  });

  it('calls signup service with correct payload on mutate', async () => {
    mockSignup.mockResolvedValueOnce(mockResponse);
    mockSaveCredentials.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    act(() => {
      result.current.signupMutation.mutate(mockPayload);
    });

    await waitFor(() => {
      expect(result.current.signupMutation.isSuccess).toBe(true);
    });

    expect(mockSignup).toHaveBeenCalledWith(mockPayload);
  });

  it('calls saveBasicAuthCredentials with credentials from response', async () => {
    mockSignup.mockResolvedValueOnce(mockResponse);
    mockSaveCredentials.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    act(() => {
      result.current.signupMutation.mutate(mockPayload);
    });

    await waitFor(() => {
      expect(result.current.signupMutation.isSuccess).toBe(true);
    });

    expect(mockSaveCredentials).toHaveBeenCalledWith(
      mockResponse.basicAuthCredentials,
    );
  });

  it('sets mutation to error state when signup fails', async () => {
    const error = new Error('Signup failed');
    mockSignup.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    act(() => {
      result.current.signupMutation.mutate(mockPayload);
    });

    await waitFor(() => {
      expect(result.current.signupMutation.isError).toBe(true);
    });

    expect(result.current.signupMutation.error?.message).toBe('Signup failed');
  });

  it('starts in idle state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });
    expect(result.current.signupMutation.isPending).toBe(false);
    expect(result.current.signupMutation.isSuccess).toBe(false);
    expect(result.current.signupMutation.isError).toBe(false);
  });
});
