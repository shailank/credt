const initialState = {
    trackingId: null
}

export default function trackingIdReducer(state = initialState, action){
    switch(action.type){
        case 'UPDATE_TRACKING_ID':
            return {trackingId: action.payload}
        default: 
            return state;
    }
}