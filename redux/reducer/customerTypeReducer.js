const initialState = {
    customerType: ""
}

export default function customerTypeReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_CUSTOMER_TYPE':
            return {customerType: action.payload}
        default: 
            return state;
    }
}