import { apiClient } from '@shared/api/client';
import { SignupPayload, SignupResponse } from '../types';

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>('/signup', payload);
  return response.data;
};

