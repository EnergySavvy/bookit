import _ from 'lodash';
import React from 'react';
import BookIt from './BookIt.jsx';
import Room from './Room.jsx';
import PolygonRoom from './PolygonRoom.jsx';
import RoomStore from '../stores/RoomStore';
import FloorplanConfig from '../constants/FloorplanConfig';


export default React.createClass({
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
        this.setState({statuses});
    },

    onBook(roomId) {
        console.log(`Booking ${roomId}`);
        this.setState({
            roomBeingBooked: roomId,
        });
    },

    onEndBooking() {
        this.setState({
            roomBeingBooked: null,
        });
    },

    getInitialState() {
        return {
            statuses: [],
            roomBeingBooked: null,
        };
    },

    render() {
        const {statuses} = this.state;
        const rooms = _.values(FloorplanConfig.rooms).map(roomData => {
            const thisRoomStatus = statuses[roomData.label];
            switch (roomData.shape.type){
                case 'rectangle':
                    return <Room
                        {...thisRoomStatus}
                        key={roomData.label}
                        onBook={this.onBook}
                        width={roomData.shape.width}
                        height={roomData.shape.height}
                        top={roomData.position.top}
                        left={roomData.position.left}
                        additionalStyling={roomData.additionalStyling}
                     />;
                     break;
                case 'polygon':
                    return <PolygonRoom
                        {...thisRoomStatus}
                        key={roomData.label}
                        onBook={this.onBook}
                        additionalStyling={roomData.additionalStyling}
                        vertices={roomData.shape.vertices}
                    />;
                    break;
            }
        });

        const roomBeingBookedStatus = this.state.roomBeingBooked ? this.state.statuses[this.state.roomBeingBooked] : {};

        return (
            <div>
                <div className="floor-plan">
                    <div className="floorplan-background" style={{backgroundImage: `url(${FloorplanConfig.floorplan.background})`, backgroundSize: `${FloorplanConfig.floorplan.width} auto`, minHeight: FloorplanConfig.floorplan.minHeight}}>
                    </div>
                    <ul>
                    {rooms}
                    </ul>
                </div>
                {this.state.roomBeingBooked ? <BookIt {...roomBeingBookedStatus} onEndBooking={this.onEndBooking}/> : null}
            </div>
        );
    },
});
