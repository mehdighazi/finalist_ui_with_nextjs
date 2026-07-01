import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    
    FormControl,
    InputLabel,
    OutlinedInput,
  
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from '@/components/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { showAlert } from "@/components/store/slices/alertSlice";
import Google from 'assets/images/icons/social-google.svg';
import dataHandler from '@/components/api/dataHandler';
import  api from '@/components/api/api';
// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ onChange, resend }) => {
    const theme = useTheme();
    const [error, setError] = useState(false)
 const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.sidebarMenu);
    const [tokenvalue, setTokenValue] = useState(null)
    const sendCodeHandler = async () => {
        try {
            if (!error&&tokenvalue) {
                const result = dataHandler(api.sendVerifyCode(), "post", {
                    mobile: tokenvalue
                });

                result(async (data, status) => {
                  
                    onChange({ state: true, mobile: tokenvalue })
                 
                    if (status) {
                         
                        onChange({ state: true, mobile: tokenvalue })
                    }
                });
            }
             else
        {
           dispatch(showAlert("شماره وارد شده نادرست است",
                               "error"))
           
        }

            } catch (error) {
                console.error("Error loading teams", error);
            }
        
       
    };
 

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleTextBox = (value) => {
    
        // فقط اعداد قبول کن
        if (!/^[0-9]*$/.test(value)) return;
        else
            if (value.length > 11) return;
            else
                setTokenValue(value);

        // اگر 11 رقم شد بررسی کن معتبره یا نه
        if (value.length === 11) {
            if (/^09\d{9}$/.test(value)) {
                setError(false); // معتبر
            } else {
                setError(true); // نامعتبر
            }
        } else {
            // اگه هنوز کامل نیست، خطا نشون نده
            setError(false);
        }
    };
    useEffect(() => {
        
        if (resend)
            sendCodeHandler()
    }, [resend])

    return (
        <>




            <FormControl fullWidth error={error}
                sx={{
                    ...theme.typography.customInput,
                    '& input':
                    {
                        fontSize: 18,

                        //   border: error ? 'red' : "1px soid"

                    }
                }}>
                <InputLabel htmlFor="outlined-adornment-email-login"> <span>شماره همراه</span> </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={tokenvalue}
                    name="phonenumber"
                    //  onBlur={handleBlur}
                    onChange={(e) => handleTextBox(e.target.value)}
                    // label="Email Address / Username"
                    inputProps={{}}
                />

            </FormControl>



            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        disableElevation
                        // disabled={isSubmitting}
                        fullWidth
                        size="large"
                        // type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => sendCodeHandler()}
                    >
                        <span>دریافت کد</span>
                    </Button>
                </AnimateButton>
            </Box>


        </>
    );
};

export default FirebaseLogin;
