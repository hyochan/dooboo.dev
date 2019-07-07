import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { createTheme } from '../../theme';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import FindPw from '../screen/FindPw';
import MainNavigator from './MainNavigator';

import { AppContext } from '../../contexts';
import Temp from '../screen/Temp';

interface IProps {
  store?: any;
}

function SwitchNavigator(props: {}) {
  const { state } = useContext(AppContext);
  const { theme } = state;
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <BrowserRouter>
        <div style={{ textAlign: 'center' }}>
          <Switch>
            <Route path='/signin' component={(param) => <SignIn {...param} {...props}/>} />
            <Route path='/signup' component={(param) => <SignUp {...param} {...props}/>} />
            <Route path='/findpw' component={(param) => <FindPw {...param} {...props}/>} />
            <Route exact path='' component={(param) => <MainNavigator {...param} {...props}/>} />
            <Route render={(param) => <Temp {...param} {...props}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default SwitchNavigator;
