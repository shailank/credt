const initialState = {
    fdAmount: 0
}

export default function fdAmountReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_FD_AMOUNT':
            return {fdAmount: action.payload}
        default: 
            return state;
    }
}