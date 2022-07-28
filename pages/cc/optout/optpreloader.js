import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApiCall } from '../../api/apiCall'
import * as Constants from '../../api/apiurl';
import styles from './style.module.css';
import getConfig from 'next/config'
import { Container } from '@material-ui/core';
const { publicRuntimeConfig } = getConfig()
import { useDispatch } from 'react-redux';
import { updateTrackingId, setCustomerName, setOptOutToken, setErrorData } from 'redux/actions';

export default function OptOut() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const validateoptOutToken = async (event) => {
      if (!router.isReady) return;
      let data = { "optouttoken": router.query?.optouttoken?.replaceAll(' ', '+') };
      try {
        const res = await ApiCall(Constants.VALIDATETOKEN, data);
        const result = await res.json();
        switch (res.status) {
          case 200:
            if (result.statusCode === 200) {
              if (result.status === "SUCCESS") {
                let customerData = result.data;
                dispatch(setCustomerName(customerData.customerName));
                dispatch(updateTrackingId(trackingId));
                dispatch(setOptOutToken(router.query?.optouttoken));
                router.push('/cc/optout/review');
              }
              else {
                switch (result.errors[0].errorCode) {
                  case 1801:
                    let responseErrorData = result.errors[0];
                    router.push('/cc/optout/timeout')
                    break;
                  case 1802:
                    let errorData = result.errors[0];
                    dispatch(setErrorData(errorData));
                    router.push('/cc/optout/timeout')
                    break;
                  case 551:
                    sessionStorage.clear();
                    router.push('/cc/optout/servererror')
                    break;
                  default:
                    sessionStorage.clear();
                    router.push('/cc/optout/servererror')
                }

              }
            }
            break;
          default:
              router.push('/cc/optout/review');
              // router.push('/cc/optout/servererror')
              break;
        }
      } catch (error) { }
    };
    validateoptOutToken();
  }, [router.isReady, router.query]);
  return (
    <div>
      <Layout title='OPT_OUT_ELIGIBILTY-PreLogin - kotak 811'>
      </Layout>
      <Container maxWidth='xs'>
        <div className={styles.loaderStyle}>
          <p>Checking Your application status</p>
          <img className={styles.loader} src={`${publicRuntimeConfig.MY_VAR}/Images/loader.svg`} alt="loading" />
        </div>
      </Container>
    </div>

  );
};
