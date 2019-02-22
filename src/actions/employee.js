import firebase from 'firebase'
import {
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_UPDATE,
  EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_DELETE_SUCCESS,
} from './types'
import {Actions} from 'react-native-router-flux'

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  }
}

export const employeeCreate = ({ name, phone, shift}) => {
  const { currentUser } = firebase.auth()
  return (dispatch) =>  {
    firebase.database().ref(`users/${currentUser.uid}/employees`)
    .push({name, phone, shift})
    .then(() => {
      dispatch({
        type: EMPLOYEE_CREATE
      })
      Actions.pop()
    }).catch((error) => {
      console.info(error.message)
    })
  }
}

export const employeeFetch = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`users/${currentUser.uid}/employees`)
    .on('value', snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        })
    })
  }
}

export const employeeSave = ({ name, phone, shift, uid}) => {
  const { currentUser } = firebase.auth()
  return () =>  {
    firebase.database().ref(`users/${currentUser.uid}/employees/${uid}`)
    .set({name, phone, shift})
    .then((dispatch) => {
      dispatch({
        type: EMPLOYEE_SAVE_SUCCESS
      })
      Actions.pop()

    }).catch((error) => {
      console.info(error.message)
    })
  }
}

export const employeeDelete = ({uid}) => {
  const { currentUser } = firebase.auth()
  return () =>  {
    firebase.database().ref(`users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then((dispatch) => {
      dispatch({
        type: EMPLOYEE_DELETE_SUCCESS
      })
      Actions.pop()

    }).catch((error) => {
      console.info(error.message)
    })
  }
}