import {
  EMAIL_CHANGED, LOGIN_USER_START, LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  PASSWORD_CHANGED,
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: null,
}

const authentication = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
        return {...state, email: action.payload}
    case PASSWORD_CHANGED:
      return {...state, password: action.payload}
    case LOGIN_USER_START:
      return {...state, loading: true, error: ''}
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
      }
    case LOGIN_USER_ERROR:
      return {...state, error: action.payload, password: '', loading: false}
    default:
      return state
  }
}

export default authentication