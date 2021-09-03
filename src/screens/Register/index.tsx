import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback  } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import  uuid  from 'react-native-uuid';
import { InputForm } from '../../components/Form/InputForm';

import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { Dashboard } from '../Dashboard';

import { Container, Header, Title, Form, Fiels, TransactionContainer} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useAuth } from '../../Hooks/auth';


interface FormProps {
 name: string;
 amount: string;

}

type NavigationProps = {
   navigate:(screen:string) => void;
    
}

const {user}= useAuth()

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatorio'),
    amount: Yup.number().required().typeError('Informe um vlor númerico')
    .positive('O valor nao pode ser negativo')
    .required('O valor é obrigatorio')
});



export function Register() {

    const [transactionType, setTransactionType] = useState('')
    const [categorySelect, setCategorySelect]  = useState(false)
      
    
     
    const [category, setCategory] = useState({
        key: 'category',
        name: 'categoria'

    });

    const navigation = useNavigation<NavigationProps>();
   
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({resolver:yupResolver(schema)});

    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
        
        setTransactionType(type);
    }
    


    function openModal() {
        setCategorySelect(true);
    }

    function closeModal() {
        setCategorySelect(false);
    }

    
    async function handleRegister(form : FormProps ){

        if(!transactionType)
        return Alert.alert('Selecione o tipo da transação');

        if(category.key === 'category') 
        return Alert.alert('Selecione uma categoria')

       
       /*
        const formattedDate = format(new Date(), 'dd/MM/yyyy')
        const date = String(formattedDate) */

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
          };
         
       
          
      try {
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];

        const dataFormatted = [
            ...currentData,
            newTransaction
        ];
        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
        reset();
        setTransactionType('');
        setCategory({
            key: 'category',
            name: 'categoria',
        });

        navigation.navigate('Listagem')

    } catch(error) {
          console.log(error);
          Alert.alert('Não foi possivel salvar')
      }
   
    }
    
    
return(

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
        <Header>
            <Title>Cadastro</Title>
        </Header>

        <Form>
            
        <Fiels>
        <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
        />

        <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
        />

        <TransactionContainer >
        <TransactionTypeButton 
        title="Income" 
        type="up" 
        onPress={() => handleTransactionTypeSelect('positive')}
        isActive= {transactionType === 'positive'}
        />
        <TransactionTypeButton 
        title="Outcome" 
        type="down" 
        onPress={() => handleTransactionTypeSelect('negative')}
        isActive= {transactionType === 'negative'}
        />

        </TransactionContainer>

        <CategorySelectButton 
        title={category.name}
        onPress={openModal}/>

       
        </Fiels>

        <Button title="Enviar"  onPress={handleSubmit(handleRegister)}/>

        </Form>

        <Modal visible={categorySelect}>
            <CategorySelect
             category={category}
             setCategory={setCategory}
             closeCategory={closeModal}
            />
        </Modal>
       
    </Container>
    </TouchableWithoutFeedback>
)
}

