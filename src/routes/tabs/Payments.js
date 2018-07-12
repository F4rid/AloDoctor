//import liraries
import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, View,Thumbnail, ListItem, Spinner, Badge } from "native-base";
import Payment from './../../models/PaymentModel';
import {Actions} from 'react-native-router-flux';
import AnimateNumber from 'react-native-animate-number';

// create a component
class Payments extends Component {
        constructor(props)
        {
                super(props);

                this.state = {
                        dataList: [],
                        total: ''
                }
        }

        componentWillMount()
        {
                this.getPayments();
        }

        _keyExtractor = (item, index) => item.id;

        _renderItem = ({item}) => (
                <ListItem>
                        <Body style={styles.itemBody}>

                                <View style={styles.paymentName}>
                                        <Text style={styles.paymentNameText}>پرداخت کننده: {item.name}</Text>
                                </View>

                                <View style={styles.paymentAmount}>
                                        <Icon name="md-trending-up" style={styles.paymentAmountIcon}/>
                                        <Text style={styles.paymentAmountText}>مبلغ {item.amount}</Text>
                                        <Badge style={styles.paymentBadge}>
                                                <Text style={styles.paymentBadgeText}>تومان</Text>
                                        </Badge>
                                </View>
                        </Body>
                        <Right>
                                <View style={styles.paymentDate}>
                                        <Text style={styles.paymentDateText}>۲ روز قبل</Text>
                                </View>
                        </Right>
                </ListItem>
        );

        getPayments()
        {
                this.setState({
                        dataList: Payment.all()
                }, () => {

                        let sum = 0;
                        for (let i = 0; i < this.state.dataList.length; i++) {
                                sum += this.state.dataList[i].amount;
                        }

                        this.setState({total: sum})
                });
        }

        render() {
                return (
                        <Container>
                                <Content>
                                        <View style={styles.total}>
                                                <Text style={styles.totalText}>کل پرداختی</Text>
                                                <AnimateNumber style={styles.totalCounter} interval={100} value={this.state.total} timing="linear" formatter={(val) => {
                                                        return parseInt(val) +  ' تومان '
                                                }}/>
                                        </View>
                                        <FlatList
                                                data={this.state.dataList}
                                                keyExtractor={this._keyExtractor}
                                                renderItem={this._renderItem}
                                        />
                                </Content>
                        </Container>
                );
        }
}

// define your styles
const styles = StyleSheet.create({
       itemBody: {
                flexDirection: 'column', flex: 1
       },
       paymentName: {
                flexDirection: 'row', flex: 1, paddingBottom: 5
       },
       paymentNameText: {
                fontFamily: 'IRANSans', fontSize: 17
       },
       paymentAmount: {
                flexDirection: 'row', flex: 1, paddingTop: 5
       },
       paymentAmountIcon: {
                color: 'green', marginRight: 5
       },
       paymentAmountText: {
                fontFamily: 'IRANSans'
       },
       paymentBadge: {
                backgroundColor: '#f7f7f7', marginLeft: 5
       },
       paymentBadgeText: {
                color: '#000', fontFamily: 'IRANSans', marginRight: 5
       },
       paymentDate: {
                flexDirection: 'row'
       },
       paymentDateText: {
                color: '#000', fontFamily: 'IRANSans', fontSize: 13, marginRight: 10  
       },
       total: {
                width: '100%', justifyContent: 'center', padding: 30
       },
       totalText: {
                fontFamily: 'IRANSans', textAlign: 'center'
       },
       totalCounter: {
                fontFamily: 'IRANSans', fontSize: 26, textAlign: 'center'
       }

});

//make this component available to the app
export default Payments;
