import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import FloorplanConfig from '../constants/FloorplanConfig';
import GoogleApi from '../GoogleApi';
import RoomConstants from '../constants/RoomConstants';

// TODO: Access FloorplanConfig.rooms directly instead of creating RoomDetails
const RoomDetails = {};
FloorplanConfig.rooms.forEach(room => {
    RoomDetails[room.label] = {apiId: room.apiId};
});

const RoomActionCreators = {
    fetchRooms() {
        console.log('RoomActionCreators.fetchRooms');
        AppDispatcher.dispatch({
            type: RoomConstants.FETCH_ROOMS,
        });
        _.forOwn(RoomDetails, (details, name) => {
            GoogleApi.fetchNextEvent(details.apiId).then(data => {
                const items = data.result.items;
                RoomActionCreators.newRoomData(name, items ? items[0] : null);
            });
        });
    },
    bookRoomUntil(roomName, endTime) {
        const roomDetails = RoomDetails[roomName];
        if (!roomDetails) {
            console.log('Error, no room data for room:', roomName);
            return;
        }
        console.log(`RoomActionCreators.bookRoomUntil ${roomName} until ${endTime}`);
        AppDispatcher.dispatch({
            type: RoomConstants.BOOK_ROOM,
            roomName: roomName,
        });
        GoogleApi.bookRoom(roomDetails.apiId, new Date(), endTime).then(data => {
            RoomActionCreators.newRoomData(roomName, data.result);
        });
    },
    newRoomData(roomName, data) {
        AppDispatcher.dispatch({
            type: RoomConstants.NEW_ROOM_DATA,
            roomName: roomName,
            data: data,
        });
    },
    updateTime() {
        AppDispatcher.dispatch({
            type: RoomConstants.UPDATE_TIME,
        });
    },
};


export default RoomActionCreators;
