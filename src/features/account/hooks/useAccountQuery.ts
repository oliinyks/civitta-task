import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@features/account/services/accountService';
import { getBasicAuthCredentials } from '@features/auth/services/credentialsStorage';
import { Account } from '@features/account/types';

const ACCOUNT_QUERY_KEY = ['account'];

export const useAccountQuery = () => {
  return useQuery<Account, Error>({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: async () => {
      const credentials = await getBasicAuthCredentials();
      if (!credentials) {
        throw new Error('Missing credentials. Please sign up first.');
      }
      return getAccount(credentials);
    },
  });
};

