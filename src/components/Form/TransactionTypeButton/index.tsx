import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import * as S from './styled'

interface ITransactionTypeButtonProps extends TouchableOpacityProps {
  title: string
  type: 'up' | 'down'
  isActive: boolean
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: ITransactionTypeButtonProps) {
  return (
    <S.Container
      isActive={isActive}
      type={type}
      {...rest}
    >
      <S.Icon
        name={icons[type]}
        type={type}
      ></S.Icon>
      <S.Title>{title}</S.Title>

    </S.Container>
  )
}