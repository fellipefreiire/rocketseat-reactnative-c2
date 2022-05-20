import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TransactionProps {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  background-color: ${({ theme: { colors } }) => colors.shape};
  border-radius: 5px;
  
  padding: 16px 24px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ type, theme: { colors } }) =>
    type === 'positive' ? colors.success : colors.attention};
  margin-top: 2px;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

//@ts-ignore
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme: { colors } }) => colors.text};
`

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme: { colors } }) => colors.text};

  margin-left: 16px;
`

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme: { colors } }) => colors.text};
`
