import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Run ONLY in browser
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const token = localStorage.getItem('jwt_token');
      setIsLoggedIn(!!token);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (ExecutionEnvironment.canUseDOM) {
      localStorage.removeItem('jwt_token');
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
