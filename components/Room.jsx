import React from 'react';
import {Link} from 'react-router';

const MINUTES_FREE_THRESHOLD = 5;

export default React.createClass({
    propTypes: {
        roomId: React.PropTypes.string.isRequired,
        freeUntil: React.PropTypes.instanceOf(Date),
        busyUntil: React.PropTypes.instanceOf(Date),
        bookedBy: React.PropTypes.string,
        left: React.PropTypes.number,
        top: React.PropTypes.number,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        onBook: React.PropTypes.func.isRequired,
    },

    componentWillMount() {
        const mql = window.matchMedia('(min-width: 700px)');
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, listView: !mql.matches});
    },

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged() {
        this.setState({listView: !this.state.mql.matches});
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
        const numToPx = (n) => String(n * 100) + 'px';

        const roomStyle = (
            this.state.listView ?
            {} :
            _.extend(
                {
                    height: numToPx(this.props.height),
                    width: numToPx(this.props.width),
                    left: numToPx(this.props.left),
                    top: numToPx(this.props.top),
                },
                this.props.additionalStyling,
             )
        );

        const classNames = `room ${(isAvailable ? '' : 'room--booked')}`;

        return (
            <li className={classNames} id={roomClass} style={roomStyle}>
                <Link to={`/rooms/${this.props.roomId}`}>
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
