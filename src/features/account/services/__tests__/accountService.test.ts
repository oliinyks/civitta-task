import { getAccount } from '../accountService';
import { apiClient } from '@shared/api/client';
import { Account } from '../../types';
import { BasicAuthCredentials } from '@features/auth/services/credentialsStorage';

jest.mock('@shared/api/client', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const mockCredentials: BasicAuthCredentials = {
  username: 'user',
  password: 'civitta',
};

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getAccount', () => {
  it('calls apiClient.get with the correct endpoint', async () => {
    mockApiClient.get.mockResolvedValueOnce({ data: mockAccount });
    await getAccount(mockCredentials);
    expect(mockApiClient.get).toHaveBeenCalledWith(
      '/interview/account',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringMatching(/^Basic /),
        }),
      }),
    );
  });

  it('sends a Base64-encoded Basic Auth header', async () => {
    mockApiClient.get.mockResolvedValueOnce({ data: mockAccount });
    await getAccount(mockCredentials);

    const callArgs = mockApiClient.get.mock.calls[0];
    const headers = (callArgs[1] as { headers: Record<string, string> }).headers;
    const authHeader = headers['Authorization'];

    const base64Part = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(base64Part, 'base64').toString('utf-8');
    expect(decoded).toBe(`${mockCredentials.username}:${mockCredentials.password}`);
  });

  it('returns the account data from the response', async () => {
    mockApiClient.get.mockResolvedValueOnce({ data: mockAccount });
    const result = await getAccount(mockCredentials);
    expect(result).toEqual(mockAccount);
  });

  it('throws when apiClient.get rejects', async () => {
    const error = new Error('Unauthorized');
    mockApiClient.get.mockRejectedValueOnce(error);
    await expect(getAccount(mockCredentials)).rejects.toThrow('Unauthorized');
  });
});
