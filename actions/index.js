export const setConnectedUser=(boolean_obj)=>{
    return {
        type: 'UPDATE_CONNECTED_USER',
        obj:boolean_obj
    };
}

export const updateFilter=(selectedFilter)=>{
    return {
        type: 'UPDATE_FILTER',
        obj: selectedFilter
    };
}