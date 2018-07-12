import React from 'react';
import { AsyncStorage , StyleSheet } from 'react-native';
import { Container , View , Text , Left , Button , Right , Content , Form , Item , Input, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import { formStyles } from './../../../assets/styles/app';
import { Actions } from 'react-native-router-flux';
import User from './../../../models/UserModel';
import DB from './../../../mixins/DB';

export default class ManageSecretaries extends React.Component {

    /*
     *   constructor accept some props passed from another page and showToast for show toast
     *   @params: props
    */
	constructor(props)
	{
		super(props);

		this.state = {
			showToast: false
		}
	}

    /*
     *   Set default states in componentWillMount Lifecycle method
    */
	componentWillMount() {
        this.setState({
            name: {
                value: '',
                error: ''
            },
            phoneNumber: {
                value: '',
                error: ''
            },
            nationalCode: {
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
    render() {
    	const nameError = this.state.name.error;
        const passwordError = this.state.password.error;
        const phoneNumberError = this.state.phoneNumber.error;
        const nationalCodeError = this.state.nationalCode.error;

        return (
            <Container>
                <Content>
                    <Form style={formStyles.StyleForm}>
                    	<Item rounded style={formStyles.item} error={nameError !== ''}>
                        	<Icon active name="user" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='نام و نام خانوادگی'
                                style={formStyles.input}
                                onChangeText={this.OnChangeNameInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(nameError)]}>پر کردن این فیلد الزامی است</Text>

                        <Item rounded style={formStyles.item} error={nationalCodeError !== ''}>
                        	<Icon active name="sc-telegram" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='شماره ملی'
                                style={formStyles.input}
                                onChangeText={this.OnChangeNationalCodeInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(nationalCodeError)]}>پر کردن این فیلد الزامی است</Text>
                        
                        <Item rounded style={formStyles.item} error={phoneNumberError !== ''}>
                        	<Icon active name="sc-telegram" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='شماره تماس'
                                style={formStyles.input}
                                onChangeText={this.OnChangePhoneNumberInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(phoneNumberError)]}>پر کردن این فیلد الزامی است</Text>
                        
                        <Item rounded style={formStyles.item} error={passwordError !== ''}>
                        	<Icon active name="unlock" size={40} color="rgba(0, 0, 0, .6)" />
                            <Input
                                placeholder='Password'
                                style={formStyles.input}
                                secureTextEntry
                                onChangeText={this.OnChangePasswordInput.bind(this)}
                            />
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(passwordError)]}>پر کردن این فیلد الزامی است</Text>
                        
                        <Grid style={{justifyContent: 'center', marginTop: 30}}>
                            <Button full style={formStyles.submitButton} onPress={ this.register.bind(this) }>
                                <Text style={formStyles.submitText}>ثبت اطلاعات</Text>
                            </Button>
                        </Grid>
                        
                    </Form>
                </Content>
            </Container>
        )
    }

    // Show/Hide error element
    _checkDisplay(field) {
        return { display: field === '' ? 'none' : 'flex'}
    }

    /*
     *   Register method for validation and pass data to persist
     *   @params: name
     *   @params: phoneNumber
     *   @params: password
    */
    register() {
        let { name, phoneNumber, password } = this.state;

        // Validation for check nulled filed
        if(name.value === '') {
            this.setState({
                name : {
                    value : '',
                    error : 'فیلد ایمیل نمی تواند خالی بماند'
                }
            });
            return;
        }

        // Validation for check nulled filed
        if(nationalCode.value === '') {
            this.setState({
                nationalCode: {
                    value: '',
                    error: 'فیلد شماره ملی نمی تواند خالی بماند'
                }
            });
            return;
        }

        // Validation for check nulled filed
        if(phoneNumber.value === '') {
            this.setState({
                phoneNumber: {
                    value: '',
                    error: 'فیلد شماره تماس نمی تواند خالی بماند'
                }
            });
            return;
        }

        // Validation for check nulled filed       
		if(password.value === '') {
            this.setState({
                password : {
                    value : '',
                    error : 'فیلد کلمه عبور نمی تواند خالی بماند'
                }
            });
            return;
        }

        // Persist user
        this.persistUser({
            name: name.value,
            phoneNumber: phoneNumber.value,
            nationalCode: nationalCode.value,
            password: password.value
        })

    }

    /*
     * update state
     * @params: text
    */
    OnChangeNameInput(text) {
        this.setState({
            name: {
                value : text,
                error : ''
            }
        })
    }
    
    /*
     * update state
     * @params: text
    */
    OnChangeNationalCodeInput(text) {
        this.setState({
            nationalCode: {
                value : text,
                error : ''
            }
        })
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

    // Store User data with UserService and User Model
    persistUser(params)
    {
    	let { name, nationalCode, phoneNumber , password } = params;

    	let user = new User(name, 'secretary', phoneNumber, nationalCode , DB.Hash(password));
		User.save(user);

		Toast.show({
			text: 'کاربر با موفقیت ثبت شد',
			position: 'bottom',
			buttonText: '',
			textStyle: {
				fontFamily: 'IRANSans'
			}
		});
    }


}