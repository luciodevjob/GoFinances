import { RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'



export const Container = styled.View`
    flex:1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
background-color: ${({theme}) => theme.colors.primary};
width: 100%;
height: ${RFValue(113)}px;

align-items: center;
justify-content: flex-end;
margin-bottom: 24px;

` 


export const Title = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
margin-bottom: 16px;
`

export const Form = styled.View`
flex:1;
width: 100%;
justify-content: space-between;
padding: 24px;
`

export const Fiels = styled.View`
`
export const TransactionContainer = styled.View`
flex-direction: row;
justify-content: space-between;

margin-top: 8px;
`