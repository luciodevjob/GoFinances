import React, { useCallback, useEffect, useState, } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { 
  parseISO, 
  format, 
} from 'date-fns';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionsProps } from '../../components/TransactionCard';
import { 
  Container, 
  Header, 
  HighlightCards, 
  Icon, 
  Photo, 
  User, 
  UserContainer, 
  UserGreeting, 
  UserInfo, 
  UserName, 
  Transition, 
  Title, 
  TransactionList, 
  LougoutButton,
  LoadContainer } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionsProps {
    id: string;
}
interface HighlightProps {
 amount: string;
 lastTransactions: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}
export function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [HighlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
    const theme = useTheme()
  
   
    function getLastTransactionDate(
      collection: DataListProps[],
      type: 'positive' | 'negative'
    ){
      const lastTransaction = new Date(
      Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())))
  
      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }
    const dataKey = '@gofinances:transactions';
    async function handleRemoveSkill(dataKey: string) {
     
        try {
            await AsyncStorage.removeItem(dataKey);
            return true;
        }
        catch(exception) {
            return false;
        }
    }
   

    async function loadTransactions(){
      
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0
      let expensiveTotal = 0
      
      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if(item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }
  
        let amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
  
        amount = amount.replace('R$', 'R$ ');
        
        
       /*
        const formattedDate = format(new Date(), 'dd/MM/yyyy')
        const date = String(formattedDate) 
       */
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

         
        return {
          id:String(item.id),
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      
        console.log(date)
    
      });
  
      setTransactions(transactionsFormatted);
      const lastTransactionsentries =  getLastTransactionDate(transactions, 'positive' )
      const lastTransactionsexpensive =  getLastTransactionDate(transactions, 'negative' )
      const totalInterval = `01 a ${lastTransactionsexpensive}`
     

      const total = entriesTotal - expensiveTotal
      setHighlightData(
       { 
        entries: { 
         amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),

          lastTransactions: lastTransactionsentries,
        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: lastTransactionsexpensive
       },
       total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: totalInterval
       }
    })

    setIsLoading(false)
    }
    useEffect(() => {
      loadTransactions();
    },[]);

    useFocusEffect(useCallback(() => {loadTransactions()}, []))
    return (
    
        <Container>
           {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
       
           <>
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
                amount={HighlightData.entries.amount} 
                lastTransition= {`Última entrada dia ${HighlightData.entries.lastTransactions}`}
                />

                 <HighlightCard 
                type= {'down'}
                title= {'Saidas'} 
                amount={HighlightData.expensives.amount} 
                lastTransition= {`Última entrada dia ${HighlightData.expensives.lastTransactions}`}
                /> 
                
                <HighlightCard 
                type= {'total'}
                title= {'Total'} 
                amount={HighlightData.total.amount} 
                lastTransition= {HighlightData.total.lastTransactions}
                />
              
            </HighlightCards>
            <Transition>
                <Title>Listagem</Title>
                <TransactionList
                data={transactions}
                keyExtractor= {item => item.id}
                renderItem={({item}) => <TransactionCard 
                onPress={() => handleRemoveSkill(item.id)}
                data={item}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: getBottomSpace()
                }}
                />
                
                </Transition>
        </>
      }
    </Container>
  )
} 