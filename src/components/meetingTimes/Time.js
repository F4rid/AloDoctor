//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { apStyles } from './../../assets/styles/app';

// create a component
class Time extends Component {

        constructor(props)
        {
                super(props);
        }

        onPressTime(time, status, used)
        {
                if (used !== true)
                {
                        this.props.data.status = ! this.props.data.status;
                        let time = (status === true) ? time : this.props.data.time;

                        this.props.onChangeTime({
                                time: time,
                                status: status
                        });
                }
        }

        render() {
                let time = this.props.data.time;
                let status = this.props.data.status;
                let used = this.props.data.used;

                return (
                        <TouchableWithoutFeedback onPress={ () => this.onPressTime(time, status, used) }>
                                <View>
                                        <Text 
                                                style={[apStyles.timeItem, {backgroundColor: (status == true) ? '#ff5722' : '#009688'}]}        
                                        >
                                                {time}
                                        </Text>
                                </View>
                        </TouchableWithoutFeedback>
                );
        }
}

//make this component available to the app
export default Time;

