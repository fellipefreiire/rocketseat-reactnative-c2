import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
`

export const Error = styled.Text`
  color: ${({ theme: { colors } }) => colors.attention};
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;
`