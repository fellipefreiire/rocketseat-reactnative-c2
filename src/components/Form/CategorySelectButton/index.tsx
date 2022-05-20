import React from 'react'
import * as S from './styled'

interface ICategorySelectButtonProps {
  title: string
  onPress: () => void
}

export function CategorySelectButton({
  title,
  onPress
}: ICategorySelectButtonProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>
        {title}
      </S.Category>
      <S.Icon name='chevron-down' />
    </S.Container>
  )
}