import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';

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
        text='back to tab page'
      />
    </Container>
  );
}

export default Temp;
