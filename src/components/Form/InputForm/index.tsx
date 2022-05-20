import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { Input } from '../Input'
import * as S from './styled'

interface IInputFormProps extends TextInputProps {
  control: Control
  name: string
  error: string
}

export function InputForm({
  control,
  name,
  error,
  ...rest
}: IInputFormProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}