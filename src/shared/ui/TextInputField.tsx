import React, { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@shared/constants/colors';

export type TextInputFieldProps = TextInputProps & {
  label: string;
  errorMessage?: string;
  secureToggle?: boolean;
  isSecure?: boolean;
  onToggleSecure?: () => void;
};

export const TextInputField = forwardRef<TextInput, TextInputFieldProps>(
  ({ label, errorMessage, secureToggle, isSecure, onToggleSecure, style, ...rest }, ref) => {

    const showSecureToggle = Boolean(secureToggle && onToggleSecure);

    return (
      <View style={styles.container}>
        <Text variant="caption" style={styles.label} color={COLORS.subtext}>
          {label}
        </Text>
        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: COLORS.card, borderColor: COLORS.border },
            errorMessage && { borderColor: COLORS.error },
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, style, { color: COLORS.text }]}
            placeholderTextColor={COLORS.placeholder}
            {...rest}
          />
          {showSecureToggle && (
            <TouchableOpacity onPress={onToggleSecure} style={styles.secureToggle}>
              <Ionicons
                name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.subtext}
              />
            </TouchableOpacity>
          )}
        </View>
        {errorMessage ? (
          <Text variant="caption" style={styles.error} color={COLORS.error}>
            {errorMessage}
          </Text>
        ) : null}
      </View>
    );
  },
);

TextInputField.displayName = 'TextInputField';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 12,
    top: 6,
    fontSize: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  secureToggle: {
    marginTop: -10
  },
  error: {
    marginTop: 4,
  },
});

