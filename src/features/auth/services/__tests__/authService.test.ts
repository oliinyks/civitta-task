import { signup } from '../authService';
import { apiClient } from '@shared/api/client';
import { SignupPayload, SignupResponse } from '../../types';

jest.mock('@shared/api/client', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signup', () => {
  it('calls apiClient.post with correct endpoint and payload', async () => {
    mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });
    await signup(mockPayload);
    expect(mockApiClient.post).toHaveBeenCalledWith('/signup', mockPayload);
  });

  it('returns response data on success', async () => {
    mockApiClient.post.mockResolvedValueOnce({ data: mockResponse });
    const result = await signup(mockPayload);
    expect(result).toEqual(mockResponse);
  });

  it('throws when apiClient.post rejects', async () => {
    const error = new Error('Network error');
    mockApiClient.post.mockRejectedValueOnce(error);
    await expect(signup(mockPayload)).rejects.toThrow('Network error');
  });

  it('propagates API error with status code', async () => {
    const apiError = Object.assign(new Error('Request failed with status 400'), {
      response: { status: 400, data: { message: 'Bad request' } },
    });
    mockApiClient.post.mockRejectedValueOnce(apiError);
    await expect(signup(mockPayload)).rejects.toThrow('Request failed with status 400');
  });
});
