export function err(state = false, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_FAILURE':
            return action.err;

        default:
            return state;
    }
}
