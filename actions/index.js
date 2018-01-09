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

export const setNavigator=(navigator) => {
    return {
        type: 'SET_NAVIGATOR',
        obj: navigator
    };
}


export const updateSelectedSondage = (sondage) => {
    return {
        type: 'UPDATE_SONDAGE',
        obj: sondage
    };
}

export const updateSelectedReduction = (reduction) => {
    return {
        type: 'SET_CURRENT_REDUCTION',
        obj: reduction
    };
}

export const updateSelectedCadeau = (cadeau) => {
    return {
        type: 'SET_CURRENT_CADEAU',
        obj: cadeau
    };
}

export const updateAvailablesCadeaux = (listCadeaux) => {
    return {
        type: 'SET_AVAILABLES_CADEAU',
        obj: listCadeaux
    };
}