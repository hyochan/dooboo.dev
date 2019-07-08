import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import { Link } from 'react-router-dom';

const Container = styled.header`
  display: flex;
  flex-direction: column;  
  height: 116px;
  background-color: #888;
`;

const TabContainer = styled.div`
  display: flex;
`;

const tabs = [
  { label: 'chat', link: '/chat' },
  { label: 'post', link: '/post' },
  { label: 'profile', link: '/profile' },
  { label: 'member', link: '/member' }];

const Header: React.FC<{}> = () => {
  return (
    <Container>
      <h1>관리자 채널</h1>
      <TabContainer>
        {map(tabs, (tab) => <Link key={tab.link} to={tab.link}>
          {tab.label}
        </Link>)}
      </TabContainer>
    </Container>
  );
};

export default Header;
