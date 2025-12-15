import * as React from 'react';
import {useTheme} from '@mui/material/styles';
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
            sx={{background: theme.palette.orange.main, minWidth: "100%"}}
            nextButton={
            //if props.step=5 send data successfully
                <Button size="small" onClick={handleNext} disabled={props.step === props.stepnumber||props.step===5}>
                    {props.step + 1 < props.stepnumber ? <> <span>بعدی</span> {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft/>
                        ) : (
                            <KeyboardArrowRight/>
                        )}</>
                        : <span>ثبت</span>}

                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={props.step === 0||props.step===5}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight/>
                    ) : (
                        <KeyboardArrowLeft/>
                    )}
                    <span>قبلی</span>
                </Button>
            }
        />
    );
}
