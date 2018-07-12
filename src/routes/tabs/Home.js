import React from 'react';
import { AsyncStorage , AppState, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, View, Thumbnail } from "native-base";
import { Actions } from 'react-native-router-flux';
import { HomeStyles } from './../../assets/styles/app';
import LinearGradient from "react-native-linear-gradient";

export default class Home extends React.Component {

    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    /*
     * Check if App background Lifecycle started kill app process
    */
    componentDidMount()
    {
        // AppState.addEventListener('change', (state) => {
        //     if (state === 'active') {
        //         console.log('state active');
        //     } 
        //    if(state === 'background'){
        //         setTimeout(() => { this.onSignOutPress() }, 15000);
        //    }
        // });
    }

    // SignOut 
	onSignOutPress()
	{
		AsyncStorage.removeItem('ACCESS_TOKEN');
		Actions.reset('auth');
	}

    /*
     *   Render JSX views
    */
    render() {
        return (
            <Container>
                <Header noShadow androidStatusBarColor="rgba(0, 0, 0, .6)" style={{backgroundColor: '#212552'}}>
                <Body>
                    <Title style={{fontFamily: 'IRANSans'}}>آله</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="ios-notifications-outline" style={{fontSize: 28}}/>
                    </Button>
                    <Button transparent onPress={this.onSignOutPress.bind(this)}>
                        <Icon name="ios-power" style={{fontSize: 24}}/>
                    </Button>
                </Right>
                </Header>
                <Content>
                    <ScrollView>
                    
                        <View style={styles.headerContainer} >
                            <View style={styles.headerContainerBackground} >
                            <LinearGradient colors={[ "#21254e", "#2b4a83" ]} style={styles.headerContainerShape}>
                                    
                                    <Image style={{width: '100%', height: '100%', position: 'absolute'}} source={require('./../../assets/img/wave.png')} />

                                    <View style={styles.headerProfileElement}>
                                        <View style={styles.headerAvatarContainer}>
                                            <Image style={{width: 120, height: 120, borderRadius: 120 / 2}} source={require('./../../assets/img/avatar.png')} />
                                        </View>

                                        <View style={styles.headerUserIdContainer}>
                                            <Text style={styles.userId}>#544234</Text>
                                        </View>
                                    </View>

                                </LinearGradient>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>

                            <Button transparent style={[styles.item, {borderLeftWidth: 0, borderTopWidth: 0}]} onPress={() => Actions.patients()} >
                                <Icon name="md-people" style={styles.itemIcon} />
                                <Text style={styles.itemTitle}> مراجعه کننده گان </Text>
                            </Button>

                            <Button transparent style={[styles.item, {borderWidth: 0}]} onPress={() => Actions.payments()} >
                                <Icon name="md-card" style={styles.itemIcon} />
                                <Text style={styles.itemTitle}> پرداخت ها </Text>
                            </Button>

                            <Button transparent style={[styles.item, {borderWidth: 0}]} onPress={() => {}} >
                                <Icon name="md-card" style={styles.itemIcon} />
                                <Text style={styles.itemTitle}> منشی ها </Text>
                            </Button>

                            <Button transparent style={[styles.item, {borderRightWidth: 0, borderBottomWidth: 0}]} onPress={() => Actions.meetingTimes()} >
                                <Icon name="md-time" style={styles.itemIcon} />
                                <Text style={styles.itemTitle}> زمان بندی </Text>
                            </Button>

                        </View>

                    </ScrollView>
                </Content>

            </Container>
        )
    }

}

const window = Dimensions.get('window');
const styles = {
    headerContainer: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 1.7
    },
    headerContainerBackground: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    headerContainerShape: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
    },
    headerProfileElement: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerAvatarContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerUserIdContainer: {
        marginTop: 10,
        backgroundColor: '#f4f3f3',
        borderRadius: 20,
        paddingRight: 18,
        paddingLeft: 18,
        alignItems: 'center',
        marginTop: -20
    },
    userId: {
        color: '#585656',
        fontFamily: 'IRANSans', 
        fontSize: 18,
        paddingTop: 7
    },
    item: {
        width: window.width * 0.4,
        height: 100,
        borderWidth: 1,
        borderColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'   
    },
    itemIcon: {
        fontSize: 35,
        color: 'rgba(0, 0, 0, .6)'
    },
    itemTitle: {
        fontFamily: 'IRANSans',
        color: 'rgba(0, 0, 0, .6)',
        fontSize: 16,
        paddingTop: 10
    },
  }
  
    