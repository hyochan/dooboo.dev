import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../shared/Button';

const Container = styled.div`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  history?: any;
  changeTheme?: any;
}

function Page(props: IProps) {
  return (
    <Container>
      <div
        data-testid='myText'
      >Member</div>
      <Button
        onClick={props.changeTheme}
        text='change theme'
      />
    </Container>
  );
}

export default Page;
