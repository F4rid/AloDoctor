import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Input, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { formStyles } from './../assets/styles/app';
// import LinearGradient from "react-native-linear-gradient";
import { Actions } from 'react-native-router-flux';
import User from './../models/UserModel';
import DB from './../mixins/DB';
import Icon from 'react-native-vector-icons/EvilIcons';
import RNExitApp from 'react-native-exit-app';
import { connect } from 'react-redux';
import { setUser } from './../redux/actions';

class Login extends Component {

    /*
     *   constructor accept some props passed from another page
     *   @params: props
    */
    constructor(props)
    {
        super(props);
    }

    /*
     *   Set default states in componentWillMount Lifecycle method
    */
    componentWillMount() 
    {
        this.props.setUser({
            id: 2,
            name: 'shler'
        })
        this.setState({
            phoneNumber: {
                value: '',
                error: ''
            },
            password: {
                value: '',
                error: ''
            }
        });
    }

    
    /*
     *   Render JSX views
    */
    render() 
    {
        const phoneNumberError = this.state.phoneNumber.error;
        const passwordError = this.state.password.error;

        return (
            <Container>
                <Content>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 200 }}>
                        <Text style={{fontSize: 26}}>Aleh</Text>
                    </View>
                    <Form style={formStyles.StyleForm}>
                        <Item rounded style={formStyles.item} error={phoneNumberError !== ''}>
                            <Icon active name="sc-telegram" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='شماره تماس'
                                style={formStyles.input}
                                maxLength={11}
                                onChangeText={this.OnChangePhoneNumberInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(phoneNumberError)]}>{this.state.phoneNumber.error}</Text>
                        <Item rounded style={formStyles.item} error={passwordError !== ''}>
                            <Icon active name="unlock" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='Password'
                                style={formStyles.input}
                                secureTextEntry
                                maxLength={20}
                                onChangeText={this.OnChangePasswordInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(passwordError)]}>{this.state.password.error}</Text>

                        <Grid style={{justifyContent: 'center', marginTop: 30}}>
                            <Button style={formStyles.submitButton} onPress={ this.login.bind(this) }>
                                <Text style={formStyles.submitText}>ورود به اپلیکیشن</Text>
                            </Button>
                            <Button style={formStyles.cancelButton} onPress={ () => RNExitApp.exitApp() }>
                                <Text style={formStyles.submitText}>خروج از اپلیکیشن</Text>
                            </Button>
                        </Grid>

                    </Form>
                </Content>
            </Container>
        );
    }

    // Show/Hide error element
    _checkDisplay(field) {
        return { display: field === '' ? 'none' : 'flex'}
    }

    /*
     * update state
     * @params: text
    */
    OnChangePhoneNumberInput(text) {
        this.setState({
            phoneNumber: {
                value : text,
                error : ''
            }
        })
    }

    /*
     * update state
     * @params: text
    */
    OnChangePasswordInput(text) {
        this.setState({
            password: {
                value : text,
                error : ''
            }
        })
    }

    /*
     *   Login method for validation and pass data to persist
     *   @params: phoneNumber
     *   @params: password
    */
    async login(event)
    {
        let { phoneNumber, password } = this.state;

        // Validation for check nulled filed
        if(phoneNumber.value === '') {
            this.setState({
                phoneNumber: {
                    value: phoneNumber.value,
                    error: 'فیلد شماره تماس نمی تواند خالی بماند'
                }
            });
            return;
        }

        // Validation for check length grather then 11
        if(phoneNumber.value.toString().length < 11) {
            this.setState({
                phoneNumber: {
                    value: phoneNumber.value,
                    error: 'فیلد شماره تماس باید ۱۱ رفم باشد'
                }
            });
            return;
        }

        // Validation for check expression just include digits
        let digitTestRegex = new RegExp('^[0-9]+$');
        if(! digitTestRegex.test(phoneNumber.value) ) {
            this.setState({
                phoneNumber: {
                    value: phoneNumber.value,
                    error: 'شماره تماس فقط می تواند عددی باشد'
                }
            });
            return;
        }

        // Validation for check nulled filed
        if(password.value === '') {
            this.setState({
                password : {
                    value : password.value,
                    error : 'فیلد کلمه عبور نمی تواند خالی بماند'
                }
            });
            return;
        }

        this.authWith({
            phoneNumber: phoneNumber.value,
            password: password.value
        });
    }

    /*
     *   Check user data honsty
     *   @params: params
    */
    async authWith(params)
    {
        let { phoneNumber , password } = params;

        // find user in db
        let user = User.find(phoneNumber);

        // check if user exist
        if (user === undefined) {
            Toast.show({
                text: 'کاربری با این مشخصات وجود ندارد',
                position: 'bottom',
                buttonText: '',
                textStyle: {
                    fontFamily: 'IRANSans'
                }
            });
            return;
        }

        // check user, password authority
        if (user[0].password == DB.Hash(password))
        {
            // Generate token for session key
            let accessToken = DB.generateToken();

            // Update user accessToken field
            User.update(user[0], () => {
              user[0].accessToken = accessToken;
            });

            // Store token in AsyncStorge
            await this.storeToken(accessToken);

            // Redirect to Root route
            Actions.reset('tabbar');
        }else{
            Toast.show({
                text: 'کلمه عبور وارد شده صحیح نمی باشد',
                position: 'bottom',
                buttonText: '',
                textStyle: {
                    fontFamily: 'IRANSans'
                }
            });
            return;
        }
    }

    // Store ACCESS_TOKEN in device storge
    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
        } catch(error) {
            console.log("Something went wrong");
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => {
            dispatch( setUser(user) )
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);