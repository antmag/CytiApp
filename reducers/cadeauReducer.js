const cadeauReducer = (state={cadeau:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_CADEAU':
            const newState1 = {cadeau:action.obj};
            return newState1;
    default:
        return state;
    }
}
export default cadeauReducer;