import React, { createContext, ReactNode, useContext } from 'react'
interface AuthProviderProps {
  children: ReactNode
}
interface User {
  id: string,
  name: string,
  email: string,
  photo?: string,
}
interface AuthProps{
  user: User
}
export const AuthContext = createContext({} as AuthProps)

function AuthProvider({children}: AuthProviderProps) {
  const user = {
    id: '121232342',
    name: 'Rodrigo Gonçalves',
    email: 'lucio@gmail.com'
  }
  return(  
   <AuthContext.Provider value={{
     user,
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
