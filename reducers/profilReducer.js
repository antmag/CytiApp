const profilReducer= (state={connected:{}, completedSurveys:{}},action) => {
	 console.log(action);
	 switch (action.type) {
	 	case 'UPDATE_CONNECTED_USER':
	 		const newState1={connected:action.obj, completedSurveys:state.completedSurveys};
	 		return newState1;
	 	case 'UPDATE_COMPLETED_SURVEYS':
	 		const newState2={connected:state.connected, completedSurveys:action.obj};
	 		return newState2;
	 default:
	 	return state;
	 }
}
export default profilReducer;