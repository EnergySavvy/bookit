import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import cookie from 'react-cookie';

import FloorPlan from './components/FloorPlan.jsx';
import RoomPage from './components/RoomPage.jsx';
import SetHomePage from './components/SetHomePage.jsx';
import RoomActionCreators from './actions/RoomActionCreators.js';
import GoogleApi from './GoogleApi';
import GoogleApiInit from './GoogleApiInit.jsx';

require('./scss/index.scss');

const MINUTE_DELAY_BEFORE_HOME_PAGE_REDIRECT = 10;
let CURRENT_TIMEOUT_ID;

function redirectToHome() {
    const homePath = cookie.load('home');

    if (homePath && !document.location.hash.startsWith(homePath)) {
        console.log(`redirect to ${homePath}`);
        document.location = homePath;
    }
}

function redirectToHomeTimeout() {
    console.log(`set redirect timeout to ${MINUTE_DELAY_BEFORE_HOME_PAGE_REDIRECT} minutes`);
    clearTimeout(CURRENT_TIMEOUT_ID);

    CURRENT_TIMEOUT_ID = setTimeout(
        redirectToHome,
        1000 * 60 * MINUTE_DELAY_BEFORE_HOME_PAGE_REDIRECT
    );
}


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
                <Route path="/" component={FloorPlan} onEnter={redirectToHomeTimeout} />
                <Route path="rooms/:roomId" component={RoomPage} onEnter={redirectToHomeTimeout}/>
                <Route path="sethome" component={SetHomePage} />
            </Router>
        ),
        document.getElementById('bookit')
    );
}

export default {
    initApp,
    GoogleApiInit,
};
