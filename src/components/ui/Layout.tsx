import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';

interface LayoutProps {
  children: ReactNode
}

const Container = styled.div`
  flex: 1;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header/>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Layout;
