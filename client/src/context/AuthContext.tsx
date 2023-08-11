import axiosConfig from '../axiosConfig'
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

export interface User {
  fullName: string,
  membershipStatus: boolean,
  username: string,
}

interface AuthObject {
  authUser: User | null,
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>,
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  authIsReady: boolean,
  setAuthIsReady: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthObject>({} as AuthObject)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authIsReady, setAuthIsReady] = useState<boolean>(false)

  const authInfo = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    authIsReady,
    setAuthIsReady
  }
  
  // This hook is evaluated once on initial component render
  useEffect(() => {
    if (!authUser) {
      setIsLoading(true)
      axiosConfig.post('/checkAuth', {}, { withCredentials: true })
        .then(result => {
          if (result.data !== 'User not logged in') {
            setAuthUser(result.data)
            setIsLoggedIn(true)
            console.log(result.data)
          } else console.log(result.data)
        })
        .catch(err => console.log(err))
        .finally (() => {
          setIsLoading(false)
          setAuthIsReady(true)
        })   
    } else console.log('Is logged in: ', isLoggedIn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}