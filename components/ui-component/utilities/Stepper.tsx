"use client"
import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function DotsMobileStepper(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(props.step ? props.step : 0);

    const handleNext = () => {

        props.onChange("Next")
    }

    const handleBack = () => {
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        props.onChange("Back")

    };
    React.useEffect(() => {

        //console.log(props.step)
    }, [props.step])
    
    return (
        <MobileStepper
            variant="dots"
            steps={props.stepnumber}
            position="static"
            activeStep={props.step}
            sx={{
                background: alpha(theme.palette.primary.light, 0.2), // ۷۰ درصد غلظت رنگ
                backdropFilter: "blur(8px)",
                minWidth: "100%",
            }}
            nextButton={
                //if props.step=5 send data successfully
                <Button sx={{ fontWeight: 550, fontSize: 16 }} size="large" onClick={handleNext} disabled={props.step === props.stepnumber || props.step === 5}>
                    {props.step + 1 < props.stepnumber ? <> <span>بعدی</span> {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}</>
                        : <span>ثبت</span>}

                </Button>
            }
            backButton={
                <Button sx={{ fontWeight: 550, fontSize: 16 }} size="large" onClick={handleBack} disabled={props.step === 0 || props.step === 5}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    <span>قبلی</span>
                </Button>
            }
        />
    );
}
