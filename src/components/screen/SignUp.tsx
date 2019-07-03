import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  history?: any;
}

function Page(props: IProps) {
  return (
    <Container>
      <div
        data-testid='myText'
      >Sign Up</div>
    </Container>
  );
}

export default Page;
