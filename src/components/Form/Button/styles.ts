import { TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";



export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({ theme}) => theme.colors.secondary};

    padding:18px 0px;
    align-items: center;

    border-radius: 5px;
`

export const Title = styled.Text`
color: ${({ theme }) => theme.colors.shape};

font-family: ${({ theme }) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
`

