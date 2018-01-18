const cadeauReducer = (state={cadeau:{}, listCadeaux:{}, counterCadeaux:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_CADEAU':
            const newState1 = {cadeau:action.obj, listCadeaux:state.listCadeaux, counterCadeaux:state.counterCadeaux};
            return newState1;
	 	case 'SET_AVAILABLES_CADEAU':
	 		const newState2={cadeau:state.cadeau, listCadeaux:action.obj, counterCadeaux:state.counterCadeaux};
	 		return newState2;
        case 'SET_COUNTER_CADEAU':
            const newState3={cadeau:state.cadeau, listCadeaux:state.listCadeaux, counterCadeaux:action.obj};
            return newState3;
            
    default:
        return state;
    }
}
export default cadeauReducer;
