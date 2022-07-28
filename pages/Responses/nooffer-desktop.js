import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Grid from '@mui/material/Grid';
import Layout from '@/components/layout';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
export default function NoOfferDesktop() {

    return (
        <div>
            <Layout title='No_Offer-PreLogin - kotak 811'>
            </Layout>
            <Container maxWidth="xs">
                <div className={styles.adjustTop}>
                    <img src={`${publicRuntimeConfig.MY_VAR}/Images/error.svg`} alt="Server Error" />
                    <h3>Don’t have an offer</h3>
                    <div className={styles.w300}>
                        <p>We regret to inform that we don’t have an offer for you. Please submit your application from Kotak mobile banking app</p>
                    </div>
                    <div><img className={styles.img1} src={`${publicRuntimeConfig.MY_VAR}/Images/kotak-811.png`} alt="Kotak 811" /></div>
                    <span>Download App</span>
                    <Grid container justifyContent="center" spacing={1.5} style={{ paddingTop: 25 }}>
                        <Grid item xs={10} md={6}>
                            <a href='https://play.google.com/store/apps/details?id=com.msf.kbank.mobile Kotak - 811 & Mobile Banking - Apps on Google Play
                                        Kotak Mahindra Bank’s official mobile banking application for Android phones.'>
                                <img className={styles.responsive} src={`${publicRuntimeConfig.MY_VAR}/Images/google_play.svg`} alt="Google Play" />
                            </a>
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <a href='https://apps.apple.com/in/app/kotak-811-mobile-banking/id622363400'>
                                <img className={styles.responsive} src={`${publicRuntimeConfig.MY_VAR}/Images/app_store.svg`} alt="App Store" />
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};