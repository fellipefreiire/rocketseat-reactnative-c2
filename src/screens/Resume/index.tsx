import AsyncStorage from '@react-native-async-storage/async-storage'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { addMonths, format, subMonths } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { VictoryPie } from 'victory-native'
import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'

import * as S from './styled'

export interface ITransactionCardData {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface ICategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([])
  const { colors } = useTheme()

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []


    const expenses = responseFormatted
      .filter((expense: ITransactionCardData) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
      )

    const expensesTotal = expenses.reduce((acc: number, expense: ITransactionCardData) => {
      return acc + Number(expense.amount)
    }, 0)

    const totalByCategory: ICategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: ITransactionCardData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>
      {
        isLoading ?
          <S.LoadContainer>
            <ActivityIndicator color={colors.primary} size='large' />
          </S.LoadContainer>
          :
          <S.Content
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight()
            }}
          >

            <S.MonthSelect>
              <S.MonthSelectButton onPress={() => handleDateChange('prev')}>
                <S.MonthSelectIcon name='chevron-left' />
              </S.MonthSelectButton>

              <S.Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </S.Month>

              <S.MonthSelectButton onPress={() => handleDateChange('next')}>
                <S.MonthSelectIcon name='chevron-right' />
              </S.MonthSelectButton>
            </S.MonthSelect>
            <S.ChartContainer>
              {/* @ts-ignore */}
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: colors.shape
                  }
                }}
                labelRadius={50}
                x='percent'
                y='total'
              />
            </S.ChartContainer>
            {totalByCategories.map(item => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))}
          </S.Content>
      }
    </S.Container>
  )
}