import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 280px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.sideBar.background};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const SideBar: React.FC<{}> = () => {
  return (
    <Container>
      <Logo>Dooboo.Dev</Logo>
    </Container>
  );
};

export default SideBar;
