import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, ITransactionCardData } from '../../components/TransactionCard'
import { useAuth } from '../../hooks/auth';
import * as S from './styled'

export interface DataListProps extends ITransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightCardData, setHighlightCardData] = useState<HighlightData>({} as HighlightData)

  const { signOut, user } = useAuth()
  const { colors } = useTheme()
  const dataKey = `@gofinance:transactions_user:${user.id}`

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection
      .filter((transaction) => transaction.type === type)

    if (collectionFiltered.length === 0) {
      return 0
    }

    const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
      .map((transaction) => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransaction() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entries = 0;
    let expenses = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entries += Number(item.amount)
        } else {
          expenses += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      })

    setTransactions(transactionsFormatted)

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative')
    const totalInterval = lastTransactionExpenses === 0
      ? 'Não há movimentações'
      : `01 a ${lastTransactionExpenses}`

    setHighlightCardData({
      entries: {
        amount: entries.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0
          ? 'Não há transações'
          : `Última entrada dia ${lastTransactionEntries}`,
      },
      expenses: {
        amount: expenses.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpenses === 0
          ? 'Não há transações'
          : `Última entrada saída ${lastTransactionExpenses}`,
      },
      total: {
        amount: (entries - expenses).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction()
  }, []))

  return (
    <S.Container>
      {
        isLoading ?
          <S.LoadContainer>
            <ActivityIndicator color={colors.primary} size='large' />
          </S.LoadContainer>
          :
          <>
            <S.Header>
              <S.UserWrapper>
                <S.UserInfo>
                  <S.Photo source={{ uri: user.photo }} />
                  <S.User>
                    <S.UserGreeting>Olá, </S.UserGreeting>
                    <S.UserName>{user.name}</S.UserName>
                  </S.User>
                </S.UserInfo>

                <S.LogoutButton onPress={signOut}>
                  <S.Icon name='power' />
                </S.LogoutButton>
              </S.UserWrapper>
            </S.Header>

            <S.HighlightCards>
              <HighlightCard
                type='up'
                title='Entradas'
                amount={highlightCardData?.entries?.amount}
                lastTransaction={highlightCardData?.entries?.lastTransaction}
              />
              <HighlightCard
                type='down'
                title='Saídas'
                amount={highlightCardData?.expenses?.amount}
                lastTransaction={highlightCardData?.expenses?.lastTransaction}
              />
              <HighlightCard
                type='total'
                title='Total'
                amount={highlightCardData?.total?.amount}
                lastTransaction={highlightCardData?.total?.lastTransaction}
              />
            </S.HighlightCards>

            <S.Transactions>
              <S.Title>Listagem</S.Title>

              <S.TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              >

              </S.TransactionList>
            </S.Transactions>
          </>
      }
    </S.Container>
  )
}
