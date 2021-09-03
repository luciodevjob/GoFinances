import React, { useCallback, useEffect, useState, } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
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
import { useAuth } from '../../Hooks/auth';

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
    const {signOut, user}= useAuth()
    const dataKey = `@gofinances:transactions_user:${user.id}`;
  
   
    function getLastTransactionDate(
      collection: DataListProps[],
      type: 'positive' | 'negative'
    ){
      const collectionFilttered = collection
      .filter(transaction => transaction.type === type)

      if(collectionFilttered.length === 0)
      return 0;

      const lastTransaction = new Date(
      Math.max.apply(Math, collectionFilttered
      .map(transaction => new Date(transaction.date).getTime())))
  
      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
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

          lastTransactions: lastTransactionsentries === 0 ? 'Não existe transações' : `Última saída dia ${lastTransactionsentries}`,
        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactions: lastTransactionsentries === 0 ? 'Não existe transações' : `Última saída dia ${lastTransactionsentries}`,
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
    async function handleRemoveSkill(transactionId: string) {
      const response = await AsyncStorage.getItem(dataKey);
      const storagedTransactions = response ? JSON.parse(response) : [];
     
      const filteredTransactions = storagedTransactions
      .filter((transaction: DataListProps) => transaction.id !== transactionId);
    
      setTransactions(filteredTransactions);
      await AsyncStorage.setItem(dataKey, JSON.stringify(filteredTransactions));

      loadTransactions()
      }
      function alerta(name: string, id: string,) {
        Alert.alert(`Você deseja deletar ${String(name)}`,
        "",
        [
          {text: 'Cancelar', },
          {text: 'Deletar', onPress: () => handleRemoveSkill(id) },
        ],
          {cancelable: false}
        )}


      function loggOff() {
        {
          Alert.alert(`Você deseja desconectar?`,
          "",
          [
            {text: 'Cancelar', },
            {text: 'Desconectar', onPress: () =>  signOut()},
          ],
            {cancelable: false}
          )}
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
                        source= {{uri: user.photo}}
                    />
                    <User>
                        <UserGreeting>Olá,</UserGreeting>
                        <UserName>{user.name}</UserName>
                    </User>
                
                    
                </UserInfo>
                <LougoutButton onPress={loggOff}>
                <Icon name="power"/>
                </LougoutButton>
                </UserContainer>
                </Header>
       
            <HighlightCards>
                <HighlightCard 
                type= {'up'}
                title= {'Entradas'} 
                amount={HighlightData.entries.amount} 
                lastTransition= {HighlightData.entries.lastTransactions}
                />

                 <HighlightCard 
                type= {'down'}
                title= {'Saidas'} 
                amount={HighlightData.expensives.amount} 
                lastTransition= {HighlightData.entries.lastTransactions}
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
                onPress={ () => alerta(item.name, item.id)}
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