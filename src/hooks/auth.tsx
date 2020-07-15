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
  id: string;
  name: string;
  email: string;
}

interface AuthenticatedAttributes {
  user: UserAttributes;
  token: string;
}

interface ContextAttributes {
  user: UserAttributes;
  token: string;
  hookSignIn(credentials: SignInAttributes): Promise<void>;
  hookSignUp(credentials: SignUpAttributes): Promise<void>;
}

const AuthContext = createContext<ContextAttributes>({} as ContextAttributes);
const AuthProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState<UserAttributes>(() => {
    const user = lscache.get('@ifun/user');
    const token = lscache.get('@ifun/token');

    if (token && user) {
      const { id, email, name }: UserAttributes = JSON.parse(user);
      setUserToken(token);

      return { id, email, name };
    }

    return {} as UserAttributes;
  });

  const hookSignIn = useCallback(
    async ({ email, password }: SignInAttributes) => {
      const { data } = await api.post<AuthenticatedAttributes>('/sessions', {
        email,
        password,
      });

      lscache.set('@ifun/token', data.token);
      lscache.set('@ifun/user', JSON.stringify(data.user));

      setUserToken(data.token);

      setUserData(data.user);
    },
    [setUserData, setUserToken],
  );

  const hookSignUp = useCallback(
    async ({ name, email, password }: SignUpAttributes) => {
      await api.post<AuthenticatedAttributes>('/users', {
        name,
        email,
        password,
      });
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{ user: userData, token: userToken, hookSignIn, hookSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): ContextAttributes {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('DEU MERDA AMIGO');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
