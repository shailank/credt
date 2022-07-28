import { combineReducers } from 'redux';
import trackingIdReducer from './trackingIdReducer';
import productReducer from './productDetails';
import fdAmountReducer from './fdAmount';
import fdLimitReducer from './fdCreditLimit';
import updateInfoReducer from './updateInfoReducer';
import successDataReducer from './successDataReducer';
import customerTypeReducer from './customerTypeReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  trackingId: trackingIdReducer,
  product: productReducer,
  fdAmount: fdAmountReducer,
  fdCreditLimit: fdLimitReducer,
  info: updateInfoReducer, 
  successData: successDataReducer,
  customerType: customerTypeReducer,
  details: detailsReducer
});

export default rootReducer;