import React from 'react';
import { categories } from '../../utils/categories';
import { Amount, Container, Title, Footer, Categories, Icon, CategoryNames, Date} from './styles';

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
interface Props {
    data: TransactionsProps 

}

export function TransactionCard({data}: Props) {
  const [category] = categories.filter(
      item => item.key === data.category
  );
    
    return (
    <Container>
        <Title>{data.name}</Title>

        <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
        </Amount>
        

        <Footer>
            <Categories>
            <Icon type={data.type} 
            name={category.icon}/>
            <CategoryNames type={data.type}>{category.name}</CategoryNames>
            </Categories>
            <Date>{data.date}</Date>

        </Footer>
    </Container>
    )

}