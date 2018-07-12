//import liraries
import React, { Component } from 'react';
import {Image} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button , Icon, View} from 'native-base';
import { Actions } from 'react-native-router-flux';

// create a component
class Messages extends Component {

        constructor(props)
        {
                super(props);

                this.state = {
                        dataList: []
                }
        }

        _renderMessages()
        {
                return (
                        <Content>
                                <List>
                                        <ListItem avatar onPress={() => Actions.chat()}>
                                                <Left>
                                                        <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn-H-b5EVy3_kkAEG-qC2mC1uD-EcEVcimgzSkc1DjrQdFV-Uh' }} />
                                                </Left>
                                                <Body>
                                                        <Text style={{fontFamily: 'IRANSans'}}>مونیکا بولیچی</Text>
                                                        <Text note style={{fontFamily: 'IRANSans'}}>بله آخرین تغییرات رو براتون فرستادم ...</Text>
                                                </Body>
                                                <Right>
                                                        <Text note style={{fontFamily: 'IRANSans'}}>10:20</Text>
                                                </Right>
                                        </ListItem>
                                </List>
                        </Content>
                );
        }

        _renderEmpty() 
        {
                return (
                        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <Icon name="ios-chatbubbles-outline" style={{fontSize: 50, color: '#777979'}}/>
                                <Text style={{fontFamily: 'IRANSans', color: '#777979', marginTop: 10}}>پیامی برای مشاهده وجود ندارد</Text>
                        </View>
                );
        }

        render() {
                return (
                        <Container>
                                {
                                        this.state.dataList.length > 0 ? this._renderMessages() : this._renderEmpty()
                                }
                        </Container>

                );
        }
}

//make this component available to the app
export default Messages;
