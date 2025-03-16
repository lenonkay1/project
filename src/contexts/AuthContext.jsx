import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const user = auth.getCurrentUser()
    setUser(user)
    setLoading(false)
  }, [])

  // Sign up function
  const signUp = async (email, password) => {
    try {
      const data = await auth.register(email, password)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const data = await auth.login(email, password)
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      auth.logout()
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the hook after the provider
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}