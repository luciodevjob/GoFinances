import React from 'react';

import {
    Container,
    Title,
    Icon,
    Header,
    Footer,
    Amount,
    LastTransition,

} from './styles';

interface HighlightCardProps {
    type: 'up' | 'down' | 'total'
    title: string;
    amount: string;
    lastTransition: string;
}

const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
}

export function HighlightCard({type, title, amount, lastTransition}: HighlightCardProps ) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type}></Icon>
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransition type={type}>{lastTransition}</LastTransition>
            </Footer>
        </Container>
    )
}