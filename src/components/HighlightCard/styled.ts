import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface ITypeProps {
  type: 'up' | 'down' | 'total'
}

export const Container = styled.View<ITypeProps>`
  background-color: ${({ type, theme: { colors } }) =>
    type === 'total' ? colors.secondary : colors.shape};

  width: ${RFValue(338)}px;
  border-radius: 5px;
  padding: 16px 24px 48px;
  margin-right: 16px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text<ITypeProps>`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ type, theme: { colors } }) =>
    type === 'total' ? colors.shape : colors.text_dark};
`

//@ts-ignore
export const Icon = styled(Feather) <ITypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'up' && css`
    color: ${({ theme: { colors } }) => colors.success};
  `}

  ${({ type }) => type === 'down' && css`
    color: ${({ theme: { colors } }) => colors.attention};
  `}

  ${({ type }) => type === 'total' && css`
    color: ${({ theme: { colors } }) => colors.shape};
  `}
`

export const Content = styled.View``

export const Amount = styled.Text<ITypeProps>`
  margin-top: 40px;

  font-family: ${({ theme: { fonts } }) => fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ type, theme: { colors } }) =>
    type === 'total' ? colors.shape : colors.text_dark};
`

export const LastTransaction = styled.Text<ITypeProps>`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ type, theme: { colors } }) =>
    type === 'total' ? colors.shape : colors.text};
`
