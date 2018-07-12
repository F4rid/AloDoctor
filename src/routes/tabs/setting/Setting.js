import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, View, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Setting extends React.Component {

    constructor()
    {
        super();

        this.state = {
            info: true,
            backup: true
        }
    }

	onCreateUserPress()
	{
		Actions.createUser();
    }
    
    onSchedulePress()
	{
		Actions.meetingTimes();
    }

    render() {
        return (
            <Container>
                <Content style={styles.Content}>
                    <List style={styles.List}>

                        <ListItem style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>اعتبار حساب</Text>
                            </Body>
                            <Right style={{flexDirection: 'row-reverse'}}>                                
                                <Thumbnail square small source={require('./../../../assets/img/coin.png')} /> 
                                <Text style={{fontFamily: 'IRANSans', fontSize: 18, marginRight: 10}}>67</Text>                               
                            </Right>
                        </ListItem>

                        <ListItem style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>ویرایش اطلاعات کاربری</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-back" />
                            </Right>
                        </ListItem>

                        <ListItem onPress={this.onCreateUserPress.bind(this)} style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>مدیریت منشی ها</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-back" />
                            </Right>
                        </ListItem>

                        <ListItem onPress={this.onSchedulePress.bind(this)} style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>زمان بندی مراجعات</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-back" />
                            </Right>
                        </ListItem>

                        <ListItem style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>ارسال اطلاعات فنی</Text>
                                <Text note style={{fontFamily: 'IRANSans'}}>با فعال سازی این گزینه به ما کمک می کنید تا با دریافت اطلاعات فنی برنامه در بهبود نسخه های آینده اپلیکیشن بکوشیم.</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.info} onValueChange={() => this.setState({info: !this.state.info})}/>
                            </Right>                      
                        </ListItem>

                        <ListItem style={styles.ListItem}>
                            <Body>
                                <Text style={{fontFamily: 'IRANSans'}}>تهیه نسخه پشتیبان</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.backup} onValueChange={() => this.setState({backup: !this.state.backup})} />
                            </Right>
                        </ListItem>

                    </List>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    Content: {
        padding: 20
    },
    List: {
        backgroundColor: '#fff', borderRadius: 7
    },
    ListItem: {
        width: '100%', marginLeft: 0, marginRight: 0
    }
});