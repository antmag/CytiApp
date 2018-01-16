const sondageReducer = (state={sondage:{}},action) => {
    switch (action.type) {
        case 'UPDATE_SONDAGE':
            const newState1 = {sondage:action.obj};
            return newState1;
    default:
        return state;
    }
}
export default sondageReducer;