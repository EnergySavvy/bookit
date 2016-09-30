/* eslint-disable quote-props */

export default {
    'floorplan': {
        background: 'img/shoefloorplan.svg',
        width: '952px',
        minHeight: '700px',
    },
    'rooms': [
        {
            label: 'Cupola',
            apiId: 'energysavvy.com_2d37343434373438312d333032@resource.calendar.google.com',
            position: {
                left: 4,
                top: 1.45,
            },
            shape: {
                type: 'rectangle',
                height: 1,
                width: 1,
            },
        },
        {
            label: 'Room',
            apiId: 'energysavvy.com_34383536353236342d313630@resource.calendar.google.com',
            position: {
                left: 5,
                top: 5.0,
            },
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1,
            },
            additionalStyling: {
                transform: 'rotate(-45deg)',
                WebkitClipPath: 'polygon(20% 0%, 0% 100%, 100% 100%, 100% 0%)',
            },
        },
        {
            label: 'Study',
            position: {
                left: 5.77,
                top: 4.27,
            },
            shape: {
                type: 'rectangle',
                width: 1.0,
                height: 1.2,
            },
            additionalStyling: {
                transform: 'rotate(-45deg)',
            },
        },
        {
            label: 'Gallery',
            apiId: 'energysavvy.com_2d37303931313134352d373532@resource.calendar.google.com',
            position: {
                left: 6.475,
                top: 3.565,
            },
            shape: {
                type: 'rectangle',
                width: 1.0,
                height: 1.2,
            },
            additionalStyling: {
                transform: 'rotate(-45deg)',
            },
        },
        {
            label: 'Studio',
            apiId: 'energysavvy.com_3439353734303634313932@resource.calendar.google.com',
            position: {
                left: 7.1,
                top: 2.9,
            },
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1,
            },
            additionalStyling: {
                transform: 'rotate(-45deg)',
                WebkitClipPath: 'polygon(0% 0%, 0% 100%, 80% 100%, 100% 30%, 70% 0%)',
            },
        },
        {
            label: 'Ballroom',
            apiId: 'energysavvy.com_3531383634383136353038@resource.calendar.google.com',
            position: {
                left: 3.45,
                top: 4.5,
            },
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1.25,
            },
        },
        {
            label: 'Has Windows',
            apiId: 'energysavvy.com_2d37363738313430302d363633@resource.calendar.google.com',
            position: {
                left: 2.30,
                top: 0,
            },
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1,
            },
        },
        {
            label: 'Board Room',
            apiId: 'energysavvy.com_2d3437363734333835383031@resource.calendar.google.com',
            position: {
                left: 2.75,
                top: 1.45,
            },
            shape: {
                type: 'rectangle',
                width: 1.25,
                height: 2,
            },
        },
        {
            label: 'Drawing Room',
            apiId: 'energysavvy.com_38373335363738342d323738@resource.calendar.google.com',
            position: {
                left: 1.35,
                top: 4.5,
            },
            shape: {
                type: 'rectangle',
                width: 1,
                height: 1.25,
            },
        },
        {
            label: 'Den',
            apiId: 'energysavvy.com_2d3439313631323438383137@resource.calendar.google.com',
            position: {
                left: 5,
                top: 1.9,
            },
            shape: {
                type: 'rectangle',
                width: 1.2,
                height: 1,
            },
        },
        {
            label: 'Library',
            apiId: 'energysavvy.com_2d33353335383036352d373537@resource.calendar.google.com',
            position: {
                left: 0,
                top: 1.34,
            },
            shape: {
                type: 'rectangle',
                width: 1.46,
                height: 1,
            },
        },
        {
            label: 'Phone Booth',
            apiId: 'energysavvy.com_2d35333537363739372d353436@resource.calendar.google.com',
            position: {
                left: 2.35,
                top: 4.5,
            },
            shape: {
                type: 'rectangle',
                width: 1.1,
                height: 1.25,
            },
        },
    ],
};
