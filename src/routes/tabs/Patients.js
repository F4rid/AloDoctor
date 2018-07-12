//import liraries
import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, View,Thumbnail, ListItem, Spinner, Item, Input } from "native-base";
import User from './../../models/UserModel';
import { Actions } from 'react-native-router-flux'

// create a component
class Patients extends Component {

        constructor(props)
        {
                super(props);

                this.state = {
                        dataList: [],
                        query: ''
                }
        }

        componentWillMount()
        {
                this.getPatients();
        }

        _keyExtractor = (item, index) => item.id;

        _renderItem = ({item}) => (
                <ListItem avatar onPress={() => Actions.patientProfile({title: item.name, id: item.id})}>
                        <Left>
                                <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn-H-b5EVy3_kkAEG-qC2mC1uD-EcEVcimgzSkc1DjrQdFV-Uh' }} />
                        </Left>
                        <Body>
                                <Text style={{fontFamily: 'IRANSans', textAlign: 'left'}}>{item.name}</Text>
                                <Text note style={{fontFamily: 'IRANSans', textAlign: 'left'}}>{item.nationalCode}</Text>
                        </Body>
                        <Right>
                                <Icon name="ios-people" />
                        </Right>
                </ListItem>
        );

        getPatients()
        {
                let users = User.all();
                
                if (users != undefined)
                {
                        this.setState({
                                dataList: users
                        });
                }
        }

        handleSearch()
        {
                let users = [];

                if (this.state.query != '')
                {
                        users = User.search( this.state.query );

                        if (users != undefined)
                        {
                                this.setState({
                                        dataList: users
                                });
                        }

                        return ;
                }

                this.getPatients();
        }

        render() {
                return (
                        <Container>
                                <Header searchBar rounded noShadow androidStatusBarColor="rgba(0, 0, 0, .6)" style={{backgroundColor: '#212552', marginBottom: 10}}>
                                        <Item>
                                                <Icon name="ios-people" />
                                                <Input placeholder="جست و جو" onChangeText={(text) => this.setState({query: text})} style={{fontFamily: 'IRANSans', textAlign: 'right', paddingTop: 15}}/>
                                                <Icon name="ios-search" onPress={this.handleSearch.bind(this)}/>
                                        </Item>
                                        <Button transparent>
                                                <Text>جست و جو</Text>
                                        </Button>
                                </Header>
                                <Content>
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
        
});

//make this component available to the app
export default Patients;
