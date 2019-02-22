import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { CardSection} from './common'
import { Actions } from 'react-native-router-flux'

class EmployeeListItem extends Component {

  onPress() {
    Actions.employeeEdit({ employee: this.props.employee })
  }

  render() {
    const { name } = this.props.employee

    return (
        <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.text}>
                {name}
              </Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  text: {
    fontSize: 18,
    paddingLeft: 15,
  }
}
export default EmployeeListItem