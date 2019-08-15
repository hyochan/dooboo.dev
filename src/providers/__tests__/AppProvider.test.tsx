import React, { useReducer, useCallback } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { ThemeType } from '../../theme';
import { AppProvider, reducer, initialState } from '../AppProvider';
import { render } from '../../../test/test-utils';

describe('[AppProvider] rendering test', () => {
  it('component and snapshot matches', () => {
    const { container } = render(<AppProvider isTest />);
    expect(container.firstChild).toBeNull();
  });
});

describe('[AppProvider] interactions', () => {
  const dummyUser = { 
    displayName: 'dummy',
    email: 'dummy@test.com',
    password: 'dummyPW',
    age: 100,
    job: 'front-end'
  };

  it('should check default actions', () => {
    const renderResult = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      const defaultTest = useCallback(() => dispatch({ 
        type: 'default-test', 
        payload: null
      }), []);
      return { state, defaultTest };
    }
    const { result } = renderHook(() => renderResult());

    act(() => {
      result.current.defaultTest();
    });

    expect(result.current.state).toMatchObject(initialState);
  });

  it('should check [set-user] then [reset-user] actions', () => {
    const stateWithDummyUser = { ...initialState, user: dummyUser };
    const renderResult = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      const setUserTest = useCallback(() => dispatch({ 
        type: 'set-user', 
        payload: dummyUser
      }), []);
      const resetUserTest = useCallback(() => dispatch({ 
        type: 'reset-user', 
        payload: null
      }), []);
      return { state, setUserTest, resetUserTest };
    }
    const { result } = renderHook(() => renderResult());

    // set dummy user first
    act(() => {
      result.current.setUserTest();
    });

    expect(result.current.state).toMatchObject(stateWithDummyUser);

    // then reset
    act(() => {      
      result.current.resetUserTest();
    });

    expect(result.current.state).toMatchObject(initialState);
  });

  it('should check [change-theme-mode] actions', () => {
    const stateWithDarkTheme = { ...initialState, theme: ThemeType.DARK };
    const renderResult = () => {
      const [state, dispatch] = useReducer(reducer, initialState);
      const changeThemeTest = useCallback(() => dispatch({ 
        type: 'change-theme-mode', 
        payload: { theme: ThemeType.DARK }
      }), []);
      return { state, changeThemeTest };
    }
    const { result } = renderHook(() => renderResult());

    act(() => {
      result.current.changeThemeTest();
    });

    expect(result.current.state).toMatchObject(stateWithDarkTheme);
  });
});
