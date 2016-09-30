const GoogleApi = {
    initClient(gapi) {
        GoogleApi.gapi = gapi;
        GoogleApi.client = gapi.client;
    },

    fakeApiCall(fakeResult) {
        const promise = new Promise(resolve => {
            resolve(fakeResult);
        });

        return promise;
    },

    fetchCurrentUser() {
        if (!GoogleApi.client.plus) {
            return this.fakeApiCall(null);
        }
        return GoogleApi.client.plus.people.get({
            userId: 'me',
        });
    },

    fetchNextEvent(calendarId) {
        if (!GoogleApi.client.calendar) {
            return this.fakeApiCall(null);
        }

        return GoogleApi.client.calendar.events.list({
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 1,
            orderBy: 'startTime',
        });
    },

    bookRoom(calendarId, startTime, endTime) {
        if (!GoogleApi.client.calendar) {
            return this.fakeApiCall(null);
        }
        const event = {
            summary: 'Bookit Booked',
            location: '',
            description: '',
            start: {
                dateTime: startTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: endTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            recurrence: [],
            attendees: [
                {
                    id: calendarId,
                    email: calendarId,
                    resource: true,
                },
            ],
            reminders: {},
        };

        return GoogleApi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
    },
};

// copied as an example from JSON returned by the Google API
// therefore not worth modifying to pass our lint rules

/* eslint-disable comma-dangle, quotes, quote-props  */
const fakeEventList = { // eslint-disable-line no-unused-vars
    "kind": "calendar#events",
    "etag": "\"1440702008076000\"",
    "summary": "SEA - Phone Booth (Window)",
    "updated": "2015-08-27T19:00:08.076Z",
    "timeZone": "America/Los_Angeles",
    "accessRole": "reader",
    "defaultReminders": [],
    "nextPageToken": "EiUKGmdkbjhwNWZrMDBkaHVlOGlzNmJjbzJrbHE4GIDou4Xy1ccC",
    "items": [
        {
            "kind": "calendar#event",
            "etag": "\"2881394713484000\"",
            "id": "gdn8p5fk00dhue8is6bco2klq8",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=Z2RuOHA1ZmswMGRodWU4aXM2YmNvMmtscTggZW5lcmd5c2F2dnkuY29tXzJkMzYzMjM0MzQzMjMxMzMzOTM2MzIzN0ByZXNvdXJjZS5jYWxlbmRhci5nb29nbGUuY29t",
            "created": "2015-08-27T17:42:19.000Z",
            "updated": "2015-08-27T17:42:36.742Z",
            "summary": "talk about best world engage implementation ideas",
            "location": "SEA - Phone Booth (Window)",
            "creator": {
                "email": "mark@energysavvy.com",
                "displayName": "Mark Ghazal"
            },
            "organizer": {
                "email": "mark@energysavvy.com",
                "displayName": "Mark Ghazal"
            },
            "start": {
                "dateTime": "2015-09-01T13:00:00-07:00"
            },
            "end": {
                "dateTime": "2015-09-01T14:00:00-07:00"
            },
            "iCalUID": "gdn8p5fk00dhue8is6bco2klq8@google.com",
            "sequence": 0,
            "attendees": [
                {
                    "email": "kristen@energysavvy.com",
                    "displayName": "Kristen Demeter",
                    "responseStatus": "accepted"
                },
                {
                    "email": "energysavvy.com_2d3632343432313339363237@resource.calendar.google.com",
                    "displayName": "SEA - Phone Booth (Window)",
                    "self": true,
                    "resource": true,
                    "responseStatus": "accepted"
                },
                {
                    "email": "mark@energysavvy.com",
                    "displayName": "Mark Ghazal",
                    "organizer": true,
                    "responseStatus": "accepted"
                }
            ],
            "reminders": {
                "useDefault": true
            }
        }
    ]
};
/* eslint-enable comma-dangle, quotes, quote-props  */

export default GoogleApi;
