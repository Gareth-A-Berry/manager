import React, { Component } from 'react'
import { View , Text} from 'react-native'
import { Card, CardSection, Input, Button, Spinner} from './components/common'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from './actions'

class LoginForm extends Component {

  onEmailChange(text) {
      this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
  const { email, password } = this.props
    this.props.loginUser({email, password})
  }

  renderButton() {
    if (this.props.loading) {
      return(
          <Spinner size={1}/>
      )
    } else {
      return (
          <Button
              onPress={this.onButtonPress.bind(this)}
          >
            Login
          </Button>
      )
    }

  }

  renderError() {
    if (this.props.error) {
      return (
          <View>
            <Text style={styles.error}>
              {this.props.error}
            </Text>
          </View>
      )
    }
  }
  render() {
    return (
        <Card>
          <CardSection>
            <Input
                label={'Email'}
                placeholder={'user@example.com'}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
            />
          </CardSection>
          <CardSection>
            <Input
                secureText
                label={'Password'}
                placeholder={'password'}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
            />
          </CardSection>
          {this.renderError()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
    )
  }
}

const styles = {
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => {
  return {
    email: state.authentication.email,
    password: state.authentication.password,
    error: state.authentication.error,
    loading: state.authentication.loading,
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)