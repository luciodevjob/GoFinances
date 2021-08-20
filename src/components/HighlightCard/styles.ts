import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

interface typesProps  {
    type: 'up' | 'down' | 'total'
}

export const Container = styled.View<typesProps>`


width: ${RFValue(300)}px;
border-radius: 5px;
background-color: ${({ theme}) => theme.colors.shape};
padding: 19px 24px;
padding-bottom: ${RFValue(42)}px;
margin-right: 16px;

${({type}) => type === 'total' && css`
background-color: ${({ theme}) => theme.colors.secondary}
`}
`

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
`

export const Title = styled.Text<typesProps>`
font-size: ${RFValue(14)}px;
line-height: ${RFValue(21)}px;
font-family: ${({theme}) => theme.fonts.regular};
color: ${({ theme, type }) => 
type === 'total' ? theme.colors.shape : theme.colors.title};

`

export const Icon = styled(Feather)<typesProps>`
font-size: ${RFValue(33)}px;
${({type}) => type === 'up' && css`
color: ${({ theme }) => theme.colors.success}
`}

${({type}) => type === 'down' && css`
color: ${({ theme}) => theme.colors.attencion}
`}

${({type}) => type === 'total' && css`
color: ${({ theme}) => theme.colors.shape}
`}

`

export const Footer = styled.View``

export const Amount = styled.Text<typesProps>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(32)}px;
color: ${({ theme }) => theme.colors.title};
margin-top: 38px;
color: ${({ theme, type }) => 
type === 'total' ? theme.colors.shape : theme.colors.title};
`

export const LastTransition = styled.Text<typesProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(12)}px;

color: ${({ theme, type }) => 
type === 'total' ? theme.colors.shape : theme.colors.title};
`