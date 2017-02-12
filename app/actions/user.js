// @flow
import * as firebase from 'firebase';
import { toggleButtonSpinner } from '../actions/ui';

export const userActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

export const loginStart = () => ({
  type: userActionTypes.LOGIN_START
});

export const loginSuccess = (user: {}) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  user
});

export const loginError = (error: {}) => ({
  type: userActionTypes.LOGIN_ERROR,
  error
});

// eslint-disable-next-line flowtype/no-weak-types
export const login = (email: string, password: string) => (dispatch: Function) => {
  dispatch(loginStart());
  dispatch(toggleButtonSpinner());

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(loginSuccess(response));
      return dispatch(toggleButtonSpinner());
    })
    .catch(error => {
      dispatch(loginError(error));
      return dispatch(toggleButtonSpinner());
    });
};
