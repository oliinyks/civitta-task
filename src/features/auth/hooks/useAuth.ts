import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../services/authService';
import {
  saveBasicAuthCredentials,
} from '../services/credentialsStorage';
import { SignupPayload, SignupResponse } from '../types';

type UseAuthResult = {
  signupMutation: ReturnType<typeof useMutation<SignupResponse, Error, SignupPayload>>;
};

export const useAuth = (): UseAuthResult => {
  const queryClient = useQueryClient();

  const signupMutation = useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: async (payload) => {
      const response = await signup(payload);
      await saveBasicAuthCredentials(response.basicAuthCredentials);
      await queryClient.invalidateQueries({ queryKey: ['account'] });
      return response;
    },
  });

  return {
    signupMutation,
  };
};

