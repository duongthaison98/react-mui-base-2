import { USER } from 'constants/user';
import { createContext, useEffect, useState } from 'react';
import type { FCC } from 'types/react';
import type { User } from 'types/user';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export interface AuthContextValue extends State {}

const AuthContext = createContext<AuthContextValue | null>(null);
const RefreshAuthContext = createContext<VoidFunction | null>(null);

if (process.env.NODE_ENV === 'development') {
  AuthContext.displayName = 'AuthContext';
}

const AuthProvider: FCC = (props) => {
  const { children } = props;
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    // Implement auth here
    Promise.resolve(USER).then((user) => {
      setState({
        isInitialized: true,
        isAuthenticated: true,
        user,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export {
  AuthContext as default,
  AuthProvider,
  AuthConsumer,
  RefreshAuthContext,
};
