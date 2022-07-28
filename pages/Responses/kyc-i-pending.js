import Container from '@mui/material/Container';
import styles from '../../public/styles/response.module.css';
import Layout from '@/components/layout';
import { useEffect } from 'react';
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
import { useSelector } from 'react-redux';

export default function KYCPending() {
    let obj = {};
    let titleAdd = "";
    try {
        let response = useSelector(state => state.successData.successData);
        obj = response;
        let customerType = useSelector(state => state.customerType.customerType);
        let cardType = useSelector(state => state.details.cardType);
        if(customerType === "OTP" && cardType == "UNSECURED") {
            titleAdd = "USCC";
        } else {
            titleAdd = "SCC";
        }
    } catch(error){}
    

      function handleClick() {
        window.open(obj.vkycUrl);
       
      }
    return (
        <div>
            <Layout title={"KycPending-"+titleAdd+"-PreLogin - kotak 811"}>
            </Layout>
            <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`} alt="Information" />
                    <h3>KYC Pending</h3>
                    <p>{obj!=null?obj.message:''}</p>
                    {obj.showVkycButton === true ?
                    <button onclick={handleclick}>Complete your KYC</button>: ''}
                </div>
            </Container>
        </div>
    );
};