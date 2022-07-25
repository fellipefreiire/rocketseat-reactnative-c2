import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import * as S from './styled'

interface ICategorySelectButtonProps extends RectButtonProps{
  title: string
  onPress: () => void
}

export function CategorySelectButton({
  title,
  onPress,
  ...rest
}: ICategorySelectButtonProps) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Category>
        {title}
      </S.Category>
      <S.Icon name='chevron-down' />
    </S.Container>
  )
}