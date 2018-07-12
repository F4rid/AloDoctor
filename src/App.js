import React, { Component } from 'react';

import Login from "./routes/Login";
import Splash from "./routes/Splash";
import {
    Home,
    AddAppointment,
    Appointments,
    AppointmentDetails,
    Messages,
    Chat,
    Setting,
    ManageSecretaries,
    MeetingTimes,
    Patients,
    Payments,
    PatientProfile,
} from './routes/tabs';

import { Router , Scene, Tabs, Lightbox, Actions } from 'react-native-router-flux';
import { globalStyles } from './assets/styles/app';
import { Root, Icon } from 'native-base';
import {StatusBar} from 'react-native';
import { connect, Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {
	render() 
	{
        const RouterWithRedux = connect()(Router);

	    return (
            <Provider store={store}>
                <Root>
                    {/* <StatusBar
                        backgroundColor=""
                    /> */}
                    <RouterWithRedux>                            
                            <Scene key="root" navigationBarStyle={globalStyles.navBar} titleStyle={globalStyles.navBarTitle}>

                                <Tabs  key="tabbar" tabBarPosition="bottom" labelStyle={{fontFamily: 'IRANSans'}} tabBarStyle={globalStyles.tabBarStyle} showLabel={true} >
                                    
                                    <Scene key="welcome" 
                                        hideNavBar={true}
                                        title="آله" 
                                        component={ Home } 
                                        initial 
                                        icon={() => <Icon name="ios-pulse-outline" size={40} />} 
                                    />

                                    <Scene key="addAppointment"
                                        title="ثبت نوبت جدید" 
                                        component={ AddAppointment } 
                                        back={true} 
                                        backButtonTintColor="#ffffff" 
                                        icon={() => <Icon name="ios-git-network" size={40} />} 
                                    />

                                    <Scene key="appointments"
                                        title="نوبت ها"  
                                        component={ Appointments } 
                                        back={true} 
                                        backButtonTintColor="#ffffff" 
                                        icon={() => <Icon name="ios-calendar-outline" size={40} />} />

                                    <Scene key="messages" 
                                        title="پیام ها" 
                                        component={ Messages } 
                                        back={true} 
                                        backButtonTintColor="#ffffff" 
                                        icon={() => <Icon name="ios-chatbubbles-outline" size={40} />} />


                                    <Scene key="profile"
                                        title="تنظیمات حساب" 
                                        component={ Setting } 
                                        back={true} 
                                        backButtonTintColor="#ffffff" 
                                        icon={() => <Icon name="ios-analytics-outline" size={40} />} />

                                </Tabs>

                                <Scene key="patients" 
                                       component={Patients} 
                                       title="مراجعه کننده گان" 
                                       back={true} 
                                       backButtonTintColor="#ffffff" />

                                <Scene key="patientProfile" 
                                       component={PatientProfile} 
                                       title="" 
                                       back={true} 
                                       backButtonTintColor="#ffffff" />

                                <Scene key="payments" 
                                       component={Payments} 
                                       title="تراکنش ها" 
                                       back={true} 
                                       backButtonTintColor="#ffffff" />

                                <Scene key="appointmentDetails" 
                                       component={AppointmentDetails} 
                                       title="جزئیات نوبت" 
                                       back={true} 
                                       backButtonTintColor="#ffffff" />     

                                <Scene key="chat" 
                                       component={Chat} 
                                       title="مکالمه" 
                                       back={true} 
                                       backButtonTintColor="#ffffff" />

                                <Scene key="createUser"
                                        component={ManageSecretaries} 
                                        title="افزودن منشی جدید" 
                                        back={true} 
                                        backButtonTintColor="#ffffff" />

                                <Scene key="meetingTimes" 
                                    component={MeetingTimes} 
                                    title="زمان بندی" 
                                    back={true} 
                                    hideNavBar={true}
                                    backButtonTintColor="#ffffff" />
                                
                                <Scene key="auth" component={Login} hideNavBar/>
                                <Scene key="splash" component={Splash} hideNavBar initial/>
                            </Scene>

                    </RouterWithRedux>
                </Root>
            </Provider>
	    );
	}
}
