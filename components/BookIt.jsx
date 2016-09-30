import _ from 'lodash';
import React from 'react';
import RoomActionCreators from '../actions/RoomActionCreators';

function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
    });
}

function minutesDiff(date, laterDate) {
    return Math.round((laterDate - date) / (1000 * 60));
}

export default React.createClass({
    propTypes: {
        roomId: React.PropTypes.string.isRequired,
        freeUntil: React.PropTypes.instanceOf(Date),
        busyUntil: React.PropTypes.instanceOf(Date),
        bookedBy: React.PropTypes.string,
        onEndBooking: React.PropTypes.func.isRequired,
    },

    render() {
        const currentDate = new Date();
        currentDate.setSeconds(0, 0);
        const minutes = currentDate.getMinutes();
        const closestHalfHour = minutes - minutes % 30;

        const nextHalfHour = _.clone(currentDate);
        nextHalfHour.setMinutes(closestHalfHour + 30);

        const nextHour = _.clone(currentDate);
        nextHour.setMinutes(closestHalfHour + 60);

        const nextHourAndHalf = _.clone(currentDate);
        nextHourAndHalf.setMinutes(closestHalfHour + 90);

        const nextTwoHours = _.clone(currentDate);
        nextTwoHours.setMinutes(closestHalfHour + 120);

        const remainingTime = this.props.freeUntil;
        remainingTime.setSeconds(0, 0);

        // const availableMoreThanAnHour = (remainingTime - currentDate) / ( 1000 * 60 * 60) > 1;

        const buttons = [];
        const remainingTimeButton = <button className="book" onClick={this.bookRoom(remainingTime)}>Book until {formatTime(remainingTime)}<br />({minutesDiff(currentDate, remainingTime)} minutes)</button>;

        if (nextHalfHour.getTime() < remainingTime.getTime()) {
            buttons.push(<button className="book" onClick={this.bookRoom(nextHalfHour)}>Book until {formatTime(nextHalfHour)}<br />({minutesDiff(currentDate, nextHalfHour)} minutes)</button>);
            if (nextHour.getTime() < remainingTime.getTime()) {
                buttons.push(<button className="book" onClick={this.bookRoom(nextHour)}>Book until {formatTime(nextHour)}<br />({minutesDiff(currentDate, nextHour)} minutes)</button>);
                if (nextHourAndHalf.getTime() < remainingTime.getTime()) {
                    buttons.push(<button className="book" onClick={this.bookRoom(nextHourAndHalf)}>Book until {formatTime(nextHourAndHalf)}<br />({minutesDiff(currentDate, nextHourAndHalf)} minutes)</button>);
                    if (nextTwoHours.getTime() < remainingTime.getTime()) {
                        buttons.push(<button className="book" onClick={this.bookRoom(nextTwoHours)}>Book until {formatTime(nextTwoHours)}<br />({minutesDiff(currentDate, nextTwoHours)} minutes)</button>);
                    } else {
                        buttons.push(remainingTimeButton);
                    }
                } else {
                    buttons.push(remainingTimeButton);
                }
            } else {
                buttons.push(remainingTimeButton);
            }
        }

        return (
            <div>
                <div className="mask" onClick={this.props.onEndBooking}>
                    <div className="booking-modal">
                        <h2>Reserve The {this.props.roomId}</h2>
                            <div>
                                {buttons}
                            </div>
                        <button className="cancel" onClick={this.props.onEndBooking}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    },

    bookRoom(bookUntil) {
        return () => {
            RoomActionCreators.bookRoom(this.props.roomId, bookUntil);
            this.props.onEndBooking();
        };
    },
});
