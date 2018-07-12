//import liraries
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, View,Thumbnail, ListItem, Spinner, Badge } from "native-base";
import User from './../../models/UserModel';
import Schedule from './../../models/ScheduleModel';
import { Actions } from 'react-native-router-flux';
import Timeline from 'react-native-timeline-listview'

// create a component
class PatientProfile extends Component {

        constructor(props)
        {
                super(props);

                this.data = [
                        {time: '09:00', title: '۱۳۹۷/۳/۵', description: 'قلی شکیاووووووووووووووووووو'},
                        {time: '09:00', title: '۱۳۹۷/۳/۵', description: 'قلی شکیاووووووووووووووووووو'},
                        {time: '09:00', title: '۱۳۹۷/۳/۵', description: 'قلی شکیاووووووووووووووووووو'},
                        {time: '09:00', title: '۱۳۹۷/۳/۵', description: 'قلی شکیاووووووووووووووووووو'},
                        {time: '09:00', title: '۱۳۹۷/۳/۵', description: 'قلی شکیاووووووووووووووووووو'},
                ]
        }

        acceptAppointment(data)
        {
                Schedule.update(data, () => {
                        data.status = "accepted"
                });
        }

        refuseAppointment(data)
        {
                Schedule.update(data, () => {
                        data.status = "waiting"
                });
        }

        startConversation(user)
        {
                Actions.chat({ user: user });
        }

        render() {
                const { data } = this.props;
                const user = User.findByNationalCode(data.user_national_code)[0];

                return (
                        <Container>
                                <Content>

                                        {/* <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                                <Image style={{width: 100, height: 100, borderRadius: 100 / 2}} source={require('./../../assets/img/avatar.png')} />
                                                <Text style={{textAlign: 'center', fontFamily: 'IRANSans', backgroundColor: '#f7f7f7', borderRadius: 7, paddingRight: 10, paddingLeft: 10, marginTop: -20}}>فرید محمدی</Text>
                                        </View> */}

                                        <View style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dedfe0', padding: 10}}>                                                
                                                <View style={{width: '50%'}}>
                                                        <Text style={styles.patientName}>{data.date}</Text>
                                                </View>
                                                <View style={{width: '50%'}}>
                                                        <Text style={styles.patientName}>{data.time}</Text>
                                                </View>
                                        </View>
                                        <View style={{width: '100%', padding: 0, margin: 0}}>                                                
                                                <Text style={styles.patientName}>{user.name}</Text>
                                        </View>
                                        <View style={{width: '100%', padding: 0, margin: 0}}>                                                
                                                <Text style={styles.patientName}>{data.user_national_code}</Text>
                                        </View>
                                        <View style={{width: '100%', padding: 0, margin: 0}}>                                                
                                                <Text style={styles.patientName}>{user.phoneNumber}</Text>
                                        </View>
                                        <View style={{width: '100%', backgroundColor: 'red'}}>                                                
                                                <Text style={styles.patientName}>{data.cause_of_referral}</Text>
                                        </View>

                                        <Button onPress={this.acceptAppointment(data)}>
                                                <Text>اتمام پذیرش</Text>
                                        </Button>

                                        <Button onPress={this.refuseAppointment(data)}>
                                                <Text>رد پذیرش</Text>
                                        </Button>

                                        <Button onPress={() => this.startConversation(user)}>
                                                <Text>مکالمه</Text>
                                        </Button>

                                        <View style={styles.container}>
                                                <Timeline 
                                                style={styles.list}
                                                data={this.data}
                                                columnFormat='single-column-right'
                                                />
                                        </View>

                                        {/* <Text>۲۰:۰۰ تا ۲۰:۰۰</Text>
                                        <Text>۱۳۹۷/۳/۲</Text>

                                        <Text>مبلغ پرداختی : ۲۰۰۰۰</Text>

                                        <Button>
                                                <Text>افزودن پرداخت جدید</Text>
                                        </Button>
                                        <Text>پرداختی ها</Text>
                                        <Text>سوابق</Text> */}
                                </Content>
                        </Container>
                );
        }
}

// define your styles
const styles = StyleSheet.create({
        patientName: {
                textAlign: 'center', fontFamily: 'IRANSans', fontSize: 20
        },
        container: {
                flex: 1,
                padding: 20,
        },
        list: {
                flex: 1,
        },
            
});

//make this component available to the app
export default PatientProfile;
