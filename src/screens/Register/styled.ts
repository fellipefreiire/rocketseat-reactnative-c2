import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.background};
`

export const Header = styled.View`
  background-color: ${({ theme: { colors } }) => colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
`

export const Title = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme: { colors } }) => colors.shape};
`

export const Form = styled.View`
  flex: 1;

  width: 100%;
  padding: 24px;
  
  justify-content: space-between;
`

export const Fields = styled.View``

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`