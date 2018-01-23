const sondageReducer = (state={sondage:{}, answer:{}, listSondage:{}},action) => {
    switch (action.type) {
        case 'UPDATE_SONDAGE':
            const newState1 = {sondage:action.obj, answer:state.answer, listSondage:state.listSondage};
            return newState1;
        case 'UPDATE_ANSWER':
            const newState2 = {sondage:state.sondage, answer:action.obj, listSondage:state.listSondage};
            return newState2;
        case 'UPDATE_LIST_SONDAGE':
            const newState3 = {sondage:state.sondage, answer:state.answer, listSondage:action.obj};
            return newState3;
    default:
        return state;
    }
}
export default sondageReducer;
