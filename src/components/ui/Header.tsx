import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import { NavLink } from 'react-router-dom';
import Ink from 'react-ink';

const Container = styled.header`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${(props) => props.theme.header.background};
  border-bottom: 1px solid ${(props) => props.theme.header.border};
  box-sizing: border-box;
  height: 90px;
`;

const TabContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: -1px;
`;

const activeClassName = 'active';

const Title = styled.h1`
  margin-top: 18px;
  margin-bottom: 12px;
  margin-left: 24px;
  text-align: left;
  font-size: 18px;
  color: ${(props) => props.theme.header.titleColor};
`;

const TabItem = styled(NavLink)
  .attrs({
    activeClassName: activeClassName,
  })`
  color: ${(props) => props.theme.header.tabFontColor};
  padding: 12px 24px;
  position: relative;
  border-radius-topleft: 3px;
  border-radius-topright: 3px;
  &.${activeClassName} {
    color: ${(props) => props.theme.header.activeTabFontColor};
    border-bottom: 1px solid ${(props) => props.theme.header.activeTabFontColor};
  }
`;

const tabs = [
  { label: 'chat', link: '/chat' },
  { label: 'post', link: '/post' },
  { label: 'profile', link: '/profile' },
  { label: 'member', link: '/member' }];

const Header: React.FC<{}> = () => {
  return (
    <Container>
      <Title>Admin Chanel</Title>
      <TabContainer>
        {map(tabs, (tab) => <TabItem key={tab.link} to={tab.link}>
          {tab.label}
          <Ink/>
        </TabItem>)}
      </TabContainer>
    </Container>
  );
};

export default Header;
