import React from 'react';
import { AsyncStorage , StyleSheet, FlatList } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Input, Toast, List, ListItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import { formStyles } from './../../..//assets/styles/app';
import { Actions } from 'react-native-router-flux';
import Schedule from './../../../models/ScheduleModel';
import AppointmentItem from './../../../components/AppointmentItem';
import Calendar from './../../../components/calendar/Calendar';
import moment from 'moment-jalaali';

export default class Appointments extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            dataList: []
        }

        this.onSelectDate = this.onSelectDate.bind(this);
    }

    componentWillMount()
    {
        let currentDate = moment().format('jYYYY/jM/jD');

        let data = Schedule.findByDate(currentDate);

        this.setState({ 
            dataList: data
        });
    }

    onSelectDate(date)
    {
        let currentDate = date.format('jYYYY/jM/jD');

        let data = Schedule.findByDate(currentDate);

        this.setState({ 
            dataList: data
        });
    }

    _renderEmptyList()
    {
        return (
            <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'IRANSans', color: '#777979'}}>نوبتی برای نمایش وجود ندارد</Text>
            </View>
        );
    }

    /*
     *   Render JSX views
    */
    render() {
    	
        return (
            <Container>
                <Content>
                    <Calendar onSelectDate={this.onSelectDate} />
                    <List>
                        <FlatList
                            keyExtractor={item => item.id}
                            data={this.state.dataList}
                            renderItem={({ item }) => (
                                <AppointmentItem data={item} />
                            )}
                            ListEmptyComponent={() => this._renderEmptyList()}
                        />
                    </List>
                </Content>
            </Container>
        )
    }

}