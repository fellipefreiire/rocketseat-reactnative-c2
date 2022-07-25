import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styled'

interface InputProps extends TextInputProps {
  active?: boolean
}

export function Input({ active = false, ...rest }: InputProps) {
  return (
    <S.Container active={active} {...rest} />
  )
}