import React, { useRef, useState } from 'react';
import { Linking, StyleSheet, TextInput, View } from 'react-native';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SigninFormValues,
  SignupFormValues,
  signinSchema,
  signupSchema,
} from '@features/auth/forms/authSchemas';
import { TextInputField } from '@ui/TextInputField';
import { Checkbox } from '@ui/Checkbox';
import { Button } from '@ui/Button';
import { Text } from '@ui/Text';
import { COLORS } from '@shared/constants/colors';

export type AuthMode = 'signup' | 'signin';

type Props = {
  mode: AuthMode;
  onSubmitSignup: (values: SignupFormValues) => void;
  onSubmitSignin: (values: SigninFormValues) => void;
  toggleMode: () => void;
  loading?: boolean;
};

export const AuthForm: React.FC<Props> = ({
  mode,
  onSubmitSignin,
  onSubmitSignup,
  loading,
  toggleMode,
}) => {
  const isSignup = mode === 'signup';

  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const [passwordSecure, setPasswordSecure] = useState<boolean>(true);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      acceptedTerms: false,
    },
  });

  const signinForm = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const form: UseFormReturn<any> = isSignup ? signupForm : signinForm;
  const { watch, setValue, handleSubmit, formState } = form;
  const { errors } = formState;

  const acceptedTerms = isSignup ? Boolean(watch('acceptedTerms')) : true;

  const openTerms = (): void => {
    void Linking.openURL('https://www.google.com/search?q=terms+of+service');
  };

  const openPrivacy = (): void => {
    void Linking.openURL('https://www.google.com/search?q=privacy+policy');
  };

  const submitHandler = isSignup
    ? handleSubmit((values) => onSubmitSignup(values))
    : handleSubmit((values) => onSubmitSignin(values));

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {isSignup && (
          <TextInputField
            ref={nameRef}
            label="Name"
            placeholder="Louis Real"
            returnKeyType="next"
            autoCapitalize="words"
            autoCorrect={false}
            onSubmitEditing={() => emailRef.current?.focus()}
            onBlur={() => setValue('name', watch('name'), { shouldValidate: true })}
            onChangeText={(text) => setValue('name', text, { shouldValidate: false })}
            errorMessage={errors.name?.message as string}
          />
        )}

        <TextInputField
          ref={emailRef}
          label="Email"
          placeholder="email@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          onBlur={() => setValue('email', watch('email'), { shouldValidate: true })}
          onChangeText={(text) => setValue('email', text, { shouldValidate: false })}
          errorMessage={errors.email?.message as string}
        />

        <TextInputField
          ref={passwordRef}
          label="Password"
          placeholder="••••••••"
          secureTextEntry={passwordSecure}
          secureToggle={true}
          isSecure={passwordSecure}
          onToggleSecure={() => setPasswordSecure((prev) => !prev)}
          returnKeyType="done"
          onSubmitEditing={submitHandler}
          onBlur={() => setValue('password', watch('password'), { shouldValidate: true })}
          onChangeText={(text) => setValue('password', text, { shouldValidate: false })}
          errorMessage={errors.password?.message as string}
        />

        {isSignup && (
          <View style={styles.termsRow}>
            <Checkbox
              checked={acceptedTerms}
              onToggle={() => setValue('acceptedTerms', !acceptedTerms, { shouldValidate: true })}
            />
            <Text variant="caption" style={styles.termsText}>
              By signing up, you agree to the{' '}
              <Text variant="caption" color={COLORS.primary} onPress={openTerms}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text variant="caption" color={COLORS.primary} onPress={openPrivacy}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        )}

        {isSignup && errors.acceptedTerms && (
          <Text variant="caption" color={COLORS.error} style={{ marginBottom: 8 }}>
            {errors.acceptedTerms.message as string}
          </Text>
        )}
      </View>

      <View style={styles.switchRow}>
        <Text variant="body">
          {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
        </Text>
        <Text variant="body" onPress={toggleMode} color={COLORS.primary}>
          {mode === 'signup' ? 'Sign in' : 'Sign up'}
        </Text>
      </View>

      <Button
        label={isSignup ? 'Create account' : 'Sign in'}
        onPress={submitHandler}
        loading={loading}
        disabled={!acceptedTerms || loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});