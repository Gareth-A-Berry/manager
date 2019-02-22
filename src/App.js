import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import firebase from 'firebase'
import Router from './Router'

export default class App extends Component<Props> {
  componentWillMount() {
    const config =  {
      apiKey: 'AIzaSyA3dXcWEddfjp3ZLvvsDySyjQvuXXt6awA',
      authDomain: 'manager-f1ce7.firebaseapp.com',
      databaseURL: 'https://manager-f1ce7.firebaseio.com',
      projectId: 'manager-f1ce7',
      storageBucket: 'manager-f1ce7.appspot.com',
      messagingSenderId: '579422173993'
    }
    firebase.initializeApp(config)
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <Router/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
