import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Modal } from 'react-native'
import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as S from './styled'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'

interface IFormData {
  [name: string]: any
}

interface INavigationProps {
  navigate: (screen: string) => void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
})

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const { user } = useAuth()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // const { navigate } = useNavigation<INavigationProps>()

  function handlTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  async function handleRegister(form: IFormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo de transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`

      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      // navigate('Listagem')

    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <S.Container>

      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>

          <InputForm
            name='name'
            control={control}
            placeholder='Nome'
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm
            name='amount'
            control={control}
            placeholder='Preço'
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
          />

          <S.TransactionsTypes>
            <TransactionTypeButton
              title='Income'
              type='up'
              isActive={transactionType === 'positive'}
              onPress={() => handlTransactionTypeSelect('positive')}
            />
            <TransactionTypeButton
              title='Outcome'
              type='down'
              isActive={transactionType === 'negative'}
              onPress={() => handlTransactionTypeSelect('negative')}
            />
          </S.TransactionsTypes>

          <CategorySelectButton
            testID='button-category'
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>

        <Button
          title='Enviar'
          onPress={handleSubmit(handleRegister)}
        />
      </S.Form>

      <Modal testID='modal-category' visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  )
}