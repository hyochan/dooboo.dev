import React, { useState, useEffect, useContext, useRef, FC } from 'react';
import { BrowserRouter, Route, RouteProps, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { createTheme, ThemeType } from '../../theme';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import FindPw from '../screen/FindPw';
import MainNavigator from './MainNavigator';
import { AppContext } from '../../contexts';
import Firebase from '../../apis/firebase';
import Temp from '../screen/Temp';

interface IProps extends RouteProps {
  store?: any;
}

interface IRenderAuthComp extends RouteProps {
  component: FC<any>;
  firebase: Firebase;
  state: any;
}

const PrivateRoute: FC<IRenderAuthComp> = ({ component: Component, state, firebase, ...rest }: any) => {
  const [authUser, setAuthUser] = useState(firebase.getCurrentUser());
  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  });

  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (authUser) {
          return (
            <Component {...props} />
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default function SwitchNavigator(props: {}) {
  const { state, state: { theme, firebase }, dispatch } = useContext(AppContext);
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <BrowserRouter>
        <Switch>
          <Route path='/signin' component={(param) => <SignIn {...param} {...props}/>} />
          <Route path='/signup' component={(param) => <SignUp {...param} {...props}/>} />
          <Route path='/findpw' component={(param) => <FindPw {...param} {...props}/>} />
          <PrivateRoute exact path="/" state={state} component={(param) => <MainNavigator {...param} {...props} />} firebase={firebase} />
          <Route render={(param) => <Temp {...param} {...props}/>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}
