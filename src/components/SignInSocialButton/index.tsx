import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
import * as S from './styled'

interface ISignInSocialButtonProps extends TouchableOpacityProps {
  title: string
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: ISignInSocialButtonProps) {
  return (
    <S.Button
      {...rest}
    >
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>
        {title}
      </S.Text>
    </S.Button>
  )
}