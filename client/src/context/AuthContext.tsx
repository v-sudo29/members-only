import { ReactNode, createContext, useContext, useState } from "react"

export interface User {
  fullName: string,
  membershipStatus: boolean,
  password: string,
  username: string,
  __v: number,
  _id: string
}

interface AuthObject {
  authUser: User | null,
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>,
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthObject>({} as AuthObject)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const authInfo = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}