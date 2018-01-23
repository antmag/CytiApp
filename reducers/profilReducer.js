const profilReducer= (state={connected:{}, completedSurveys:{}, statCompletedSurveys:{}},action) => {
	 switch (action.type) {
	 	case 'UPDATE_CONNECTED_USER':
	 		const newState1={connected:action.obj, completedSurveys:state.completedSurveys, statCompletedSurveys:state.statCompletedSurveys};
	 		return newState1;
	 	case 'UPDATE_COMPLETED_SURVEYS':
	 	console.log(action);
	 		const newState2={connected:state.connected, completedSurveys:action.obj, statCompletedSurveys:state.statCompletedSurveys};
	 		return newState2;
	 default:
	 	return state;
	 }
}
export default profilReducer;