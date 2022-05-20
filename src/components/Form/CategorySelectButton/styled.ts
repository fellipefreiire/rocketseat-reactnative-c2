import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background-color: ${({ theme: { colors } }) => colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  padding: 16px;
`

export const Category = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;
`

//@ts-ignore
export const Icon = styled(Feather)`
  font-size: ${RFValue(14)}px;
`