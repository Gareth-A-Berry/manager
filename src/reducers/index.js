import { combineReducers } from 'redux'
import authentication from './authentication'
import employeesForm from './employeesForm'
import employees from './employees'

export default combineReducers({
  authentication,
  employeesForm,
  employees,
})