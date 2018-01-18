const reductionReducer = (state={reduction:{}, listReductions:{}, counterReductions:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_REDUCTION':
            const newState1 = {reduction:action.obj , listReductions:state.listReductions, counterReductions:state.counterReductions};
            return newState1;
	 	case 'SET_AVAILABLES_REDUCTION':
	 		const newState2={reduction:state.reduction, listReductions:action.obj , counterReductions:state.counterReductions};
	 		return newState2;
        case 'SET_COUNTER_REDUCTION':
            const newState3={reduction:state.reduction, listReductions:state.listReductions , counterReductions:action.obj};
            return newState3;

    default:
        return state;
    }
}
export default reductionReducer;
