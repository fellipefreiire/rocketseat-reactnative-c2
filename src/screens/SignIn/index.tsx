import React, { useState } from 'react'
import * as S from './styled'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { useAuth } from '../../hooks/auth'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { useTheme } from 'styled-components'

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível conectar com a Google')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      await signInWithApple()
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível conectar com a Apple')
      setIsLoading(false)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(120)}
          />

          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </S.FooterWrapper>
      </S.Footer>

      {isLoading &&
        <ActivityIndicator color={colors.shape} style={{ marginTop: 16 }} />
      }
    </S.Container>
  )
}