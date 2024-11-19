import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import useAuth from '@/hooks/useAuth';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const {auth, login, error} = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setLoading(true);
      const result = await auth();
      setIsAuthenticated(result);
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, login, logout, error, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
