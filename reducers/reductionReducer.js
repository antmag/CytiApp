const reductionReducer = (state={reduction:{}, listReductions:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_REDUCTION':
            const newState1 = {reduction:action.obj , listReductions:state.listReductions};
            return newState1;
	 	case 'SET_AVAILABLES_REDUCTION':
	 		const newState2={reduction:state.cadeau, listReductions:action.obj};
	 		return newState2;
    default:
        return state;
    }
}
export default reductionReducer;
