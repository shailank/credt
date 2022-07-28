const initialState = {
    successData: {}
}

export default function successDataReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_SUCCESS_DATA':
            return {...state, successData: action.payload}
        default: 
            return state;
    }
}