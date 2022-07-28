export const updateTrackingId = (trackingId) => {
    return {
        type: 'UPDATE_TRACKING_ID',
        payload: trackingId
    }
}

export const updateProductDetails = (product) => {
    return {
        type: 'UPDATE_PRODUCTS',
        payload: product
    }
}

export const updateFdAmount = (fdAmount) => {
    return {
        type: 'UPDATE_FD_AMOUNT',
        payload: fdAmount
    }
}

export const updateFdCreditLimit = (fdCreditLimit) => {
    return {
        type: 'UPDATE_CREDIT_LIMIT',
        payload: fdCreditLimit
    }
}

export const updateInfo = (value) => {
    return {
        type: 'UPDATE_INFO',
        payload: value
    }
}

export const updateSuccessData = (data) => {
    return {
        type: 'UPDATE_SUCCESS_DATA',
        payload: data
    }
}

export const updateCustomerType = (customerType) => {
    return {
        type: 'UPDATE_CUSTOMER_TYPE',
        payload: customerType
    }
}

export const setUserInfoData = (userInfoData) => {
    return {
        type: 'SET_USER_INFO',
        payload: userInfoData
    }
}

export const setResponseErrorData = (responseErrorData) => {
    return {
        type: 'SET_RESPONSE_ERROR_DATA',
        payload: responseErrorData
    }
}

export const setResponseError = (responseError) => {
    return {
        type: 'SET_RESPONSE_ERROR',
        payload: responseError
    }
}

export const setCardType = (cardType) => {
    return {
        type: 'SET_CARD_TYPE',
        payload: cardType
    }
}

export const setErrorData = (errorData) => {
    return {
        type: 'SET_ERROR_DATA',
        payload: errorData
    }
}

export const setCustomerName = (customerName) => {
    return {
        type: 'SET_CUSTOMER_NAME',
        payload: customerName
    }
}

export const setOptOutToken = (optOutToken) => {
    return {
        type: 'SET_OPTOUT_TOKEN',
        payload: optOutToken
    }
}