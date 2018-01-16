const navigationReducer = (state={navigator:{}},action) => {
    switch (action.type) {
        case 'SET_NAVIGATOR':
            const newState1 = {navigator:action.obj};
            return newState1;
    default:
        return state;
    }
}
export default navigationReducer;