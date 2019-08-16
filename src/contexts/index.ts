import { createContext } from 'react';
import { IUser, ILocale } from '../types';
import Firebase from '../apis/firebase';

export interface IAppContext {
  user?: IUser;
  locale?: ILocale;
  state?: any;
  dispatch?: any;
  firebase?: Firebase;
}

export const AppContext = createContext<IAppContext | null>(null);
