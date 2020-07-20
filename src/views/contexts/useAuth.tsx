import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRequest } from './useRequest';

interface AuthContextValue {
  authorize: () => Promise<void>;
  clearCookies: () => void;
  user: any;
}

const AuthContext = createContext<AuthContextValue>(null as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const { postRequest } = useRequest();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const user = cookies['user'];

  const authorize = async () => {
    const { data } = await postRequest({ url: 'authorize' });
    if (data?.user) return setCookie('user', data.user);
    clearCookies();
  };

  const clearCookies = () => {
    removeCookie('token');
    removeCookie('user');
  };

  return (
    <AuthContext.Provider value={{ authorize, clearCookies, user }}>
      {children}
    </AuthContext.Provider>
  );
};
