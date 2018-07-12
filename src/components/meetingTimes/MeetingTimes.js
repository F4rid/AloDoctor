//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { apStyles } from './../../assets/styles/app';
import Time from './Time';
import Schedule from './../../models/ScheduleModel';
import MeetingTime from './../../models/MeetingTimeModel';

// create a component
class MeetingTimes extends Component {

        constructor(props)
        {
                super(props);

                this.state = {
                        date: this.props.date,
                        timeScheduling: []
                }

                this.initialState = this.initialState.bind(this);
        }

        componentWillMount()
        {
                this.initialState(this.state.date);                
        }

        componentWillReceiveProps(nextProps) 
        {
                if (nextProps.date !== this.props.date) {
                        
                        this.handleTime('');
                        this.initialState(nextProps.date);

                }
        }

        handleTime(data)
        {
                this.props.onChangeSelectTime(data.time);
        }

        initialState(date)
        {
                let times = _.values( MeetingTime.all() );
                let schedule = Schedule.findByDate(date);

                if (schedule !== undefined)
                {
                        for(let i = 0; i < times.length; i++)
                        {
                                for(let j = 0; j < schedule.length; j++)
                                {
                                        if(schedule[j].time === times[i].time)
                                        {
                                                times[i].status = true;
                                                times[i].used = true;
                                        }
                                }
                        }
                }
                
                this.state.timeScheduling = times;
        }

        render() {
                return (
                        <View style={{flexDirection: 'row'}}>       
                             {this.state.timeScheduling.map((time, index) =>
                                <Time data={time} key={index} onChangeTime={this.handleTime.bind(this)}/>
                            )}
                        </View>
                );
        }
}

//make this component available to the app
export default MeetingTimes;

