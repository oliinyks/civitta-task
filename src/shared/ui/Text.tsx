import { COLORS } from '@shared/constants/colors';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

export type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'button';

type Props = RNTextProps & {
  variant?: TextVariant;
  color?: string;
};

export const Text: React.FC<Props> = ({ variant = 'body', style, color, ...rest }) => {

  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        color ? { color } : null,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.text,
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  },
});

