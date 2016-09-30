function mirror(dict) {
    for (const key in dict) {
        if ({}.hasOwnProperty.call(dict, key)) {
            dict[key] = key;
        }
    }
    return dict;
}

export default mirror({
    NEW_ROOM_DATA: null,
    BOOK_ROOM: null,
    FETCH_ROOMS: null,
    UPDATE_TIME: null,
});
