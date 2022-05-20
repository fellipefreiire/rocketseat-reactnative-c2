import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TextInput`
  width: 100%;
  padding: 16px;

  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme: { colors } }) => colors.text_dark};
  background-color: ${({ theme: { colors } }) => colors.shape};

  border-radius: 5px;
  margin-bottom: 8px;
`