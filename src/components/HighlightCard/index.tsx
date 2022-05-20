import React from 'react'
import * as S from './styled'

interface IHighlightCardProps {
  type: 'up' | 'down' | 'total'
  title: string
  amount: string
  lastTransaction: string
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction
}: IHighlightCardProps) {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon name={icon[type]} type={type} />
      </S.Header>

      <S.Content>
        <S.Amount type={type}>R$ {amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Content>

    </S.Container>
  )
}