import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import { Register } from '../../screens/Register'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme'

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Register Screen', () => {
  it('should open category modal when user click on category button', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Provider
      }
    )

    const categoryModal = getByTestId('modal-category')
    const buttonCategory = getByTestId('button-category')

    fireEvent.press(buttonCategory)

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy()
    })
  })
})