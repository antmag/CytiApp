const filterReducer= (state={connected:{}},action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            const newState1={selectedFilter:action.obj};
            return newState1;
    default:
        return state;
    }
}
export default filterReducer;