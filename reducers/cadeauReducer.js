const cadeauReducer = (state={cadeau:{}, listCadeaux:{}},action) => {
    switch (action.type) {
        case 'SET_CURRENT_CADEAU':
            const newState1 = {cadeau:action.obj, listCadeaux:state.listCadeaux};
            return newState1;
	 	case 'SET_AVAILABLES_CADEAU':
	 		const newState2={cadeau:state.cadeau, listCadeaux:action.obj};
	 		return newState2;
    default:
        return state;
    }
}
export default cadeauReducer;
