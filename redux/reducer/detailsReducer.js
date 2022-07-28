const initialState = {
    userInfoData: '',
    customerName: '',
    optOutToken: '',
    cardType: '',
    errorData: ''
}

export default function detailsReducer(state = initialState, action){
    switch(action.type){
        case 'SET_USER_INFO':
            return {...state, userInfoData: action.payload}
            break;
        case 'SET_CUSTOMER_NAME':
            return {...state, customerName: action.payload}
            break;
        case 'SET_OPTOUT_TOKEN':
            return {...state, optOutToken: action.payload}
            break;
        case 'SET_CARD_TYPE':
            return {...state, cardType: action.payload}
            break;
        case 'SET_ERROR_DATA':
            return {...state, errorData: action.payload}
            break;
        default:
            return state;
    }
} 