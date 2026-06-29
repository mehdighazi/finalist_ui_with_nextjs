import { Link } from 'react-router-dom';
import React, { useRef } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery, TextField, Box, Fade, Button, Paper } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import Transition from 'ui-component/extended/Transitions'
import AlertCompnent from 'ui-component/alert'
import dataHandler from '@/components/api/dataHandler';
import  api from '@/components/api/api';
import { showAlert } from "@/components/store/slices/alertSlice";
// assets
//=================================|| Code Inputs  ||================================
const CodeInputMUI = ({ onChange }) => {
    const inputRefs = useRef([]);
    const [code, setCode] = React.useState(Array(5).fill(''));
    const [resendVisible, setResendVisible] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(120);

    // === TIMER ===
    React.useEffect(() => {
        if (timeLeft <= 0) {
            setResendVisible(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // === INPUT LOGIC ===
    const handleChange = (e, i) => {
        const v = e.target.value;
        if (!/^[0-9]?$/.test(v)) return;

        const updated = [...code];
        updated[i] = v;
        setCode(updated);

        if (v && i < 4) inputRefs.current[i + 1]?.focus();

        if (updated.every(x => x.length === 1)) {
            onChange?.(updated.join(""));
        }
    };

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !e.target.value && i > 0) {
            inputRefs.current[i - 1]?.focus();
        }
    };

    // === RESEND CODE ===
    const handleResend = () => {
        onChange?.("resend");
        setCode(Array(5).fill(""));
        setTimeLeft(120);
        setResendVisible(false);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                gap={{ xs: 1, sm: 2 }}   // فاصله واکنش‌گرا
                sx={{ width: "100%", mt: 1 }}
            >
                {code.map((val, i) => (
                    <TextField
                        key={i}
                        value={val}
                        inputRef={(el) => (inputRefs.current[i] = el)}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: "center",
                                padding: "6px",
                                width: "100%",
                                maxWidth: "50px",
                                minWidth: "36px",
                                height:"45px",
                                background:'transparent',
                                fontSize: "clamp(16px, 5vw, 24px)",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                background:'transparent'
                            },
                        }}
                    />
                ))}
            </Box>

            {!resendVisible ? (
                <Typography
                    sx={{ pr: 1,mt:1 }}
                    fontSize={{ xs: 10, sm: 12 }}
                >
                    زمان باقیمانده: {formatTime(timeLeft)}
                </Typography>
            ) : (
                <Button
                    variant="text"
                    onClick={handleResend}
                    sx={{ pr: 1, fontSize: { xs: 10, sm: 12 } }}
                >
                    ارسال مجدد کد
                </Button>
            )}
        </>
    );
};


// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    let navi = useNavigate();
    const location = useLocation();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const [resend, setResend] = React.useState(false)
    const [mobile, setMobile] = React.useState("")
    const [code, setCode] = React.useState("")
    const [smsCodeShow, setsmsCodeShow] = React.useState(false);
    const [loginStart, setLoginStart] = React.useState(false);
    const queryParams = new URLSearchParams(location.search);
    //exit user
    if (queryParams.get('p') === 'exit') {
        localStorage.removeItem("token")
        localStorage.removeItem("team_info")
    }
    React.useEffect(() => {

        if (loginStart && mobile && code)
            loginHandler();
    }, [loginStart])

    const loginHandler = async () => {
        try {


            const result = dataHandler(api.loginUser(), "post", {
                mobile: mobile,
                sms_code: code,
                login_type: 1
            });

            result(async (data, status) => {


                if (status) {

                    if (data.result.type === 'active') {

                        localStorage.setItem("token", data.result.token)
                        setLoginStart(false)
                        const timeout = setTimeout(() => {
                            navi(`/app/user/profile?st=login`)
                        }, 500);

                        return () => clearTimeout(timeout);

                    }
                    else {
                        localStorage.setItem("mobile", mobile)
                        const timeout = setTimeout(() => {
                            navi(`/user/register`)
                        }, 500);
                        return () => clearTimeout(timeout);

                    }

                    //  onChange({ state: true, mobile: tokenvalue })
                }
                else {
                    dispatch(showAlert(data.response.data.message,
                        "error"))
                }
            });
        } catch (error) {
            dispatch(showAlert("اطلاعات ارسالی نادرست است",
                "error"))
            setLoginStart(false)
        }
    };
    return (
        <AuthWrapper1>
            <AlertCompnent />
            <Grid container justifyContent="center" alignItems="center"
             sx={{ minHeight: 'calc(100vh - 68px)', px: 2,maxWidth:{lg:650,sm:"100%",xs:"100%"} }}>
                <Grid item>
                    <AuthCardWrapper>
                       
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid xs={12} item sx={{ mb: 3, pt: 1 }}>
                                    <Typography align='center' sx={{ mt: 4, pt: 2 }}>
                                        <Logo />
                                    </Typography>

                                </Grid>
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Grid item>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography
                                                    color={theme.palette.primary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    به دنیای فینالیست خوش آمدید
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    fontSize="16px"
                                                    textAlign={matchDownSM ? 'center' : 'inherit'}
                                                >
                                                    {smsCodeShow ? (
                                                        <>
                                                            کد ارسالی به شماره <b>{mobile}</b> را وارد نمایید
                                                        </>
                                                    ) : (
                                                        'برای شروع شماره همراه خود را وارد کنید'
                                                    )}
                                                </Typography>


                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} sm={12}>
                                    <Box sx={{ display: smsCodeShow ? 'none' : 'block' }}>
                                        <Transition type={"fade"} in={!smsCodeShow} key={0}>
                                            {<AuthLogin resend={resend} onChange={(e) => {
                                                if (e.state) {
                                                    setsmsCodeShow(e)
                                                    setMobile(e.mobile)
                                                }
                                            }} />}
                                        </Transition>
                                    </Box>
                                    <Transition type={"fade"} in={smsCodeShow} key={0}>
                                        <div>
                                            {<CodeInputMUI onChange={(e) => {
                                                if (e === 'resend') setResend(true)
                                                else {
                                                    setCode(e)
                                                    setLoginStart(true)
                                                }
                                            }} />}
                                        </div>

                                        <Box sx={{ mt: 2 }}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setLoginStart(true)}
                                                >
                                                    <span>ورود</span>
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Transition>
                                </Grid>

                                <Grid item xs={12}>
                                    <Links />
                                </Grid>
                            </Grid>
                       
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>

    );
};

export default Login;
//---------------------------------------------------------------


function Links() {
    const theme = useTheme();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"

            bgcolor="#f5f5f5"
            p={1}
        >
            <Box sx={{ p: 1, borderRadius: 3, maxWidth: 250, width: "100%" }}>



                {/* فوتر لینک‌ها */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                >
                    <Link to="/about" underline="hover">درباره ما</Link>
                    <Link to="/faq" underline="hover">سوالات متداول</Link>
                    <Link to="/other/contact" underline="hover">تماس با ما</Link>
                    <Link to="/other/terms" underline="hover">قوانین</Link>

                </Stack>
                <Box
                    sx={{
                        mt: 3,
                        textAlign: "center",
                        fontSize: "0.6rem!important",
                        color: theme.palette.grey[400],

                    }}
                >
                    <Typography fontSize={"0.8rem"}  >
                        © 2025 فینالیست. کلیه حقوق محفوظ است
                    </Typography>
                    <Typography fontSize={"0.7rem"} >
                        طراحی شده توسط تیم طراحی فینالیست
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
