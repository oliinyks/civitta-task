import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View, Image, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/types/navigation.types';
import { ScreenContainer } from '@ui/ScreenContainer';
import { Text } from '@ui/Text';
import { Button } from '@ui/Button';
import { useOnboardingStatus } from '@features/onboarding/hooks/useOnboardingStatus';
import { COLORS } from '@shared/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const TOTAL_STEPS = 4;
const ONBOARDING_STEPS = [
  {
    title: 'You ought to know where your money goes',
    subtitle: 'Get an overview of how you are performing and motivate yourself to achieve even more.',
  },
  {
    title: 'Track your spending easily',
    subtitle: 'See where your money is going every day and make better financial decisions.',
  },
  {
    title: 'Set goals and save',
    subtitle: 'Create saving goals and track your progress in a simple way.',
  },
  {
    title: 'Achieve financial freedom',
    subtitle: 'Stay motivated and reach your financial goals faster.',
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const indicatorPosition = useSharedValue(0);
  const { markCompleted } = useOnboardingStatus();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const animateToStep = (nextIndex: number): void => {
    indicatorPosition.value = withTiming(nextIndex, { duration: 250 });
  };

  const completeOnboarding = async () => {
    await markCompleted();
    navigation.replace('Auth');
  };

  const handleNext = useCallback(async () => {
    if (stepIndex < TOTAL_STEPS - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      animateToStep(next);
      return;
    }
    await completeOnboarding();
  }, [completeOnboarding, stepIndex]);

  const handleBack = useCallback(() => {
    if (stepIndex === 0) return;
    const prev = stepIndex - 1;
    setStepIndex(prev);
    animateToStep(prev);
  }, [stepIndex]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value * 14 }],
  }));

  return (
    <ScreenContainer>
      <Pressable style={[styles.skipRow, { backgroundColor: COLORS.card }]} onPress={completeOnboarding}>
        <Text variant="body" style={{ color: COLORS.text }}>
          Skip
        </Text>
      </Pressable>

      <View style={styles.heroContainer}>
        <Image
          source={require('../../../../assets/images/oboarding-schedule.png')}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH * 0.6,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View>
          <Text variant="title" style={styles.title}>
            {ONBOARDING_STEPS[stepIndex].title}
          </Text>
          <Text variant="subtitle" style={styles.description}>
            {ONBOARDING_STEPS[stepIndex].subtitle}
          </Text>

        </View>
        <View style={styles.pagerRow}>
          <View style={styles.indicators}>
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <View key={index} style={[styles.indicatorDot, stepIndex === index && { opacity: 0 },]} />
            ))}
            <Animated.View style={[styles.indicatorActive, progressStyle]} />
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Button label="Next" onPress={handleNext} style={styles.nextButton} />
          {stepIndex >= 1 ? (
            <Text variant="body" style={styles.backText} onPress={handleBack}>
              Back
            </Text>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  skipRow: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    zIndex: 1
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: 260,
    height: 260,
    borderRadius: 40,
  },
  content: {
    minHeight: 335,
    marginBottom: 16,
    borderRadius: 48,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
    backgroundColor: COLORS.card
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.primary
  },
  description: {
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.subtext
  },
  pagerRow: {
    alignItems: 'center',
    marginBottom: 24,
  },
  indicators: {
    flexDirection: 'row',
    position: 'relative',
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginHorizontal: 4,
    backgroundColor: COLORS.placeholder,
  },
  indicatorActive: {
    width: 6,
    height: 18,
    borderRadius: 999,
    position: 'absolute',
    left: 4,
    top: -6,
    backgroundColor: COLORS.primary
  },
  actionsRow: {
    marginBottom: 8,
  },
  backText: {
    alignSelf: 'center',
  },
  backPlaceholder: {
  },
  nextButton: {
    marginBottom: 10,
  },
});
