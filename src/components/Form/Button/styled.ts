import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.secondary};
  padding: 16px;
  border-radius: 5px;
  align-items: center;
  `

export const Title = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme: { colors } }) => colors.shape};
`