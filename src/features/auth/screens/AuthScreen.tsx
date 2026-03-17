import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@shared/types/navigation.types';
import { ScreenContainer } from '@ui/ScreenContainer';
import { Text } from '@ui/Text';
import { AuthForm, AuthMode } from '@features/auth/components/AuthForm';
import { useAuth } from '@features/auth/hooks/useAuth';
import { SignupFormValues, SigninFormValues } from '@features/auth/forms/authSchemas';
import { COLORS } from '@shared/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const { signupMutation } = useAuth();

  const handleSubmitSignup = (values: SignupFormValues): void => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        navigation.replace('Account');
      },
      onError: (error: Error) => {
        Alert.alert('Signup failed', error.message ?? 'Unknown error');
      },
    });
  };

  const handleSubmitSignin = (_values: SigninFormValues): void => {
    navigation.replace('Account');
  };

  const toggleMode = (): void => {
    setMode((prev) => (prev === 'signup' ? 'signin' : 'signup'));
  };

  const showBack = navigation.canGoBack();

  return (
    <ScreenContainer type='form'>
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color={COLORS.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
      </View>

      <Text variant="title" style={styles.title} color={COLORS.primary}>
        {mode === 'signup' ? 'Create account' : 'Sign in'}
      </Text>

      <Text variant="subtitle" style={styles.subtitle} color={COLORS.subtext}>
        {mode === 'signup' ? 'Complete the sign up to get started' : 'Sign in to your account'}
      </Text>

      <View style={styles.formContainer}>
        <AuthForm
          mode={mode}
          onSubmitSignup={handleSubmitSignup}
          onSubmitSignin={handleSubmitSignin}
          loading={signupMutation.isPending}
          toggleMode={toggleMode}
        />
      </View>

    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: COLORS.card,
    borderRadius: 999,
    padding: 8,
  },
  backPlaceholder: {
    width: 32,
    height: 32,
  },
  title: {
    marginTop: 30,
    marginBottom: 8,
    fontSize: 32
  },
  subtitle: {
    marginBottom: 24,
  },
  formContainer: {
    flexGrow: 1,
  },
});

