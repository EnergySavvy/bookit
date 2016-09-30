import React from 'react';
import {Link} from 'react-router';

import RoomActionCreators from '../actions/RoomActionCreators';
import RoomStore from '../stores/RoomStore';


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
        params: React.PropTypes.shape({
            roomId: React.PropTypes.string.isRequired,
        }),
        history: React.PropTypes.object,
    },

    componentWillMount() {
        this.onDataChange();
    },

    componentDidMount() {
        RoomStore.changeNotifier.register(this.onDataChange);
    },

    componentWillUnmount() {
        RoomStore.changeNotifier.unregister(this.onDataChange);
    },

    onDataChange() {
        const statuses = RoomStore.getRoomStatuses();
        const nextHalfHour = RoomStore.getNextHalfHour();
        const status = statuses[this.props.params.roomId];

        const bookUntil = this.state.bookUntil;

        const updatedState = {
            bookUntil,
            status,
            nextHalfHour,
        };
        this.setState(updatedState, this.timeUpdated);
    },

    getInitialState() {
        return {
            bookUntil: RoomStore.getNextHalfHour(),
        };
    },

    render() {
        const loading = ! (this.state.status.freeUntil | this.state.status.busyUntil);
        if (loading) {
            return <div/>;
        }

        const {bookUntil} = this.state;

        const currentDate = new Date();
        currentDate.setSeconds(0, 0);

        const decrementTarget = this.coercedLegalBookingTime(
            this.nearestHalfHour(-1)
        );
        const incrementTarget = this.coercedLegalBookingTime(
            this.nearestHalfHour(1)
        );
        const decrementSize = minutesDiff(
            bookUntil,
            decrementTarget,
        );
        const incrementSize = minutesDiff(
            bookUntil,
            incrementTarget,
        );
        const incrementDisabled = incrementSize === 0;
        const decrementDisabled = decrementSize === 0;

        return (
            <div className="room-page">
                    <div className="time-indicator">{formatTime(currentDate)}</div>
                    <h1>{this.props.params.roomId}</h1>
                    <Link to="/" className="floor-plan-link">Floor Plan</Link>
                    {!this.isAvailable() ? (
                        <button className="booked-indicator">
                            Booked by {this.state.status.bookedBy}
                            <br/>
                            until {formatTime(this.state.status.busyUntil)}
                        </button>
                    ) : (
                    <div>
                        <button
                            className="book"
                            onClick={this.bookRoom(bookUntil)}
                        >
                            Book until {formatTime(bookUntil)}
                            <br />
                            ({minutesDiff(currentDate, bookUntil)} minutes)
                        </button>
                        <button
                            className="decrement"
                            onClick={() => {this.updateBookUntil(decrementTarget);}}
                            disabled={decrementDisabled}
                        >
                            {decrementSize}min
                        </button>
                        <button
                            className="increment"
                            onClick={() => {this.updateBookUntil(incrementTarget);}}
                            disabled={incrementDisabled}
                        >
                            +{incrementSize}min
                        </button>
                    </div>
                    )
                }
            </div>
        );
    },

    updateBookUntil(newBookUntil) {
        this.setState({
            ...this.state,
            bookUntil: newBookUntil,
        });
    },

    bookRoom(bookUntil) {
        return () => {
            this.props.history.push('/');
            RoomActionCreators.bookRoomUntil(this.props.params.roomId, bookUntil);
        };
    },

    isAvailable() {
        return this.minutesFree() >= 0;
    },

    minutesFree() {
        return Math.round((this.state.status.freeUntil - Date.now()) / ( 1000 * 60));
    },

    coercedLegalBookingTime(bookUntil) {
        if (this.state.nextHalfHour > bookUntil) {
            // Don't let bookUntil slide behind the present
            return this.state.nextHalfHour;
        }
        if (this.state.status.freeUntil && (this.state.status.freeUntil < bookUntil)) {
            // Don't let bookUntil be after freeUntil
            return this.state.status.freeUntil;
        }
        return bookUntil;
    },

    nearestHalfHour(direction) {
        const date = _.clone(this.state.bookUntil);
        const minutes = date.getMinutes();
        let nearestPreviousHalfHour = minutes - minutes % 30;
        if (nearestPreviousHalfHour === minutes && direction === -1) {
            nearestPreviousHalfHour -= 30;
        }
        date.setMinutes(
            nearestPreviousHalfHour + (direction === 1 ? 30 : 0)
        );
        return date;
    },

    timeUpdated() {
        this.updateBookUntil(
            this.coercedLegalBookingTime(this.state.bookUntil)
        );
    },
});
