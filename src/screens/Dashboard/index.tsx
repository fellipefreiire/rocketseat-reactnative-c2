import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, ITransactionCardData } from '../../components/TransactionCard'
import * as S from './styled'

export interface DataListProps extends ITransactionCardData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: '12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '19/05/2022',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: '59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: '19/05/2022',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: '1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date: '19/05/2022',
    },
  ]

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/49215695?v=4' }} />
            <S.User>
              <S.UserGreeting>Olá, </S.UserGreeting>
              <S.UserName>Felipe</S.UserName>
            </S.User>
          </S.UserInfo>

          {/* @ts-ignore */}
          <S.Icon name='power' />
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='1.259,00'
          lastTransaction='Última saída dia 03 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='16.141,00'
          lastTransaction='01 à 16 de abril'
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        >

        </S.TransactionList>
      </S.Transactions>
    </S.Container>
  )
}
