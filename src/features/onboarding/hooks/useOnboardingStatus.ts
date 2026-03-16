import { useEffect, useState } from 'react';
import {
  getOnboardingCompleted,
  setOnboardingCompleted,
} from '@features/onboarding/services/storage';

type UseOnboardingStatusResult = {
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  markCompleted: () => Promise<void>;
};

export const useOnboardingStatus = (): UseOnboardingStatusResult => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        const completed = await getOnboardingCompleted();
        setHasCompletedOnboarding(completed);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const markCompleted = async (): Promise<void> => {
    await setOnboardingCompleted();
    setHasCompletedOnboarding(true);
  };

  return { hasCompletedOnboarding, isLoading, markCompleted };
};

