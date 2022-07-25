import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export const Profile: React.FC = () => {
  return (
    <View>
      <Text
        testID='title'
      >
        Perfil
      </Text>

      <TextInput
        placeholder='Nome'
        autoCorrect={false}
        testID='input-name'
        value='Rodrigo'
      />
      <TextInput
        placeholder='Sobrenome'
        testID='input-surname'
        value='Gonçalves'
      />

      <Button
        title='salvar'
        onPress={() => { }}
      />
    </View>
  );
}