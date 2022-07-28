import Layout from '@/components/layout';
import Container from '@mui/material/Container';
import style from '../public/styles/loader.module.css';
import { useRouter } from 'next/router';
import {useEffect} from 'react';
import { ApiCall } from './api/apiCall';
import * as Constants from './api/apiurl'; 
import getConfig from 'next/config'
import { useDispatch } from 'react-redux';
import { updateProductDetails, updateTrackingId, updateSuccessData, updateCustomerType } from 'redux/actions';
import { useSelector } from 'react-redux';
const {publicRuntimeConfig } = getConfig()

export default function Preloader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const trackingId = useSelector(state => state.trackingId.trackingId);
  useEffect(() => {
    const checkDuplicate = async (event) => {
      let data = { "trackingId" : trackingId};
      try {
        const res = await ApiCall(Constants.CHECKDUPLICATE, data);
        const result = await res.json();
          switch (res.status) {
            case 200:
                  if(result.statusCode === 200) {
                    if(result.status === "SUCCESS") {
                      let trackingId= result.data.trackingId;
                      sessionStorage.clear();
                      dispatch(updateTrackingId(trackingId));
                      CheckCustomerEligibilty();
                    }
                    else {
                      switch (result.errors[0].errorCode) 
                      {
                      case 1301 :
                            dispatch(updateSuccessData(result.errors[0]));
                            router.push('/Responses/application-inprogress');
                            break;
                      case 1302:
                        if (result.errors[0].customerType =="OTP") {
                            dispatch(updateSuccessData(result.errors[0]));
                            router.push('/Responses/kyc-i-pending');
                          }
                          else if (result.errors[0].customerType =="WALLET"){
                              dispatch(updateSuccessData(result.errors[0]));
                              router.push('/Responses/kyc-i-pending');                           
                            }
                        break;
                      case 551:
                        sessionStorage.clear();
                        router.push('/servererror') 
                      break;
                      case 553:
                        sessionStorage.clear();
                        router.push('/servererror') 
                      break;
                      default:
                        sessionStorage.clear();
                        router.push('/servererror') 
                      }
                    }
                  }
                break;
            default:
            router.push('/servererror') 
            break;
          }
      } catch(error) {}
    };   
    const CheckCustomerEligibilty = async (event) => {
        let data = { "trackingId" : trackingId};
        try {
          const res = await ApiCall(Constants.CHECKELIGIBILITY, data);
          const result = await res.json();
            let customerType = "";
            switch (res.status) {
              case 200:
                    if(result.statusCode === 200) {
                      if(result.status === "SUCCESS") {
                        switch (result.data.customerType) {
                          case 'FKYC':
                            customerType= result.data.customerType;
                            dispatch(updateCustomerType(result.data.customerType));
                            GetEligibleProducts();
                            break;
                          case 'OTP':
                            customerType= result.data.customerType;
                            dispatch(updateCustomerType(result.data.customerType));
                            GetEligibleProducts();
                            break;
                            case 'WALLET':
                            customerType= result.data.customerType;
                            dispatch(updateCustomerType(result.data.customerType));
                            GetEligibleProducts();
                            break;
                        } 
                      }
                      else {switch (result.errors[0].errorCode) {
                        case 1401:  
                        router.push('/Responses/nooffer-desktop')
                        break;
                        case 551:
                        sessionStorage.clear();
                        router.push('/servererror')
                        break;
                        default:
                        sessionStorage.clear();
                        router.push('/servererror')
                        }
                      }
                    }
                  break;
              default:
                router.push('/servererror')
                break;
            }
        } catch(error) {}
      }; 
  
        const GetEligibleProducts = async (event) => {
          let data = { "trackingId" : trackingId};
          try {
            const res = await ApiCall(Constants.GETELIGIBLEPRODUCTS, data);
            const result = await res.json();
              let products = [];
              switch (res.status) {
                case 200:
                    if(result.statusCode === 200) {
                      if(result.status === "SUCCESS") {
                        switch (result.data.products[0].cardSubType) {
                          case 'DREAM':
                            products= result.data.products;
                            dispatch(updateProductDetails(products[0]));
                            router.push('/cc/secure');
                            break;
                          case '811':
                            products= result.data.products;
                            dispatch(updateProductDetails(products[0]));
                            router.push('/cc/kotak811');
                            break;
                            case 'LEAGUE':
                            products= result.data.products;
                            dispatch(updateProductDetails(products[0]));
                            router.push('/cc/league' );
                            break;
                        } 
                      }
                      else {switch (result.errors[0].errorCode) {
                        case 1501:
                        router.push('/Responses/nooffer-desktop')
                        break;
                        case 555:
                        router.push(result.errors[0].redirectUrl);
                        break;
                        case 551:
                        sessionStorage.clear();
                        router.push('/servererror')
                        break;
                        default:
                        sessionStorage.clear();
                        router.push('/servererror')
                        }
                      }
                    }
                    break;
                default:
                  router.push('/servererror')
                    break;
              }
          } catch(error) {}
        };
    checkDuplicate();
  }, [] );
  return (
    <div>
      <Layout title='Eligibility - PreLogin - kotak 811'>
      </Layout>
      <Container maxWidth="xs">
        <div className={style.loaderStyle}>
          <p>Hang on, we are checking
          <br />your credit card</p>
          <img
               src={`${publicRuntimeConfig.MY_VAR}/Images/loader.svg`} alt="Server Error" />
        </div>
      </Container>
    </div>
  );
};
