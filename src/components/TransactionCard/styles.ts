import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather, AntDesign } from '@expo/vector-icons'
import styled from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface colorsProps {
    type: 'positive' | 'negative';
}

export const Container = styled.View`
background-color: ${({ theme}) => theme.colors.shape};
border-radius: 5px;

padding: 17px 24px;

margin-bottom: 16px;
`;

export const Header = styled.View`
justify-content: space-between;
flex-direction: row;
`
export const Collun = styled.View`
flex-direction: column;
flex: 1;
`

export const Title = styled.Text`
font-family: ${({ theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;

`;

export const Amount = styled.Text<colorsProps>`
font-family: ${({ theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
margin-top: 2px;
color: ${({ theme, type }) => type === 'positive' ? theme.colors. success : theme.colors.attencion};
`
export const Footer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;

margin-top: 19px;
`

export const Categories = styled.View`
flex-direction: row;
align-items: center;
`
export const IconClose = styled(AntDesign)`
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.colors.text};
`

export const IconButton = styled(RectButton)``
export const Icon = styled(Feather)<colorsProps>`
flex: 1;
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.colors.text};
`

export const CategoryNames = styled.Text<colorsProps>`
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.text};

margin-left: 17px;
`

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({ theme}) => theme.colors.text};
`

