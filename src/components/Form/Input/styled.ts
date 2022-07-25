import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface Props {
  active: boolean
}

export const Container = styled.TextInput<Props>`
  width: 100%;
  padding: 16px;

  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme: { colors } }) => colors.text_dark};
  background-color: ${({ theme: { colors } }) => colors.shape};

  border-radius: 5px;
  margin-bottom: 8px;

  ${({ active, theme: { colors } }) => active && css`
    border-width: 3px;
    border-color: ${colors.attention};
  `}
`