import React, { useReducer, useEffect } from 'react';
import { AppContext } from '../contexts';
import { IUser, ILocale } from '../types';
import { ThemeType } from '../theme';
import STRINGS from '../../STRINGS';
import Firebase from '../apis/firebase';
import MockFirebase from '../../__mocks__/firebase';

export const AppConsumer = AppContext.Consumer;

interface IAction {
  type: 'reset-user' | 'set-user' | 'change-theme-mode' | 'is-real' | 'default-test';
  payload: any;
}

interface IProps {
  children?: any;
  isTest?: boolean;
}

export interface IState {
  theme: ThemeType;
  user: IUser;
  locale?: ILocale;
  firebase?: Firebase | MockFirebase;
}

export const initialState: IState = {
  theme: ThemeType.LIGHT,
  user: {
    displayName: '',
    email: '',
    password: '',
    age: 0,
    job: '',
  },
  firebase: new MockFirebase(),
};

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'reset-user':
      return { ...state, user: initialState.user };
    case 'set-user':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'change-theme-mode':
      return { ...state, theme: action.payload.theme };
    case 'is-real':
      return { ...state, firebase: new Firebase() };
    default:
      return state;
  }
};

export const AppProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const ContextProvider = AppContext.Provider;
  useEffect(() => {
    if (!props.isTest) {
      dispatch({ type: 'is-real', payload: true });
    }
  }, [dispatch]);
  return (
    <ContextProvider value={value}>
      {props.children}
    </ContextProvider>
  );
};

export { AppContext };
