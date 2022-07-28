import Layout from '@/components/layout';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from './style.module.css';      
import { useSelector, useDispatch } from 'react-redux';
import { setErrorData } from 'redux/actions';

export default function OptOutReview() {
  let optOutToken = useSelector(state => state.details.optOutToken);
  let customerName = useSelector(state => state.details.customerName);
  let trackingId = useSelector(state => state.trackingId.trackingId);
  const router = useRouter();
  const dispatch = useDispatch();

  const handlecancelApplication = async () => {

    let data = { "optouttoken": optouttoken, "trackingId": trackingId }

    try {
      const res = await ApiCall(Constants.CANCELLEAD, data);
      const result = await res.json();
      switch (res.status) {
        case 200:
          if (result.statusCode === 200) {
            if (result.status === "SUCCESS") {
              router.push('/cc/optout/response');
            }
            else {
              switch (result.errors[0].errorCode) {
                case 1801:
                  let errorData = result.errors[0];
                  dispatch(setErrorData(errorData));
                  router.push('/cc/optout/timeout')
                  break;
                case 551:
                  router.push('/cc/optout/servererror')
                  break;
                default:
                  router.push('/cc/optout/servererror')
              }
            }
          }
          break;
        default:
          router.push('/cc/optout/servererror')
          break;
      }
    } catch (error) { }
  };

  return (

    <div>
      <Layout title='OPT_OUT_Details-PreLogin - kotak 811'>
      </Layout>
      <Container maxWidth="sm" >
        <Grid container justifyContent="center">
          <Grid item xs={11} marginY={8}>
            <div className={styles.title}>👋 Hi {customerName}</div>
            <p className={styles.para}>If you are having second thoughts of getting the FD-link Credit Card, below are the top reasons why you should reconsider</p>
            <ul className={styles.arrow}>
              <li>500 reward points on ₹5000 spends in first 45 days</li>
              <li>2X reward point on all online spend</li>
              <li>1 reward point on ₹100 spent</li>
            </ul>
            <div className={styles.optstart}><Link href="/cc/optout/response"><Button className={styles.startUp}>Continue application</Button></Link></div>
            <div className={styles.optstart}><Button onClick={handlecancelApplication}  className={styles.startDown}>Cancel application</Button></div>
          </Grid>
        </Grid>
      </Container>
    </div>

  )
}