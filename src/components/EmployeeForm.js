import React, {Component} from 'react'
import {Picker, Text, View} from 'react-native'
import {CardSection, Input} from './common'
import { connect } from 'react-redux'
import {employeeUpdate} from '../actions'

class EmployeeForm extends Component {
  render(){
    return(
        <View>
          <CardSection>
            <Input
                label={'Name'}
                placeholder={'Jane'}
                value={this.props.name}
                onChangeText={text => this.props.employeeUpdate({prop: 'name', value: text})}
            />
          </CardSection>
          <CardSection>
            <Input
                label={'Phone'}
                placeholder={'+55 123 4567'}
                value={this.props.phone}
                onChangeText={text => this.props.employeeUpdate({prop: 'phone', value: text})}
            />
          </CardSection>
          <CardSection style={{flexDirection: 'column'}}>
            <Text style={styles.pickerLabel}>Shift</Text>
            <Picker
                style={{flex: 1}}
                selectedValue={this.props.shift}
                onValueChange={day => this.props.employeeUpdate({prop: 'shift', value: day})}
            >
              <Picker.item label={'Monday'} value={'monday'}/>
              <Picker.item label={'Tuesday'} value={'tuesday'}/>
              <Picker.item label={'Wednesday'} value={'wednesday'}/>
              <Picker.item label={'Thursday'} value={'thursday'}/>
              <Picker.item label={'Friday'} value={'friday'}/>
              <Picker.item label={'Saturday'} value={'saturday'}/>
              <Picker.item label={'Sunday'} value={'sunday'}/>
            </Picker>
          </CardSection>
        </View>
        )

  }
}

const styles = {
  pickerLabel: {
    fontSize: 18,
    paddingLeft: 20,
  }
}


const mapStateToProps = state => {
  const { name, phone, shift } = state.employeesForm
  return { name, phone, shift }
}


export default connect(mapStateToProps, {employeeUpdate})(EmployeeForm)