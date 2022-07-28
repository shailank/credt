const initialState = {
    product: {} 
}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_PRODUCTS':
            return {...state, product: action.payload}
        default: 
            return state;
    }
}