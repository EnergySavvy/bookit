import _ from 'lodash';

const SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/plus.me',
];

function signin(gapi, clientId, mode, authorizeCallback) {
    console.log('@Sign in');
    gapi.auth.authorize(
        {
            client_id: clientId,
            scope: SCOPES,
            immediate: mode,
        },
    _.partial(authorizeCallback, gapi, clientId));
}

function userAuthed(gapi, clientId) {
    console.log('@userAuthed');
    gapi.client.oauth2.userinfo.get().execute(resp => {
        const authorizeButton = document.getElementById('authorize-button');
        if (resp && !resp.code) {
            authorizeButton.style.display = 'none';
            App.initApp(gapi);
        } else {
            authorizeButton.style.display = 'block';
            authorizeButton.onclick = () => {
                gapi.auth.authorize({client_id: clientId, scope: SCOPES, immediate: false}, userAuthed);
                return false;
            };
        }
    });
}

export default function init(gapi, clientId) {
    let apisToLoad;

    const loadCallback = () => {
        if (--apisToLoad === 0) {
            signin(gapi, clientId, true, userAuthed);
        }
    };

    apisToLoad = 3; // must match number of calls to gapi.client.load()

    gapi.client.load('plus', 'v1', loadCallback);
    gapi.client.load('oauth2', 'v2', loadCallback);
    gapi.client.load('calendar', 'v3', loadCallback);
    console.log('@Init started');
}
