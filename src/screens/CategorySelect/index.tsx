import React from 'react'
import { FlatList } from 'react-native'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'
import * as S from './styled'

interface ICategory {
  key: string
  name: string
}

interface ICategorySelectProps {
  category: ICategory
  setCategory: (category: ICategory) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: ICategorySelectProps) {

  function handleCategorySelect(category: ICategory) {
    setCategory(category)
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>{category.name}</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button
          title='Selecionar'
          onPress={closeSelectCategory}
        />
      </S.Footer>
    </S.Container >
  )
}