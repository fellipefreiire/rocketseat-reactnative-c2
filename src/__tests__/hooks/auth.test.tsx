import { renderHook, act } from '@testing-library/react-native'
import { AuthContextProvider, useAuth } from '../../hooks/auth'
import fetchMock from 'jest-fetch-mock'
import { mocked } from 'ts-jest/utils'
import { startAsync } from 'expo-auth-session'

jest.mock('expo-auth-session')

fetchMock.enableMocks()

describe('Auth Hook', () => {
  it('should be able to sign in with existing Google account', async () => {
    const googleMocked = mocked(startAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token'
      }
    })

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 'any_id',
        email: 'rodrigo.goncalves@rocketseat.team',
        name: 'Rodrigo',
        photo: 'any_photo.png'
      })
    )

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider
    })

    await act(async () => await result.current.signInWithGoogle())

    expect(result.current.user.email).toBe('rodrigo.goncalves@rocketseat.team')
  })
})