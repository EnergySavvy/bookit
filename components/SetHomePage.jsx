import React from 'react';
import cookie from 'react-cookie';
import RoomStore from '../stores/RoomStore';

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
        this.setState(this.getUpdatedState());
    },

    handleChange(event) {
        this.setState({value: event.target.value});
    },

    getUpdatedState() {
        const statuses = RoomStore.getRoomStatuses();
        return {statuses};
    },

    getInitialState() {
        return {
            statuses: {},
            value: cookie.load('home'),
            currentHome: cookie.load('home'),
        };
    },

    render() {
        const choices = Object.keys(this.state.statuses).map(roomId => {
            return <option key={roomId} value={`#/rooms/${roomId}`}>{roomId}</option>;
        });

        return (
            <div>
                <div>Current home page: {this.state.currentHome}</div>
                <select id="dropdown" onChange={this.handleChange} value={this.state.value}>
                    <option key="FloorPlan" value={''}>Floor Plan</option>
                    {choices}
                </select>
                <button onClick={this.setCookie}> Set home page </button>
            </div>
        );
    },

    setCookie() {
        cookie.save('home', `${this.state.value}`);
        this.setState({currentHome: cookie.load('home')});
    },
});
