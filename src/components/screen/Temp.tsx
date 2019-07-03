import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background};
  padding: 50px;
`;

interface IProps {
  history?: any;
}

function Temp(props: IProps) {
  const { history } = props;
  return (
    <Container>
      <Button
        onClick={() => history.goBack()}
      >back to tab page</Button>
    </Container>
  );
}

export default Temp;
