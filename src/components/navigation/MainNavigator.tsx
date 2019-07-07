import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppContext } from '../../contexts';
import Chat from '../screen/Chat';
import Post from '../screen/Post';
import Member from '../screen/Member';
import Profile from '../screen/Profile';

interface IProps {
  store?: any;
}

function MainNavigator(props: {}) {
  const { state } = useContext(AppContext);
  const { theme } = state;
  return (
    <div>
      MainNavigator
      <Switch>
        <Route path='/chat' component={(param) => <Chat {...param} {...props}/>} />
        <Route path='/post' component={(param) => <Post {...param} {...props}/>} />
        <Route path='/member' component={(param) => <Member {...param} {...props}/>} />
        <Route path='/profile' component={(param) => <Profile {...param} {...props}/>} />
      </Switch>
    </div>
  );
}

export default MainNavigator;
