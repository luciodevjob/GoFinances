import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { 
  parseISO, 
  format, 
  formatRelative, 
  formatDistance,
  isAfter,
} from 'date-fns';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionsProps } from '../../components/TransactionCard';
import { Container, Header, HighlightCards, Icon, Photo, User, UserContainer, UserGreeting, UserInfo, UserName, Transition, Title, TransactionList, LougoutButton } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export interface DataListProps extends TransactionsProps {
    id: string;
}
export function Dashboard() {

    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions(){
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];
  
      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
  
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
  
      
        
        
       /*
        const formattedDate = format(new Date(), 'dd/MM/yyyy')
        const date = String(formattedDate) 
       */
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

          console.log(item.type)
          console.log(item.date)
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      
    
      } );
  
      setData(transactionsFormatted);
    
  
    }
  
    useEffect(() => {
      loadTransactions();
    },[]);
    return (
        <Container>
            <Header>
                <UserContainer>
                <UserInfo>
                    <Photo 
                        source= {{uri: 'https://avatars.githubusercontent.com/u/79321204?v=4'}}
                    />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>Lucio</UserName>
                    </User>
                
                    
                </UserInfo>
                <LougoutButton>
                <Icon name="power"/>
                </LougoutButton>
                </UserContainer>
                
            </Header>
            <HighlightCards>
                <HighlightCard 
                type= {'up'}
                title= {'Entradas'} 
                amount={'R$ 17.400,00'} 
                lastTransition= {'Última entrada dia 13 de abril'}
                />

                 <HighlightCard 
                type= {'down'}
                title= {'Saidas'} 
                amount={'R$ 1.259,00'} 
                lastTransition= {'Última saída dia 03 de abril'}
                /> 
                
                <HighlightCard 
                type= {'total'}
                title= {'Total'} 
                amount={'R$ 16.141,00'} 
                lastTransition= {'01 à 16 de abril'}
                />
              
            </HighlightCards>
            <Transition>
                <Title>Listagem</Title>
                <TransactionList
                data={data}
                keyExtractor= {item => item.id}
                renderItem={({item}) => <TransactionCard 
                data={item}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: getBottomSpace()
                }}
                />
                
            </Transition>
        </Container>
    )
}


