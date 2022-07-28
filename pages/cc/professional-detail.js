import Layout from '@/components/layout';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from '../../public/styles/profile.module.css';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TermsandCondition from '@/components/External/terms_condition';
import { ApiCall } from 'pages/api/apiCall';
import * as Constants from 'pages/api/apiurl';
import { useSelector, useDispatch } from 'react-redux';
import { updateSuccessData, setCardType, setErrorData } from 'redux/actions';

export default function ProfessionalDetail(){
  const dispatch = useDispatch();
  const trackingId = useSelector(state => state.trackingId.trackingId);
  const products = useSelector(state => state.product.product);    
  const customerType = useSelector(state => state.customerType.customerType);
  const [open, setOpen] = useState(false);
  const [textFieldError, setTextFieldError] = useState(false);
    const [errorComName, setErrorComName] = useState("");
    const filter = createFilterOptions();
    const handleInputChange = (event, newInputValue) => {
        if (newInputValue.length > 2) {
            setOpen(true);
            getCompanyList(event.target.value);
            setErrorComName("");
            setDisableOnClick(false);
        } else {
            setOpen(false);
            setErrorComName("This field is required");
            setDisableOnClick(true);
        }
    }
    const [companyList, setCompanyList] = useState([]);
    const pincodeHandler = (e) => {
        const num = e.target.value;
        if (num.length == 6) {
          setTextFieldError(false);
          setAllValues({ ...allValues, [e.target.name]: e.target.value });
        } else {
          setTextFieldError(true);
          setAllValues({ ...allValues, [e.target.name]: '' });
        }
    };

    const[companyId, setCompanyId] = useState(0);
    const[companyName, setCompanyName] = useState('');
    const[companyCode, setCompanyCode] = useState('');
    const[companyCategory, setCompanyCategory] = useState('');

    const [allValues, setAllValues] = useState({
        companyEmail: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        landmark: '',
        pincode: ''
    });

    function isAnyPropertyNull(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if(key != "addressLine2" && key != "addressLine3" && key != "landmark") {
              if (!value) {
                  return true
              }
            }
        }
        return false
    };

    const allInputsHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    };


    const [errorEmail, setErrorEmail] = useState("");
    const changeEmailAddress = e => {
        let reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = e.target.value;
            if (reg.test(email)){
                setErrorEmail("");
                setAllValues({ ...allValues, [e.target.name]: email });
                return true;
            }
            else{
                setAllValues({ ...allValues, [e.target.name]: '' });
                setErrorEmail("This field is required");
                return false;
            }
    };

    const [error, setError] = useState("");

    const [disableOnClick, setDisableOnClick] = useState(false);
    function disableOnceClick() {
      setDisableOnClick(true);
    };

    const changeAddress = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/[!@#$%^&*()_+\=\[\]{};':"\|.<>\?]+/)) {
            setError("");
            setDisableOnClick(false);
            setAllValues({ ...allValues, [e.target.name]: newValue })
        } else {
            setError("This field is required");
            setDisableOnClick(true);
        }

    };
    const subAddress = (e) => {
      const newValue = e.target.value;

      if (!newValue.match(/[!@#$%^&*()_+\=\[\]{};':"\|.<>\?]+/)) {
          setError("");
          setAllValues({ ...allValues, [e.target.name]: newValue })
      } else {
          ""
      }

  };

    const [agree, setAgree] = useState(false);
    const [estate, setEState] = useState(false);
    const checkboxHandler = () => {
        setAgree(!agree);
    };
    const echeckboxHandler = () => {
        setEState(!estate);
    };

    const router = useRouter();
      const getCompanyList = async (value) => { 
      let data = { "trackingId" : trackingId, "companyName": value};
      try {
        if(value.length === 3) {
          const res = await ApiCall(Constants.GETCOMPANYMASTERLIST, data);
          const result = await res.json();
          let companyLists = [];
          switch (res.status) {
            case 200:
                  if(result.statusCode === 200) {
                    if(result.status === "SUCCESS") {
                      companyLists =  result.data.companyList;
                      setCompanyList(companyLists);
                    }
                    else {
                     
                      break;
                    }
                  }
                break;
            default:
            break;
          }
        }
      } catch(error) {}
      }; 

      const submitApplication = async (event) => {
        event.preventDefault();
        disableOnceClick();
        let data = 
        { "trackingId" : trackingId, 
        "consents": [
          {
            "consentCode": "CC_CONSENT"
          },
          {
            "consentCode": "E_STATEMENT_CONSENT"
          }
          ], 
        "customer" : {
                        "preferredName": "test One",
                        "customerType" : customerType
                        },
          "productsApplied" : [{"productType" : products.productType,
                                "cardType" : products.cardType,
                                "cardSubType" : products.cardSubType,
                                "annualFee" : products.annualFee,
                                "joiningFee" : products.joiningFee,
                                "creditLimit" : products.creditLimit,
                                "cibilScore" : products.cibilScore,
                                "companyDetails": { 
                                    "companyName": companyName,
                                    "companyCode": companyCode,
                                    "companyCategory": companyCategory,
                                    "companyId": companyId,
                                    "companyEmail": allValues.companyEmail,
                                    "address": {
                                        "addressLine1": allValues.addressLine1,
                                        "addressLine2": allValues.addressLine2,
                                        "addressLine3": allValues.addressLine3,
                                        "landmark": allValues.landmark, 
                                        "pincode": allValues.pincode
                                        },
                                    }
          }]

        };
        try {
          const res = await ApiCall(Constants.SUBMITAPPLICATION, data);
          const result = await res.json();
            switch (res.status) {
              case 200:
                    if(result.statusCode === 200) {
                      if(result.status === "SUCCESS") {
                        dispatch(setCardType(products.cardType));
                        if(customerType === 'FKYC'){
                          dispatch(updateSuccessData(result.data));
                          router.push('/Responses/success-response');
                        } 
                        if(customerType === 'WALLET'){
                          dispatch(updateSuccessData(result.data));
                          router.push('/Responses/kyc-i-pending');
                        } 
                        if(customerType === 'OTP'){
                          dispatch(updateSuccessData(result.data));
                          router.push('/Responses/kyc-i-pending');
                        } 
                      }
                      else {switch (result.errors[0].errorCode) {
                        case 1701:
                          dispatch(setErrorData(result.errors[0]));
                          router.push('/Responses/app-notsubmit') 
                        break;
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
              router.push('/servererror')
              break;
            }
        } catch(error) {
        }
        }; 
    
    return (

        <div>
            <Layout title="USCC_Professional_Detail-PreLogin - kotak 811">
            </Layout>
            <Container maxWidth="xs">
                <Grid container justifyContent="center">
                    <Grid item xs={11}>
                        <div className={styles.profileDetails}>
                            <div className={styles.profilePic}></div>
                            <div className={styles.profileText}>Enter your</div>
                            <div className={styles.profileText}>professional details</div>
                        </div>
                        <form method="post" >
                          
                            <Autocomplete
                                freeSolo
                                open={open}
                                onClose={() => setOpen(false)}
                                onInputChange={handleInputChange}
                                options={companyList}
                                // getOptionLabel={(option) => option.name}

                                getOptionLabel={(option) => {
                                  // Value selected with enter, right from the input
                                  if (typeof option === "string") {
                                    return option;
                                  }
                                  // Add "xxx" option created dynamically
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  // Regular option
                                  return option.companyName;
                                }}

                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                                  const { inputValue } = params;
                                  // Suggest the creation of a new value
                                  const isExisting = options.some(
                                    (option) => inputValue === option.companyName
                                  );
                                  if (inputValue !== "" && !isExisting) {
                                    filtered.push({
                                      inputValue,
                                      name: `Add "${inputValue}"`
                                    });
                                  }
                          
                                  return filtered;
                                }}

                                renderInput={(params) => (
                                    <TextField {...params} error={!!errorComName} label="Company Name" variant="standard" type="text" onChange={(e) => { companyList.some((item) => {
                                      if(e.target.value.toUpperCase() === item.companyName){
                                        setCompanyName(item.companyName);
                                        setCompanyCategory(item.companyCategory);
                                        setCompanyId(item.companyId);
                                        setCompanyCode(item.companyCode);
                                        return true;
                                      }
                                      else{
                                        setCompanyName(e.target.value);
                                        setCompanyId(null);
                                        setCompanyCode(null);
                                        setCompanyCategory('D');
                                      }
                                    })
                                    }}></TextField>
                                )}
                                onChange={(event, newValue) => {
                                  if(newValue != null){
                                    if (typeof newValue === 'string') {
                                      setCompanyName(newValue.name);
                                    } else if (newValue && newValue.inputValue) {
                                      // Create a new value from the user input
                                      setCompanyName(newValue.inputValue);
                                      setCompanyId("");
                                      setCompanyCode("");
                                      setCompanyCategory('D');
                                    } else {
                                      setCompanyName(newValue.companyName);
                                    }
                                      setCompanyId(newValue.companyId);
                                      setCompanyCode(newValue.companyCode);
                                      setCompanyCategory(newValue.companyCategory);
                                  }
                                }}
                            />
                            <div className={styles.py30}><TextField error={!!errorEmail} name="companyEmail" className="form-input" label="Company Email" variant="standard" onChange={changeEmailAddress}>{allValues.companyEmail}</TextField></div>
                            <div className={styles.address}>Add Office Address</div>
                            <TextField error={!!error} name="addressLine1" className="form-input" label="Building/ Block" variant="standard" helperText="No special characters"onChange={changeAddress}>{allValues.addressLine1}</TextField>
                            <div style={{paddingTop: "5px"}}><Input name="addressLine2" className="form-input" placeholder="Line 1" onChange={subAddress} value={allValues.addressLine2} /></div>
                            <div className={styles.py20}><Input name="addressLine3" className="form-input" placeholder="Line 2" onChange={subAddress} value={allValues.addressLine3} /></div>
                            <div><Input name="landmark" className="form-input" placeholder="Landmark" onChange={subAddress} value={allValues.landmark} /></div>
                            <div style={{paddingTop: "5px", paddingBottom: "5px"}}>
                                <TextField name="pincode" className="form-input" inputProps={{maxLength: 6, minLength: 6}} label="Pincode" variant="standard" onChange={pincodeHandler} error={textFieldError ? true: false} helperText={textFieldError ? 'Enter minimum 6 digits': ''}>{allValues.pincode}
                                </TextField>
                            </div>
                            <div className={styles.py20}>
                                <FormControlLabel control={<Checkbox style={{ color: agree ? "#3857ff":"#cccccc", top: "-8px" }} onChange={checkboxHandler} />}
                                    label={<div className={styles.linkColor}>
                                        <span>I accept and agree to the</span>
                                        &nbsp;<TermsandCondition />
                                        <span> applicable to credit card

                
                                        </span>
                                    </div>} />
                            </div>
                            <FormControlLabel control={<Checkbox style={{ color: estate ? "#3857ff":"#cccccc",top: "-8px" }} onChange={echeckboxHandler} />} 
                                label={<div className={styles.linkColor}> 
                                <p> I provide my consent to register for e-statement on my {" "}
                                  {allValues.companyEmail ?
                                    allValues.companyEmail
                                    :
                                    "email"
                                  }
                                </p></div>}/>
                            <Button className={styles.cardButton} variant="contained" type="button"
                                disabled={disableOnClick || isAnyPropertyNull(allValues) || !agree || !estate}
                                onClick={submitApplication}>
                                Submit
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};