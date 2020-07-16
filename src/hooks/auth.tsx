import React, { createContext, useContext, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
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
  error: string;
  hookSignIn(credentials: SignInAttributes): Promise<void>;
  hookSignUp(credentials: SignUpAttributes): Promise<void>;
  hookAuthenticatedUser(isPrivate: boolean): void;
  hookSetErrors(errorMessage: string): void;
}

const AuthContext = createContext<ContextAttributes>({} as ContextAttributes);
const AuthProvider: React.FC = ({ children }) => {
  const [isError, setIsError] = useState('');
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

  const hookAuthenticatedUser = useCallback(
    (isPrivate: boolean): void => {
      const router = useRouter();

      if (!userToken && isPrivate) {
        router.push('/signin');
        return;
      }

      if (userToken && !isPrivate) {
        router.push('/home');
      }
    },
    [userToken],
  );

  const hookSetErrors = useCallback((errorMessage: string): void => {
    setIsError(errorMessage);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        token: userToken,
        error: isError,
        hookSignIn,
        hookSignUp,
        hookAuthenticatedUser,
        hookSetErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): ContextAttributes {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Você precisa chamar o Provider antes de usar o contexto');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
