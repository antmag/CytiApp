const profilReducer= (state={connected:{}},action) => {
	 console.log(action);
	 switch (action.type) {
	 	case 'UPDATE_CONNECTED_USER':
	 		const newState1={connected:action.obj};
	 		return newState1;
	 default:
	 	return state;
	 }
}
export default profilReducer;