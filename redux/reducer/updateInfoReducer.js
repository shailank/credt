const initialState = {
    message: {}
}

export default function updateInfoReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_INFO':
            return {...state, message: action.payload}
        default: 
            return state;
    }
}