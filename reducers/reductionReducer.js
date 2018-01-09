const reductionReducer = (state={reduction:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_REDUCTION':
            const newState1 = {reduction:action.obj};
            return newState1;
    default:
        return state;
    }
}
export default reductionReducer;