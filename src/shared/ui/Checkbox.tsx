import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@shared/constants/colors';

type Props = {
  checked: boolean;
  onToggle: () => void;
};

export const Checkbox: React.FC<Props> = ({ checked, onToggle }) => {

  return (
    <TouchableOpacity onPress={onToggle} style={styles.touch} activeOpacity={0.8}>
      <View
        style={[
          styles.box,
          checked && {
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
          },
        ]}
      >
        {checked && <Ionicons name="checkmark" size={14} color={COLORS.card} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    paddingRight: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
});

