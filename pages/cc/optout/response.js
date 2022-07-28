
import Layout from '@/components/layout';
import { useEffect } from 'react';
import styles from './style.module.css';
import getConfig from 'next/config'
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

const { publicRuntimeConfig } = getConfig()
export default function SuccessfullyApplied() {
    let obj = {};
    try {
        let response = useSelector(state => state.successData.successData);
        obj = response;
    } catch (error) { }

    useEffect(() => {
        setTimeout(() => {
            sessionStorage.clear();
        }, 10000);
    }, []);
    return (
        <div>
            <Layout title='OPT_OUT_Response_captured-PreLogin - kotak 811'>
            </Layout>
             <Container maxWidth="xs" className={styles.w324}>
                <div className={styles.adjustTop}>
                    <img
                        src={`${publicRuntimeConfig.MY_VAR}/Images/blue_check.svg`}
                        alt="Check" />
                    <h3>Response captured</h3>
                    <p>Customer cancelled the lead.</p>
                    {/* <a href="/">Track your application</a> */}
                </div>
            </Container>
        </div>
    );
};