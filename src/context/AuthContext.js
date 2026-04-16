import React, { createContext, useState, useContext, useEffect } from 'react';
import Database from '../services/Database';
const AuthContext = createContext({});
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await Database.getCurrentSession();
      if (session) {
        setUser(session);
      }
    } catch (e) {
      console.log('Erro ao verificar sessao:', e);
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    const result = await Database.validateLogin(email, password);
    if (result.success) {
      const { password, ...userWithoutPassword } = result.user;
      await Database.setSession(userWithoutPassword);
      setUser(userWithoutPassword);
    }
    return result;
  };
  const register = async (name, email, password) => {
    const result = await Database.saveUser({ name, email, password });
    if (result.success) {
      const { password, ...userWithoutPassword } = result.user;
      await Database.setSession(userWithoutPassword);
      setUser(userWithoutPassword);
    }
    return result;
  };

  const logout = async () => {
    console.log('Iniciando logout...');
    try {
      await Database.clearSession();
      setUser(null);
      console.log('Logout completo');
    } catch (error) {
      console.log('Erro no logout:', error);
    }
  };
  if (loading) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
