import React, { createContext, ReactNode, useContext, useState } from 'react'
interface AuthProviderProps {
  children: ReactNode
}
interface User {
  id: string,
  name: string,
  email: string,
  photo?: string,
}

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface AuthProps{
  user: User
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
  userStorageLoading: boolean
}
interface AuthorizationResponse {
  params: {
    access_token: string
  };
  type: string;
}
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
export const AuthContext = createContext({} as AuthProps)
const asyncUser = '@gofinances:user'

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState(true)
  
  console.log(user)
 
  async function signOut() {
    setUser({} as User);
    
    await AsyncStorage.removeItem(asyncUser)
  }
  async function signInWithGoogle() {
    try { 
     // const CLIENT_ID = '128500416997-bhn5drqlparqso81bao9vqh8bddhq0dk.apps.googleusercontent.com';
     // const REDIRECT_URI = 'https://auth.expo.io/@luciofarcanjo/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
     
     
      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,}

      setUser(userLogged)
      await AsyncStorage.setItem(asyncUser, JSON.stringify(userLogged));
        }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
     const credential = await AppleAuthentication.signInAsync({
       requestedScopes: [
         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
         AppleAuthentication.AppleAuthenticationScope.EMAIL,
       ]
     });

    
     if(credential){

      const name =  credential.fullName!.givenName!
      const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
       const userLogged = {
        id: String(credential.user),
        email: credential.email!,
        name,
        photo,
     };
     setUser(userLogged);
     await AsyncStorage.setItem( asyncUser, JSON.stringify(userLogged));
  }
}  catch (error) {
      throw new Error(error)
    }
  }
 
  useEffect(() => {
    async function loadUserStorageDate() {
      const userStorage = await AsyncStorage.getItem(asyncUser)
      
      if(userStorage){
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);

      }
      setUserStorageLoading(false)
      
    }
    loadUserStorageDate()
  }, [])
  return(  
   <AuthContext.Provider value={{
     user,
     signInWithGoogle,
     signInWithApple,
     signOut,
     userStorageLoading
   }}>
      {children}
    </AuthContext.Provider>
  )
}


function useAuth() {
  const context= useContext(AuthContext);

  return context;
}


export { AuthProvider, useAuth }
