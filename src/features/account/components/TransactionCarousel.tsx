import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Transaction } from '@features/account/types';
import { Text } from '@ui/Text';
import { formatCurrency } from '@utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@shared/constants/colors';

type Props = {
  transactions: Transaction[];
};

const ITEMS_PER_CARD = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const TransactionCarousel: React.FC<Props> = ({ transactions }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const transactionGroups: Transaction[][] = [];
  for (let i = 0; i < transactions.length; i += ITEMS_PER_CARD) {
    transactionGroups.push(transactions.slice(i, i + ITEMS_PER_CARD));
  }

  const totalCards = transactionGroups.length;

  const canGoPrev = cardIndex > 0;
  const canGoNext = cardIndex < totalCards - 1;

  const goToCard = (next: number) => {
    if (next < 0 || next >= totalCards) return;
    setCardIndex(next);
    flatListRef.current?.scrollToOffset({ offset: next * SCREEN_WIDTH, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="body" style={styles.title}>
          Recent Transactions
        </Text>
        <View style={styles.arrowRow}>
          {canGoPrev && (
            <TouchableOpacity onPress={() => goToCard(cardIndex - 1)} style={styles.arrowBtn}>
              <Ionicons name="chevron-back" size={18} color={COLORS.subtext} />
            </TouchableOpacity>
          )}
          {canGoNext && (
            <TouchableOpacity onPress={() => goToCard(cardIndex + 1)} style={styles.arrowBtn}>
              <Ionicons name="chevron-forward" size={18} color={COLORS.subtext} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={transactionGroups}
        keyExtractor={(_, i) => `card-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: SCREEN_WIDTH - 80 }]}>
            {item.map((tx: Transaction, idx: number) => (
              <TransactionItem key={idx} transaction={tx} />
            ))}
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCardIndex(newIndex);
        }}
      />
    </View>
  );
};

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const amountLabel = formatCurrency(transaction.amount, 'NGN');
  const amountColor = transaction.amount >= 0 ? COLORS.success : COLORS.text;

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text variant="button" style={styles.name}>
          {transaction.name}
        </Text>
        <Text variant="caption" color={COLORS.subtext}>
          {transaction.bank} {transaction.time}
        </Text>
      </View>
      <Text variant="body" style={[styles.amount, { color: amountColor }]}>
        {amountLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
  },
  arrowRow: {
    flexDirection: 'row',
  },
  arrowBtn: {
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  card: {
    marginRight: 12,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemLeft: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  amount: {
    fontWeight: '600',
  },
});