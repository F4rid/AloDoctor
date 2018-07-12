import React, { Component } from 'react';
import { AsyncStorage , StyleSheet, ScrollView, Image } from 'react-native';
import { Container , View , Text , Button , Icon , Content , Form , Item , Input, List, ListItem, Radio } from 'native-base';
import { formStyles } from './../../assets/styles/app';
import { Actions } from 'react-native-router-flux';
import Schedule from './../../models/ScheduleModel';
import User from './../../models/UserModel';
import Payment from './../../models/PaymentModel';
import moment from 'moment-jalaali';
import { PersianDatePicker } from './../../native/composer';
import MeetingTimes from './../../components/meetingTimes/MeetingTimes';
import Overlay from 'react-native-modal-overlay';
import Validator from './../../services/Validator';

const TODAY = moment().format('jYYYY/jM/jD');

export default class AddAppointment extends Component {

    /*
    *   constructor accept some props passed from another page and showToast for show toast
    *   @params: props
    */
    constructor(props)
    {
            super(props);

            this.state = {
                    showToast: false,
                    modalVisible: false,
            }

            this.cleanUp = this.cleanUp.bind(this);
            this.register = this.register.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    /*
    *   Set default states in componentWillMount Lifecycle method
    */
	componentWillMount() {

        this.cleanUp();

    }

    // Render form inputs
    _renderInput(params)
    {
        let {name, placeholder, icon, multiline = false, numberOfLines = 1, maxLength = 20} = params;
        let error = this.state[name].error;

        return (
            <View>
                <Item rounded style={formStyles.item} error={error !== ''}>
                    <Icon active name={icon} size={40} color="rgba(0, 0, 0, .6)" />
                    <Input
                        placeholder={placeholder}
                        style={formStyles.input}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        maxLength={maxLength}
                        onChangeText={(text) => this.setState({
                            [name]: {
                                value : text,
                                error : ''
                            }
                        })}
                    />
                </Item>
                <Text style={[formStyles.error , this._checkDisplay(error)]}>{error}</Text>
            </View>
        );
    }

    // Render overly modal
    _renderModal()
    {
        return (
            <Overlay visible={this.state.modalVisible}
                     closeOnTouchOutside animationType="fadeIn"
                     containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                     childrenWrapperStyle={{backgroundColor: '#eee'}}
                     animationDuration={200}
                     onClose={() => this.setModalVisible(false)}
                     childrenWrapperStyle={{borderRadius: 7}}
                     >

                    <View style={styles.modalHolder}>
                        <Text style={ styles.modalSuccessText }>نوبت با موفقیت ثبت گردید</Text>
                        <Image source={ require('./../../assets/img/successAp.png') } />

                        <View style={styles.modalButtonHolder}>
                            <Button style={styles.modalBackToHome} onPress={() => this.setModalVisible(false) }>
                                <Text style={styles.modalNormalText}>بازگشت</Text>
                            </Button>
                        </View>
                    </View>

         </Overlay>
        );
    }

    // Render JSX view
    render() {
        const dateTimeError = this.state.date.error || this.state.time.error;

        return (
            <Container>
                <Content>
                    <Form style={formStyles.StyleForm}>

                        {this._renderInput({name: 'name', placeholder: 'نام و نام خانوادگی', icon: 'ios-contact'})}

                        {this._renderInput({name: 'phoneNumber', placeholder: 'شماره تماس', icon: 'ios-call', maxLength: 11})}

                        {this._renderInput({name: 'nationalCode', placeholder: 'شماره ملی', icon: 'ios-finger-print', maxLength: 10})}
                        
                        {this._renderInput({name: 'causeOfReferral', placeholder: 'علت مراجعه', icon: 'ios-flask', multiline: true, numberOfLines: 4, maxLength: 200})}
                        
                        <Item rounded style={formStyles.item} error={dateTimeError !== ''}>
                            <Button transparent onPress={ this.showDatePicker.bind(this) }>
                                <Icon active name="md-calendar" size={40} style={{color: "rgba(0, 0, 0, .6)", paddingRight: -15}}/>
                            </Button>
                            <Text style={{ fontFamily: 'IRANSans' ,paddingLeft: 10 }}>{ this.state.date.value }</Text>
                            <Text style={{ fontFamily: 'IRANSans' }}>{ this.state.time.value }</Text>
                        </Item>
                        <Text style={[formStyles.error , this._checkDisplay(dateTimeError)]}>{dateTimeError}</Text>
                        
                        <View style={{marginBottom: 20}}>
                            <ScrollView
                                horizontal={true}                        
                                showsHorizontalScrollIndicator={false}    
                                automaticallyAdjustContentInsets={false}  
                                >
                                <MeetingTimes date={this.state.date.value} onChangeSelectTime={this.handleTimePicker.bind(this)}/>
                            </ScrollView>
                        </View>
                        
                        {this._renderInput({name: 'paymentAmount', placeholder: 'حق ویزیت', icon: 'ios-card', maxLength: 7})}
                        
                        <List style={{flexDirection: 'row'}}>
                            <ListItem>
                                <Radio onPress={ () => this.setState({ paymentType: { cash: true, card: false } }) }
                                    selected={this.state.paymentType.cash}
                                />
                                <Text style={{ fontFamily: 'IRANSans', marginLeft: 8 }}>پرداخت نقدی</Text>
                            </ListItem>
                            <ListItem>                            
                                <Radio onPress={ () => this.setState({ paymentType: { cash: false, card: true } }) }
                                    selected={this.state.paymentType.card}
                                />
                                <Text style={{ fontFamily: 'IRANSans', marginLeft: 8 }}>پرداخت کارت خوان</Text>
                            </ListItem>
                        </List>
                        
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
                            <View>
                                <Button style={formStyles.submitButton} onPress={ this.register.bind(this) }>
                                    <Text style={formStyles.submitText}>ثبت اطلاعات</Text>
                                </Button>
                            </View>
                            <View>
                                <Button style={formStyles.submitButton} onPress={() => this.cleanUp() }>
                                    <Text style={formStyles.submitText}>پاک کردن</Text>
                                </Button>
                            </View>
                        </View>
                        
                    </Form>
                </Content>

                {this._renderModal()}

            </Container>
        )
    }

    // Show/Hide error element
    _checkDisplay(field) {
        return { display: field === '' ? 'none' : 'flex'}
    }

    // show datepicker
    showDatePicker() {
        PersianDatePicker.setDatePicker(this.state.year, this.state.month, this.state.day)
            .then(date => {
                this.state.year = date.year;
                this.state.month = date.month;
                this.state.day = date.day;

                this.setState({
                    date: {
                        value: date.year + '/' + date.month + '/' + date.day,
                        error: ''
                    }
                });
            });
    }

    handleTimePicker(time)
    {
        this.setState({
            time: {
                value: time,
                error: ''
            }
        })
    }

    /*
     *   Register method for validation and pass data to persist
     *   @params: name
     *   @params: phoneNumber
     *   @params: nationalCode
    */
    register() {
        let { name, phoneNumber, nationalCode, time, date, causeOfReferral, paymentAmount, paymentType } = this.state;
        
        let checkExistError = false;
        
        let validation = new Validator([
            {
                field: 'name',
                value: name.value,
                text: 'نام',
                required: true,
            },
            {
                field: 'phoneNumber',
                value: phoneNumber.value,
                text: 'شماره تماس',
                required: true,
                mobile: true
            },
            {
                field: 'nationalCode',
                value: nationalCode.value,
                text: 'شماره ملی',
                required: true,
                nationalCode: true
            },
            {
                field: 'causeOfReferral',
                value: causeOfReferral.value,
                text: 'علت مراجعه',
                required: true
            },
            {
                field: 'paymentAmount',
                value: paymentAmount.value,
                text: 'حق ویزیت',
                required: true,
                numeric: true
            },
            {
                field: 'time',
                value: time.value,
                text: 'زمان مراجعه',
                required: true
            }
        ]).validate( (result) => {
     
            result.map((obj) => {
                this.setState(obj);
            });
        });
        
        if (validation)
        {
            alert("ok")
        }

        // Persist appointment
        this.persistAppointment({
            name: name.value,
            phoneNumber: phoneNumber.value,
            nationalCode: nationalCode.value,
            date: date.value,
            time: time.value,
            causeOfReferral: causeOfReferral.value,
            paymentAmount: paymentAmount.value,
            paymentType: (paymentType.cash == true) ? 'cash' : 'card'
        })

    }

    // Clean up
    cleanUp() 
    {
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
            causeOfReferral: {
                value: '',
                error: ''
            },
            paymentAmount: {
                value: '',
                error: ''
            },
            paymentType: {
                cash: true,
                card: false
            },
            year: parseInt ( moment().format('jYYYY') ),
            month: parseInt ( moment().format('jM') ),
            day: parseInt ( moment().format('jD') ),
            date: {
                value: TODAY,
                error: ''
            },
            time: {
                value: '',
                error: ''
            }
        });
    }

    // Get user
    async LogedInUser() {
        let user = undefined;
        let accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

        if (accessToken !== null)
        {
            user = User.findByToken(accessToken);

            if (user !== undefined)
                return user;
            else
                return undefined;
        }

    }

    // Store User data with UserService and User Model
    async persistAppointment(params)
    {
    	let { name, phoneNumber , nationalCode, date, time, causeOfReferral, paymentAmount, paymentType } = params;

        // 1. Persist user { name, phone, national_code }
        let existUser = User.findByNationalCode(nationalCode);
        if (existUser === undefined)
        {
            let patient = new User(name, 'patient', phoneNumber, nationalCode);
            User.save(patient);
        }
        
        // 2. Persist schdule { date, time, user_national_code, status }
        let secretary = await this.LogedInUser();

        if (secretary === undefined)
        {
            AsyncStorage.removeItem('ACCESS_TOKEN');
		    Actions.reset('auth');
        }

        let schedule = new Schedule(date, time, String(secretary[0].id), nationalCode, causeOfReferral, 'waiting');
        Schedule.save(schedule);

        // 3. Payment
        let payment = new Payment( String(schedule.id), parseInt(paymentAmount) , paymentType );
        Payment.save(payment);

        // 4. Clean up
        this.cleanUp();
        
        // 4. Show success modal
        this.setModalVisible(true)
    }


}

const styles = StyleSheet.create({
    modalHolder: {
        alignItems : 'center',
        flexDirection : 'column',
        width: '100%',
        height: '100%'
    },
    modalNormalText: {
        fontSize : 16,
        fontFamily: 'IRANSans',
        paddingTop: 10,
        color: 'rgba(0,0,0,.9)'
    },
    modalSuccessText: {
        fontSize: 24,
        color: '#4caf50',
        fontFamily: 'IRANSans',
        marginTop: 10
    },
    modalButtonHolder: {
        position: 'absolute',
        bottom: 0
    },
    modalBackToHome: {
        borderRadius: 5,
        backgroundColor : '#dee1e6',
        paddingRight: 25,
        paddingLeft: 25
    }
});