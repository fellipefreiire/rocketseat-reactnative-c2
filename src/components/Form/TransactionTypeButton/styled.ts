import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native'

interface IIconsProps {
  type: 'up' | 'down'
}

interface IContainerProps {
  isActive: boolean
  type: 'up' | 'down'
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme: { colors } }) => colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme: { colors } }) => colors.attention_light};
  `};

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme: { colors } }) => colors.success_light};
  `};
`

export const Title = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${RFValue(14)}px;
  `

//@ts-ignore
export const Icon = styled(Feather) <IIconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ type, theme: { colors } }) =>
    type === 'up' ? colors.success : colors.attention
  }
`