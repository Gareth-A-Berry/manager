import React, {Component} from 'react'
import _ from 'lodash'
import { text } from 'react-native-communications'
import {Button, Card, CardSection, Confirm} from './common'
import EmployeeForm from './EmployeeForm'
import {connect} from 'react-redux'
import {employeeUpdate, employeeSave, employeeDelete} from '../actions'

class EmployeeEdit extends Component {
  state = {
    showModal: false
  }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value })
    })
  }

  onPress() {
    const { name, phone, shift } = this.props
    this.props.employeeSave( { name, phone, shift, uid: this.props.employee.uid } )
  }

  onText() {
    const { phone, shift } = this.props
    text(phone, `Your upcoming shift ${shift}`)
  }

  onAccept() {
    this.props.employeeDelete({uid: this.props.employee.uid})
  }

  onDecline() {
    this.setState({showModal: false})
  }

  render() {
    return(
        <Card>
          <EmployeeForm {...this.props}/>
          <CardSection>
            <Button onPress={this.onPress.bind(this)}>
              Save Changes
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onText.bind(this)}>
              Text Schedule
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
              Fire Employee
            </Button>
          </CardSection>
          <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this?
          </Confirm>
        </Card>
    )
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeesForm
  return { name, phone, shift }
}
export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit)