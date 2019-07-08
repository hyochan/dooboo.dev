import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  width: 280px;
  min-height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border-bottom: 1px solid white;
`;

const SideBar: React.FC<{}> = () => {
  return (
    <Container>
      <Logo>Dooboo.Dev</Logo>
    </Container>
  );
}

export default SideBar;