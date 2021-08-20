import { TextInput, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";



export const Container  = styled(RectButton).attrs({
  activeOpacity: 0.7
})`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 16px 18px;

background-color: ${({ theme}) => theme.colors.shape};
margin-top: 16px;

`


export const Category  = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
color: ${({ theme }) => theme.colors.text};
font-size:  ${RFValue(14)}px;
`


export const Icon  = styled(Feather)`
color: ${({ theme }) => theme.colors.text};
font-size:  ${RFValue(20)}px;
`