import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@shared/types/navigation.types';
import { ScreenContainer } from '@ui/ScreenContainer';
import { Text } from '@ui/Text';
import { useAccountQuery } from '@features/account/hooks/useAccountQuery';
import { TransactionCarousel } from '@features/account/components/TransactionCarousel';
import { formatBalance } from '@utils/formatters';
import { COLORS } from '@shared/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export const AccountScreen: React.FC<Props> = () => {
  const {
    data: account,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useAccountQuery();

  useEffect(() => {
    if (isError && error) {
      Alert.alert('Failed to load account', error.message);
    }
  }, [isError, error]);

  return (
    <ScreenContainer>
      <Text variant='button' style={styles.header}>
        My Account
      </Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading && !account ? (
          <View style={styles.center}>
            <ActivityIndicator color={COLORS.primary} />
          </View>
        ) : account ? (
          <>
            <Text variant="title" style={styles.bankName}>
              Kuda Bank
            </Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <Text variant="body" style={styles.label} color={COLORS.subtext}>
                  Type of account
                </Text>
                <Text variant="body">{account.accountType}</Text>
              </View>
              <View style={styles.row}>
                <Text variant="body" style={styles.label} color={COLORS.subtext}>
                  Account No
                </Text>
                <Text variant="body">{account.accountNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text variant="body" style={styles.label} color={COLORS.subtext}>
                  Available Balance
                </Text>
                <Text variant="body" style={styles.balance} color={COLORS.success}>
                  {formatBalance(account.availableBalance, account.currency)}
                </Text>
              </View>
              <View style={[styles.row, { marginBottom: 0 }]}>
                <Text variant="body" style={styles.label} color={COLORS.subtext}>
                  Date added
                </Text>
                <Text variant="body">{account.dateAdded}</Text>
              </View>
            </View>

            <TransactionCarousel transactions={account.transactions} />
          </>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  center: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
  },
  bankName: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
  },
  balance: {
    fontWeight: '600',
  },
});

