import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { RootStackParamList } from '@shared/types/navigation.types';
import { OnboardingScreen } from '@features/onboarding/screens/OnboardingScreen';
import { AuthScreen } from '@features/auth/screens/AuthScreen';
import { AccountScreen } from '@features/account/screens/AccountScreen';
import { useOnboardingStatus } from '@features/onboarding/hooks/useOnboardingStatus';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { hasCompletedOnboarding, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const initialRouteName: keyof RootStackParamList = hasCompletedOnboarding
    ? 'Auth'
    : 'Onboarding';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!hasCompletedOnboarding && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

