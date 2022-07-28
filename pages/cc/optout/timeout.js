import Layout from '@/components/layout';
import { useEffect } from 'react';
import styles from './style.module.css';
import getConfig from 'next/config'
import { useSelector } from 'react-redux';

const { publicRuntimeConfig } = getConfig()


export default function KYCPending() {
    let titleAdd = "";
    let obj = {};
    try {
        obj = useSelector(state => state.details.errorData);
        if (obj.errorCode === 1801) {
            titleAdd = "Timed_out"
        } else {
            titleAdd = "Link_expired";
        }
    } catch (error) { }

    useEffect(() => {
        setTimeout(() => {
            sessionStorage.clear();
        }, 10000);
    }, []);
    return (
        <div>
            <Layout title={'OPT_OUT_' + titleAdd + '-PreLogin - kotak 811'}>
            </Layout>
            <div className='container w324'>
                <div className={styles.adjustTop}>

                    <img
                        src={`${publicRuntimeConfig.MY_VAR}/Images/info.svg`} alt="Information" />
                    <h3>{obj != null ? obj.message : "Timed out"}</h3>
                </div>
            </div>
        </div>

    );
};