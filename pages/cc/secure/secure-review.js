import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import secure from '../../../public/styles/securereview.module.css';
import Layout from '@/components/layout';
import Link from 'next/link';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';
import getConfig from 'next/config'
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccessData, setCardType } from 'redux/actions';
const {publicRuntimeConfig } = getConfig()

export default function Securereview() {
  const dispatch = useDispatch();
  // let trackingId, customerType, productsData, productType, cardType, cardSubType, annualFee, joinFee, fdAmount, creditLimit, cibilScore;
  let fdAmount = '';
  let trackingId = '';
  let fixedAmount = '';
  let storeLimit = '';
  let resCreditLimit = 0;

  const fdAmountVal = useSelector(state => state.fdAmount.fdAmount);
  const fdCreditLimit = useSelector(state => state.fdCreditLimit.fdCreditLimit);
  const products = useSelector(state => state.product.product);   
  const customerType = useSelector(state => state.customerType.customerType);
  const isSecureReview = fdAmountVal != 0 && fdCreditLimit != 0 ? true : false;

  useEffect(() => {
    if(!isSecureReview) {
      router.push('/');
    }
  })

  try {
    fdAmount = fdAmountVal;
    fixedAmount= Number(fdAmount);
    trackingId = useSelector(state => state.trackingId.trackingId);
    storeLimit= fdCreditLimit;
    resCreditLimit = Number(((fdAmount/100)*90).toFixed(0));


  } catch (error) { }
  if (fdAmount) {
    fdAmount = fdAmount.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  

  let secureData = {
    "trackingId": trackingId,
    "consents": [
      {
        "consentCode": "CC_CONSENT"
      },
      {
        "consentCode": "FD_CONSENT"
      },
      {
        "consentCode": "LIEN_CONSENT"
      }  
    ],
    "customer": {
      "customerType": customerType
    },
    "productsApplied": [
      {
        "productType": 'CC',
        "cardType": products?.cardType,
        "cardSubType": products?.cardSubType,
        "cibilScore": products?.cibilScore,
        "joiningFee": products?.joiningFee,
        "creditLimit": resCreditLimit, 
        "annualFee": products?.annualFee,
        "fdAmount": fixedAmount,
      }
    ]


  }
  const [disableOnClick, setDisableOnClick] = useState(false);
  function disableOnceClick() {
    setDisableOnClick(true);
  };
  const handleOnceClick = async (e) => {
    try {
      const res = await ApiCall(Constants.SUBMITAPPLICATION, secureData);
      const result = await res.json();
      switch (res.status) {
        case 200:
          if (result.statusCode === 200) {
            if (result.status === "SUCCESS") {
              dispatch(setCardType(products.cardType));
              if (customerType === 'FKYC') {
                dispatch(updateSuccessData(result.data));
                router.push('/Responses/success-response');
              }
              if (customerType === 'WALLET') {
                dispatch(updateSuccessData(result.data));
                router.push('/Responses/fkyc-ii-pending');
              }
              if (customerType === 'OTP') {
                dispatch(updateSuccessData(result.data));
                router.push('/Responses/fkyc-ii-pending');
              }
            }
            else {
              switch (result.errors[0].errorCode) {
                case 1702:
                  sessionStorage.clear();
                  router.push('/servererror')
                  break;
                default:
                  sessionStorage.clear();
                  router.push('/servererror');
                  break;
              }
            }
          }
          break;
        default:
          router.push('/servererror');
          break;
      }
      setDisableOnClick(true);
    }
    catch (error) { }
  }
  const router = useRouter();
  return (
    <>
    { isSecureReview ? 
    <div className={secure.reviewpage}>
      <div className={secure.container}>
        <Layout title='SCC_FD_Review-PreLogin - kotak 811'>
        </Layout>
        <div className={secure.review}>
          <Box className="review_pop" >
            <Grid item container spacing={0}>
              <Grid item xs={12}>
                <h3>Review</h3>
                <Link href="/cc/secure/fixed-deposit"><a className={secure.close}>
                <img
               src={`${publicRuntimeConfig.MY_VAR}/Images/cancel.svg`}
                 alt="Cancel" /></a></Link>
              </Grid>
              <Grid item xs={12} columns={{ xs: 12, md: 12 }} className={secure.card} >
                <Grid item={true} xs={12} lg={12}>
                  <Typography variant="body2" fontWeight={600} color="#000" display="block" gutterBottom align="left">Credit Card</Typography>
                </Grid>
              </Grid>
              <Grid container item columns={{ xs: 12, md: 12 }} className={secure.card_info} >
                <Grid item={true} xs={6} lg={6}>
                  <Typography variant="body2" display="block" gutterBottom align="left">Limit</Typography>
                </Grid>
                <Grid item={true} xs={6} lg={6}>
                  <Typography variant="body2" fontWeight={600} color="#000" gutterBottom align="right"><b>??? {storeLimit} </b></Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} columns={{ xs: 12, md: 12 }} className={secure.fixed}>
                <Grid item={true} xs={12} lg={12}>
                  <Typography variant="body2" fontWeight={600} color="#000" display="block" gutterBottom align="left">Fixed Deposit</Typography>
                </Grid>
              </Grid>
              <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_info}>
                <Grid item={true} xs={6} lg={6}>
                  <Typography variant="body2" display="block" gutterBottom align="left">FD Amount</Typography>
                </Grid>
                <Grid item={true} xs={6} lg={6} >
                  <Typography variant="body2" fontWeight={600} color="#000" gutterBottom align="right"><b>??? {fdAmount}</b></Typography>
                </Grid>
              </Grid>

              <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_info}>
                <Grid item={true} xs={6} lg={6}>
                  <Typography variant="body2" display="block" gutterBottom align="left">Time Period</Typography>
                </Grid>
                <Grid item={true} xs={6} lg={6} >
                  <Typography variant="body2" fontWeight={600} color="#000" gutterBottom align="right"><b>13 months</b></Typography>
                </Grid>
              </Grid>
              <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_interest}>
                <Grid item={true} xs={8} lg={8} align="left">
                  <Typography variant="body2" display="block" gutterBottom align="left">Interest Earned</Typography>
                  <Typography variant="caption" fontSize={12} fontWeight={500} color="#999" gutterBottom align="left">FD Interest will be as applicable at the time of creating FD</Typography>
                </Grid>
                <Grid item={true} xs={4} lg={4} >
                  <Typography variant="body2" fontWeight={600} color="#000" gutterBottom align="right"><b>4.9%</b></Typography>
                </Grid>
              </Grid>
              <Grid container item columns={{ xs: 12, md: 12 }} className={secure.fixed_interest}>
                <Grid item={true} xs={7} lg={7} align="left">
                  <Typography variant="body2" display="block" gutterBottom align="left">Maturity</Typography>
                  <Typography variant="caption" fontSize={12} fontWeight={500} color="#999" gutterBottom align="left" >Your Fixed Deposit will be auto renewed to compound your returns</Typography>
                </Grid>
                <Grid item={true} xs={5} lg={5} >
                  <Typography variant="body2" fontWeight={600} color="#000" gutterBottom align="right"><b>Principal+interest</b></Typography>
                </Grid>
              </Grid>
            </Grid>
            <Button
              onClick={handleOnceClick}
              disabled={disableOnClick}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              style={{ maxHeight: '60px', minHeight: '54px', borderRadius: 12, backgroundColor: "#3857ff" }}>
              Confirm
            </Button>
          </Box>
        </div>
      </div>
    </div> : <p>Restricted Access. Redirecting to home</p> }
    </>
  );
}