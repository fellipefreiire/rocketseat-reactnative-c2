import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: ${({ theme: { colors } }) => colors.primary};

  justify-content: flex-end;
  align-items: center;
`

export const TitleWrapper = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  color: ${({ theme: { colors } }) => colors.shape};
  font-size: ${RFValue(30)}px;

  text-align: center;

  margin-top: 32px;
`

export const SignInTitle = styled.Text`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  color: ${({ theme: { colors } }) => colors.shape};
  font-size: ${RFValue(16)}px;

  text-align: center;

  margin-top: 60px;
  margin-bottom: 60px;
`

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({ theme: { colors } }) => colors.secondary};
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`