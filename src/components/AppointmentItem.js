
import React from 'react';
import { Container , View , Text , Left, Right, Content, ListItem, Body, Icon } from 'native-base';
import { apStyles } from './../assets/styles/app';
import { Actions } from 'react-native-router-flux';
import Schedule from './../models/ScheduleModel';
import User from './../models/UserModel';

export default class AppointmentItem extends React.Component {

    delete(id)
    {
        Schedule.destroy(id);
    }

    /*
     *   Render JSX views
    */
    render() {
        const { data } = this.props;
        const user_name = User.findByNationalCode(data.user_national_code)[0].name;
        return (
            <ListItem avatar onPress={() => Actions.patientProfile({title: user_name, data}) }>
                <Left style={{flex: .13}}>
                    <Icon name="ios-contact-outline" style={{fontSize: 42, color: 'rgba(0, 0, 0, .6)', flex: 1}} onPress={ () => this.delete(data.id) }/>
                </Left>
                <Body>
                    <Text style={apStyles.apText}>
                        { user_name }
                    </Text>
                    <Text note style={apStyles.apText}>
                        { data.user_national_code }
                    </Text>
                </Body>
                <Right>
                    <Text note style={apStyles.apText}>
                        { data.time }
                    </Text>
                    <View>
                        <View style={[apStyles.circle, {
                            backgroundColor: (data.status == 'waiting') ? '#f44336' : '#2196f3'
                        }
                        ]}></View>
                    </View>
                </Right>
            </ListItem>
        )
    }

}