import React, { useContext, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import { createTheme, ThemeType } from '../../theme';
import { AppContext } from '../../contexts';
import Chat from '../screen/Chat';
import Post from '../screen/Post';
import Member from '../screen/Member';
import Profile from '../screen/Profile';
import Button from '../shared/Button';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-self: stretch;
  overflow: scroll;
  background: ${(props) => props.theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 1.5;
  font-family: sans-serif;
  color: ${(props) => props.theme.fontColor};
`;

interface IProps {
  store?: any;
}

function MainNavigator(props: {}) {
  const { state: { theme, firebase: { signOut } }, dispatch } = useContext(AppContext);
  const changeTheme = () => {
    let payload: object;
    if (theme === ThemeType.LIGHT) {
      payload = {
        theme: ThemeType.DARK,
      };
    } else {
      payload = {
        theme: ThemeType.LIGHT,
      };
    }
    dispatch({
      type: 'change-theme-mode',
      payload,
    });
  };

  const onSignOut = useCallback(() => signOut(), []);

  return (
    <Container>
      <Button
        inverted
        onClick={onSignOut}
        text='Sign Out'
        height="2rem"
      />
      <Button
        onClick={() => changeTheme()}
        text='Change Theme'
      />
      <Text>MainNavigator</Text><br/><br/>
      <Switch>
        <Route path='/chat' component={(param) => <Chat {...param} {...props}/>} />
        <Route path='/post' component={(param) => <Post {...param} {...props}/>} />
        <Route path='/member' component={(param) => <Member {...param} {...props}/>} />
        <Route path='/profile' component={(param) => <Profile {...param} {...props}/>} />
      </Switch>
    </Container>
  );
}

export default MainNavigator;
