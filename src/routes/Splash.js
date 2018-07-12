import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { splashStyles } from './../assets/styles/app';
import LinearGradient from "react-native-linear-gradient";
import { Actions } from 'react-native-router-flux';
import User from './../models/UserModel';
import { connect } from 'react-redux';
import DB from './../mixins/DB';


class Splash extends Component {

    /*
     *   constructor accept some props passed from another page
     *   @params: props
    */
    constructor(props) 
    {
        super(props);
    }

    /*
     *   Set default states in componentWillMount Lifecycle method
     *   and authorize session 
    */
    componentWillMount() 
    {
        setTimeout(() => {

            this.Authorization().then(status => {
                if(status) {
                    Actions.reset('tabbar');
                } else {
                    Actions.reset('auth');
                }
            });

        }, 1000);
    }

    /*
     *   Check ACCESS_TOKEN from session
     *   @return: true, false
    */
    async Authorization() {
        try {
            let token = await AsyncStorage.getItem('ACCESS_TOKEN');
            return token === null
                ? false
                : await this.DBAuthorization(token);
        } catch(error) {
            console.log(error)
        }
    }

    /*
     *   Authorize ACCESS_TOKEN from Database 
     *   @params: token
     *   @return: true, false
    */
    async DBAuthorization(token) {
        let user = await User.findByToken(token);
        return (user === undefined) ? false : true;
    }

    /*
     *   Render JSX views
    */
    render() 
    {
        return (
            <View style={splashStyles.container}>
                <LinearGradient colors={[ 'rgb(245, 222, 217)', 'rgb(210, 208, 224)' ]} style={splashStyles.main}>
                    <View>
                        <ActivityIndicator
                           animating = {true}
                           color = 'rgba(0, 0, 0, .8)'
                           size = "large"
                           style = {splashStyles.loading}/>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Splash);