import { COLORS } from '@shared/constants/colors';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenType = 'default' | 'form';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  type?: ScreenType;
};

export const ScreenContainer: React.FC<Props> = ({
  children,
  style,
  type = 'default',
}) => {
  const insets = useSafeAreaInsets();

  if (type === 'form') {
    return (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={[
              {
                flexGrow: 1,
                paddingTop: insets.top + 8,
                paddingBottom: insets.bottom + 16,
                paddingHorizontal: 24,
                backgroundColor: COLORS.background,
              },
              style,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 24,
          backgroundColor: COLORS.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});