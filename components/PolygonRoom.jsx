import React from 'react';
import {Link} from 'react-router';

const MINUTES_FREE_THRESHOLD = 5;

export default React.createClass({
    propTypes: {
        roomId: React.PropTypes.string.isRequired,
        freeUntil: React.PropTypes.instanceOf(Date),
        busyUntil: React.PropTypes.instanceOf(Date),
        bookedBy: React.PropTypes.string,
        onBook: React.PropTypes.func.isRequired,
        vertices: React.PropTypes.array,
    },

    onClick() {
        this.props.onBook(this.props.roomId);
    },

    render() {
        const isAvailable = this.isAvailable();
        const roomClass = this.props.roomId.toLowerCase().replace(' ', '-').replace('/', '').replace('(', '').replace(')', '');

        const freeMessage = this.minutesFree() > 60 ? 'Free for over an hour' : `Free for ${this.minutesFree()} minutes`;
        const bookedMessage = this.props.bookedBy ? `Booked by ${this.props.bookedBy}` : 'Booked';
        const isBookedMessage = isAvailable ? freeMessage : bookedMessage;

        const polygonArgumentString = _.join(this.props.vertices, ', ');

        var roomStyle = _.extend(
            {
                shapeOutside: `polygon(${polygonArgumentString})`
            },
            this.props.additionalStyling,
         );

        const classNames = `room ${(isAvailable ? '' : 'room--booked')}`;

        return (
            <li className={classNames} id={roomClass} style={roomStyle}>
                <Link onClick={isAvailable ? this.onClick : null}>
                    <span className="room--name">{this.props.roomId}</span>
                    <span className="room--booker">{isBookedMessage}</span>
                </Link>
            </li>
        );
    },

    isAvailable() {
        return this.minutesFree() >= MINUTES_FREE_THRESHOLD;
    },

    minutesFree() {
        return Math.round((this.props.freeUntil - Date.now()) / ( 1000 * 60));
    },
});
