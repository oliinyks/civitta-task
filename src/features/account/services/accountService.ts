import { encode as encodeBase64 } from 'base-64';
import { apiClient } from '@shared/api/client';
import { Account } from '@features/account/types';
import { BasicAuthCredentials } from '@features/auth/services/credentialsStorage';

export const getAccount = async (
  credentials: BasicAuthCredentials,
): Promise<Account> => {
  const token = encodeBase64(`${credentials.username}:${credentials.password}`);
  const response = await apiClient.get<Account>('/interview/account', {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return response.data;
};

