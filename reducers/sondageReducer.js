const sondageReducer = (state={sondage:{}, answer:{}},action) => {
    switch (action.type) {
        case 'UPDATE_SONDAGE':
            const newState1 = {sondage:action.obj, answer:state.answer};
            return newState1;
        case 'UPDATE_ANSWER':
            const newState2 = {sondage:state.sondage, answer:action.obj};
            return newState2;
    default:
        return state;
    }
}
export default sondageReducer;