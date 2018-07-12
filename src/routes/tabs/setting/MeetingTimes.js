import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Button, Title, Icon, Form, Item, Input, Radio, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MeetingTime from './../../../models/MeetingTimeModel';
import Overlay from 'react-native-modal-overlay';
import { formStyles } from './../../../assets/styles/app';

const times = MeetingTime.all();

// create a component
class MeetingTimes extends Component {

        state = {
                modalVisible: false,
                meetingTime: {
                        value: '',
                        error: ''
                },
                AM: true,
                PM: false
        };

        setModalVisible(visible) {
                this.setState({modalVisible: visible});
        }
     
        handleRemoveTime(id)
        {
                MeetingTime.destroy(id);

                Actions.meetingTimes();
        }

        OnChangeMeetingTimeInput(text) {
                this.setState({
                        meetingTime: {
                                value : text,
                                error : ''
                        }
                });
        }

        addMeetingTime()
        {
                let time = this.state.meetingTime.value;
                let type = (this.state.AM == true) ? 'AM': 'PM';

                // Validation for check nulled filed
                if(time === '') {
                        this.setState({
                                meetingTime: {
                                        value : '',
                                        error : 'فیلد زمان نمی تواند خالی بماند'
                                }
                        });
                        return;
                }

                let timeObject = new MeetingTime(time, type);
                MeetingTime.save(timeObject);

                Actions.meetingTimes();

                this.setModalVisible(false)
        }

        // Show/Hide error element
        _checkDisplay(field) {
                return { display: field === '' ? 'none' : 'flex'}
        }

        render() {
                const meetingTimeError = this.state.meetingTime.error;
                return (
                        <Container>
                                <Header noShadow androidStatusBarColor="rgba(0, 0, 0, .6)" style={{backgroundColor: 'rgba(0, 0, 0, .6)'}}>
                                        <Left style={{flex: .3}}>
                                                <Button transparent onPress={() => Actions.pop()}>
                                                        <Icon name="arrow-forward" style={{color: 'white'}}/>
                                                </Button>
                                        </Left>
                                        <Body style={{flex: 1}}>
                                                <Title style={{fontFamily: 'IRANSans'}}>زمان بندی مراجعات</Title>
                                        </Body>
                                        <Right>
                                                <Button transparent onPress={() => this.setModalVisible(true)}>
                                                        <Icon name="md-add-circle" style={{fontSize: 24}}/>
                                                </Button>
                                        </Right>
                                </Header>
                                <Content>
                                        <List dataArray={times}
                                        renderRow={(item) =>
                                                <ListItem>                                                                                                                
                                                        <Body>
                                                                <Text style={{fontFamily: 'IRANSans'}}>{item.time}</Text>
                                                        </Body>
                                                        <Right>
                                                                <Button transparent onPress={ () => this.handleRemoveTime(item.id) }>
                                                                        <Icon name='ios-trash' style={{color: 'rgba(0,0,0,.8)'}}/>
                                                                </Button>
                                                        </Right>
                                                </ListItem>
                                        }>
                                        </List>
                                </Content>

                                <Overlay visible={this.state.modalVisible}
                                         closeOnTouchOutside animationType="fadeIn"
                                         containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                                         childrenWrapperStyle={{backgroundColor: '#ffffff'}}
                                         animationDuration={200}
                                         onClose={() => this.setModalVisible(false)}
                                         childrenWrapperStyle={{borderRadius: 7}}>

                                        <Form style={{width: '100%'}}>

                                                <View style={{marginBottom: 30, flexDirection: 'row', alignItems: 'center'}}>                                                        
                                                        <Thumbnail square small source={require('./../../../assets/img/clock.png')} /> 
                                                        <Text style={{ fontFamily: 'IRANSans', marginLeft: 15 }}>افزودن زمان بندی جدید</Text>
                                                </View>

                                                <Item rounded style={formStyles.item} error={meetingTimeError !== ''}>
                                                        <Icon active name="md-time" size={40} color="rgba(0, 0, 0, .6)" />
                                                        <Input
                                                        placeholder='زمان ویزیت'
                                                        style={formStyles.inputRTL}
                                                        onChangeText={this.OnChangeMeetingTimeInput.bind(this)}
                                                        />
                                                </Item>
                                                <Text style={[formStyles.error , this._checkDisplay(meetingTimeError)]}>پر کردن این فیلد الزامی است</Text>

                                                <List style={{flexDirection: 'row'}}>
                                                        <ListItem>
                                                        <Radio onPress={ () => this.setState({ AM: true, PM: false }) }
                                                                selected={this.state.AM}
                                                        />
                                                        <Text style={{ fontFamily: 'IRANSans', marginLeft: 8 }}>قبل از ظهر</Text>
                                                        </ListItem>
                                                        <ListItem>                            
                                                        <Radio onPress={ () => this.setState({ AM: false, PM: true }) }
                                                                selected={this.state.PM}
                                                        />
                                                        <Text style={{ fontFamily: 'IRANSans', marginLeft: 8 }}>بعد از ظهر</Text>
                                                        </ListItem>
                                                </List>

                                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                        <Button style={[formStyles.submitButton, {marginTop: 30}]} onPress={ this.addMeetingTime.bind(this) }>
                                                                <Text style={formStyles.submitText}>ثبت اطلاعات</Text>
                                                        </Button>
                                                </View>
                                        </Form>

                                </Overlay>
                                
                        </Container>
                );
        }
}

//make this component available to the app
export default MeetingTimes;
