const initialState = {
    fdCreditLimit: 0
}

export default function fdLimitReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_CREDIT_LIMIT':
            return {fdCreditLimit: action.payload}
        default: 
            return state;
    }
}