import React, { createContext, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as AppleAuthentication from 'expo-apple-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IAuthContextProviderProps {
  children: React.ReactNode
}

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextData {
  user: User
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
  isUserLoading: boolean
}

interface IAuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const userStorageKey = '@gofinance:user'

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params: { access_token } } = await AuthSession.startAsync({ authUrl }) as IAuthorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`)
        const userInfo = await response.json()

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch (err) {
      throw new Error(String(err))
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      })

      if (credential) {
        const name = credential.fullName!.givenName!
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${name}&length=1`
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }


    } catch (err) {
      throw new Error(String(err))
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadUserFromStorage() {
      const user = await AsyncStorage.getItem(userStorageKey)

      if (user) {
        const userLogged = JSON.parse(user) as User
        setUser(userLogged)
      }

      setIsUserLoading(false)
    }

    loadUserFromStorage()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}