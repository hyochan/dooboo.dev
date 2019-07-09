import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentProps {
  children: ReactNode;
}

const Container = styled.div`
  min-height: calc(100vh - 90px);
`;

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <Container>{children}</Container>
  );
};

export default Content;
