export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  message: string;
  nextStep: string;
  basicAuthCredentials: {
    username: string;
    password: string;
  };
};

