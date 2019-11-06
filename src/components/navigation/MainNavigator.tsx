import React, { useContext, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../shared/Button';
import { ThemeType } from '../../theme';
import { AppContext } from '../../contexts';
import Chat from '../screen/Chat';
import Post from '../screen/Post';
import Member from '../screen/Member';
import Profile from '../screen/Profile';
import SideBar from '../ui/SideBar';
import Layout from '../ui/Layout';

const Container = styled.div`
  display: flex;
  background: ${(props) => props.theme.background}; 
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
      <SideBar />
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
      <Layout>
        <Switch>
          <Route path='/chat' component={(param) => <Chat {...param} {...props}/>}/>
          <Route path='/post' component={(param) => <Post {...param} {...props}/>}/>
          <Route path='/member' component={(param) => <Member {...param} {...props}/>}/>
          <Route path='/profile' component={(param) => <Profile {...param} {...props}/>}/>
        </Switch>
      </Layout>
    </Container>
  );
}

export default MainNavigator;
