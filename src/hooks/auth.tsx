import React, { createContext, useContext, useCallback, useState } from 'react';
import lscache from 'lscache';

import api from '../services/api';

interface SignInAttributes {
  email: string;
  password: string;
}

interface SignUpAttributes {
  name: string;
  email: string;
  password: string;
}

interface UserAttributes {
  name: string;
  email: string;
}

interface AuthenticatedAttributes {
  user: UserAttributes;
  token: string;
}

interface ContextAttributes {
  user: UserAttributes;
  hookSignIn(credentials: SignInAttributes): Promise<void>;
  hookSignUp(credentials: SignUpAttributes): Promise<void>;
}

const AuthContext = createContext<ContextAttributes>({} as ContextAttributes);
const AuthProvider:React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserAttributes>(() => {
      const user = lscache.get('@ifun/user');
      const token = lscache.get('@ifun/token');
      
      if(token && user) {
        const { email, name }: UserAttributes = JSON.parse(user);

        return { email, name };
      }

      return {} as UserAttributes;
  })

  const hookSignIn = useCallback(
    async ({ email, password }: SignInAttributes) => {
      const { data } = await api.post<AuthenticatedAttributes>('/sessions', {
        email,
        password,
      });

      lscache.set('@ifun/token', data.token);
      lscache.set('@ifun/user', JSON.stringify(data.user));

      setUserData(data.user);
  }, [setUserData]);

  const hookSignUp = useCallback(
    async ({ name, email, password }: SignUpAttributes) => {
      await api.post<AuthenticatedAttributes>('/users', {
        name,
        email,
        password
      });
  }, []);


  return (
    <AuthContext.Provider value={{ user: userData, hookSignIn, hookSignUp }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('DEU MERDA AMIGO');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };