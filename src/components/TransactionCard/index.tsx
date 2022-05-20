import React from 'react'
import * as S from './styled'

interface Category {
  name: string
  icon: string
}

export interface ITransactionCardData {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: Category
  date: string
}

interface ITransactionCardProps {
  data: ITransactionCardData
}

export function TransactionCard({
  data
}: ITransactionCardProps) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>

      <S.Amount type={data.type}>
        R$ {data.type === 'negative' && '- '}{data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={data.category.icon} />
          <S.CategoryName>{data.category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{data.date}</S.Date>
      </S.Footer>

    </S.Container>
  )
}