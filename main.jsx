import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';

import FloorPlan from './components/FloorPlan.jsx';
import RoomPage from './components/RoomPage.jsx';
import RoomActionCreators from './actions/RoomActionCreators.js';
import GoogleApi from './GoogleApi';
import GoogleApiInit from './GoogleApiInit.jsx';

require('./scss/index.scss');


function fetchRoomsLoop() {
    RoomActionCreators.fetchRooms();
    RoomActionCreators.updateTime();
    const oneMinute = 1000 * 60;
    setInterval(
        RoomActionCreators.fetchRooms,
        oneMinute
    );
    setInterval(
        RoomActionCreators.updateTime,
        oneMinute
    );
}


function initApp(googleClient) {
    GoogleApi.initClient(googleClient);

    fetchRoomsLoop();

    render(
        (
            <Router>
                <Route path="/" component={FloorPlan} />
                <Route path="rooms/:roomId" component={RoomPage} />
            </Router>
        ),
        document.getElementById('bookit')
    );
}

export default {
    initApp,
    GoogleApiInit,
};
