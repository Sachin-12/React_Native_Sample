import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {AzureInstance, AzureLoginView} from '../lib';
import CookieManager from 'react-native-cookies';
import Config from '../Config'

const credentials = {
  client_id: Config.client_id,
  scope: Config.scope
};

export default class LoginScreen extends React.Component {
    static navigationOptons ={
        title : 'Welcome'
    }
  constructor(props){
    super(props);
    this.state = {
      azureLoginObject: {},
      loginSuccess: false,
      events :[],
    };
		this.azureInstance = new AzureInstance(credentials);
		this._onLoginSuccess = this._onLoginSuccess.bind(this);
	}

	_onLoginSuccess(){
		this.azureInstance.getUserInfo().then(result => {
			this.setState({
        loginSuccess: true,
        azureLoginObject: result
      });
      console.log(result);
		}).catch(err => {
			console.log(err);
		})
  }

  
  _logout(){

    this.setState({
      loginSuccess:false,
    });
    CookieManager.clearAll();

  }

  get_events(){
		this.azureInstance.get_events().then(json => {
      a =[json.value[0].subject,json.value[1].subject]
			this.setState({
        events: a
      });

      console.log(this.state.events[0]);

		}).catch(err => {
			console.log(err);
		})
  }

  render() {
    
    if (!this.state.loginSuccess) {

      return (<AzureLoginView
          azureInstance={this.azureInstance}
          loadingMessage="Requesting access token"
          onSuccess={this._onLoginSuccess}
          excludeSecretFromTokenRequest={true}
        />)
    }

    const {userPrincipalName, givenName} = this.state.azureLoginObject;
    
    
    return (
      <View style={styles.container}>
				<Text style={styles.text}>Welcome {givenName}</Text> 
				<Text style={styles.text}>You logged into Azure with {userPrincipalName}</Text> 
        <Button title="Logout" onPress={(e)=>this._logout()}/>
        <Button title="Events" onPress={(e)=>this.get_events()}/>
        <Text>{this.state.events[0]}</Text>
        <Text>{this.state.events[1]}</Text>

			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});