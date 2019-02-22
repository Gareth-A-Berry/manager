import {
  EMAIL_CHANGED,
  LOGIN_USER_ERROR, LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  PASSWORD_CHANGED,
} from './types'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password}) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_START
    })
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserError(dispatch, error))
    })
  }
}

const loginUserError = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_ERROR,
    payload: error.message
  })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })

  Actions.main()
}