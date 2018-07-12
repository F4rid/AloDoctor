import React from 'react';
import { DatePickerAndroid , StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content, Item , Input, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import { formStyles } from './../../../assets/styles/app';
import { Actions } from 'react-native-router-flux';
import Schedule from './../../../models/ScheduleModel';
import Calendar from './../../../components/calendar/Calendar';
import moment from 'moment-jalaali';
import { PersianDatePicker } from './../../../native/composer';

export default class AppointmentDetails extends React.Component { 

    constructor(props)
    {
        super(props);
    }

    acceptPatient(data)
    {
        Schedule.update(data, () => {
            data.status = 'accepted';
        });

        Toast.show({
            text: 'نوبت با موفقیت پذیرش شد.',
            position: 'bottom',
            buttonText: '',
            textStyle: {
                fontFamily: 'IRANSans'
            }
        });
    }

    /*
     *   Render JSX views
    */
    render() {
    	const { data } = this.props;
        return (
            <View style={styles.container}>
                <Button style={[formStyles.submitButton, {margin: 30}]} onPress={() => this.acceptPatient(data) }>
                    <Text style={formStyles.submitText}>پایان پذیرش</Text>
                </Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});