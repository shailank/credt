import Head from 'next/head'
import Header from './headers/header'
import { useRouter } from 'next/router'
import Grid from "@mui/material/Grid"
import { useEffect } from 'react'
import getConfig from 'next/config'
const {publicRuntimeConfig } = getConfig()
import "@fontsource/manrope";


export default function Layout({title, keywords, discriptions})
{
 useEffect(()=>{

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = disableSelectCopy;

    function disableSelectCopy(e) {
        // current pressed key
        let pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
        if ((e.ctrlKey && (pressedKey == "c" || pressedKey == "x" || pressedKey == "v" || pressedKey == "a" || pressedKey == "u")) ||  e.keyCode == 123) {
            return false;
        }
    }


   function preventBack() {
    window.history.forward();
    }
    setTimeout(preventBack(), 0);
    window.onunload = function () { null };

    restrictUrlAccess();
    
  }, []);

  const router = useRouter();
  const restrictUrlAccess = () => {
    try {
        let trackingId = sessionStorage.getItem('trackingId');
        let responsesData = sessionStorage.getItem('successData');
        let errorData = sessionStorage.getItem('errorData');
        //if(trackingId == null && !router.pathname.match('/Responses/') && !router.pathname.match('/opt-out') && !router.pathname.match('/500')) {
          //  router.push('/');
        //}
    //    if(responsesData == null && router.pathname.match('/Responses/')){
      //      router.push('/');
      //  }
     //   if(trackingId == null && errorData == null && router.pathname.match('/opt-out')){
//router.push('/');
//}
    } catch(error){}
  }
  

 return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={discriptions} />
            <link rel="icon" href={`${publicRuntimeConfig.MY_VAR}/favicon.svg`}  />      
            <meta name="keywords" content={keywords} />
            <script
          src="https://www.google.com/recaptcha/api.js?&render=explicit"
          src1="https://acqui-uat.kotak.internal/_next/static/css/10dc5d98b158d500.css"
          src2="https://acqui-uat.kotak.internal/creditcard/cc/Images/loader.svg"
          src3="https://acqui-uat.kotak.internal/_next/static/css/93626dd78dd49293.css"
          src4="https://acqui-uat.kotak.internal/_next/static/chunks/webpack-015b7bec01616a23.js"
          src5="https://acqui-uat.kotak.internal/_next/static/chunks/main-351b668446964025"
          src6="https://acqui-uat.kotak.internal/_next/static/4h3_QD3GWeOFT9jCmG4vP/_middlewareManifest.js"
          src7="https://acqui-uat.kotak.internal/_next/static/chunks/pages/_app-9cd1d19dd7237c4c.js"
          src8="https://acqui-uat.kotak.internal/_next/static/chunks/185-f066364f38f0ddea.js"
          src9="https://acqui-uat.kotak.internal/_next/static/chunks/pages/cc/opt-out-c2b5676b01d14390.js"
          src10="https://acqui-uat.kotak.internal/_next/static/4h3_QD3GWeOFT9jCmG4vP/_buildManifest.js"
          src11="https://acqui-uat.kotak.internal/_next/static/4h3_QD3GWeOFT9jCmG4vP/_ssgManifest.js"
          async
          defer
        ></script>
        </Head>
        {(router.pathname !=='/' && !router.pathname.match('/Responses/') && !router.pathname.match('/preloader') && !router.pathname.match('/opt-out')) ?
            <Grid container justifyContent="center">
                <Grid item xs={10}>
                    <Header />
                </Grid>
            </Grid>
        :null}
    </div>
    )
}
Layout.defaultProps = {
 title: 'Depends on Page | Xyz',
 descriptions : 'About Page Desicription',
 keywords: 'music, dj, event', 
}


