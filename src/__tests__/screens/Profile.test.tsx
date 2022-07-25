import React from 'react'
import { render } from '@testing-library/react-native'
import { Profile } from '../../screens/Profile'

describe('Profile Screen', () => {
  it('check if user input name placeholder renders correctly', () => {
    const { getByPlaceholderText } = render(<Profile />)

    const inputName = getByPlaceholderText('Nome')

    expect(inputName).toBeTruthy()
  })

  it('check if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />)

    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName.props.value).toEqual('Rodrigo')
    expect(inputSurname.props.value).toEqual('Gonçalves')
  })

  it('check if title render correctly', () => {
    const { getByTestId } = render(<Profile />)

    const title = getByTestId('title')

    expect(title.props.children).toContain('Perfil')
  })
})
