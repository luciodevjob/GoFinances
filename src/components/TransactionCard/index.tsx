import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';
import { Amount, Container, Title, Footer, Categories, Icon, CategoryNames, Date, IconClose, Header, Collun, IconButton} from './styles';

interface Categories {
    name: string;
    icon: string;
}
export interface TransactionsProps {
    id: string;
    type: "positive" | "negative";
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface Props extends RectButtonProps {
    data: TransactionsProps;


}

export function TransactionCard({data, ...rest}: Props) {
  const [category] = categories.filter(
      item => item.key === data.category
  );
    
    return (
    <Container>
        <Header>
        <Collun>
        <Title>{data.name}</Title>

        <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
        </Amount>
        </Collun>

        <IconButton 
        {...rest}>
        <IconClose name={"close"}/>
        </IconButton>

        </Header>
        <Footer>
            <Categories>
            <Icon name={category.icon}/>
            <CategoryNames type={data.type}>
                {category.name}
            </CategoryNames>
            </Categories>
            <Date>{data.date}</Date>

        </Footer>
    </Container>
    )

}