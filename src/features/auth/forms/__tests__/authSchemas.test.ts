import { signupSchema, signinSchema } from '../authSchemas';

const validSignupData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secret123',
  acceptedTerms: true,
};

const validSigninData = {
  email: 'john@example.com',
  password: 'secret123',
};

describe('signupSchema', () => {
  it('passes with valid data', () => {
    expect(() => signupSchema.parse(validSignupData)).not.toThrow();
  });

  it('returns correct parsed values for valid data', () => {
    const result = signupSchema.parse(validSignupData);
    expect(result).toEqual(validSignupData);
  });

  it('fails when name is empty', () => {
    const result = signupSchema.safeParse({ ...validSignupData, name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find((i) => i.path[0] === 'name');
      expect(nameError?.message).toBe('Name is required');
    }
  });

  it('fails when email is invalid', () => {
    const result = signupSchema.safeParse({ ...validSignupData, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path[0] === 'email');
      expect(emailError?.message).toBe('Enter a valid email');
    }
  });

  it('fails when password is shorter than 6 characters', () => {
    const result = signupSchema.safeParse({ ...validSignupData, password: '12345' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
      expect(passwordError?.message).toBe('Password must be at least 6 characters');
    }
  });

  it('fails when acceptedTerms is false', () => {
    const result = signupSchema.safeParse({ ...validSignupData, acceptedTerms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      const termsError = result.error.issues.find((i) => i.path[0] === 'acceptedTerms');
      expect(termsError?.message).toBe('You must accept the terms to continue');
    }
  });

  it('fails when required fields are missing', () => {
    const result = signupSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('accepts password of exactly 6 characters', () => {
    const result = signupSchema.safeParse({ ...validSignupData, password: '123456' });
    expect(result.success).toBe(true);
  });
});

describe('signinSchema', () => {
  it('passes with valid data', () => {
    expect(() => signinSchema.parse(validSigninData)).not.toThrow();
  });

  it('returns correct parsed values for valid data', () => {
    const result = signinSchema.parse(validSigninData);
    expect(result).toEqual(validSigninData);
  });

  it('fails when email is invalid', () => {
    const result = signinSchema.safeParse({ ...validSigninData, email: 'bad-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path[0] === 'email');
      expect(emailError?.message).toBe('Enter a valid email');
    }
  });

  it('fails when password is shorter than 6 characters', () => {
    const result = signinSchema.safeParse({ ...validSigninData, password: 'abc' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) => i.path[0] === 'password');
      expect(passwordError?.message).toBe('Password must be at least 6 characters');
    }
  });

  it('fails when email is missing', () => {
    const result = signinSchema.safeParse({ password: 'secret123' });
    expect(result.success).toBe(false);
  });

  it('fails when password is missing', () => {
    const result = signinSchema.safeParse({ email: 'john@example.com' });
    expect(result.success).toBe(false);
  });
});
