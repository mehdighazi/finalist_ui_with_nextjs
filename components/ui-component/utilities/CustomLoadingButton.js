//this.setState({ [`image${i}`]: image })
/**
 * <button
                    onClick={() => {
                        this.setState({
                            [this.state.name]: this.state.value,
                        });
                    }}
 */
import * as React from 'react'
import { useState, useEffect } from 'react'

//ui-material
import {

    useTheme
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
//---------------------------------------Jupmer for buybasket adjust buy number

//assest
import { IconPlus, IconMinus, IconSearch, IconChevronLeft } from "@tabler/icons-react"

///---------------------------------------Prodcut Card
const CustomLoadingButton = (props) => {
    const theme = useTheme();
    const [loadButton, setLoadButton] = useState(false);

    const onClickHandle = () => {
        console.log(props.type)
        setLoadButton(true);
        if (props.type !== 'submit')
            props.onChange(true)
    }
    useEffect(() => {
        /*header scroll handler*/

        setTimeout(() => {
            setLoadButton(false)

        }, 1000);

    }, [loadButton]);
    return (
        <>

            <LoadingButton
                type={props.type ?? 'Button'}
                endIcon={props.endIcon}
                startIcon={props.startIcon}
                disabled={props.disabled}
                variant={props.variant ? props.variant : "text"}
                color={props.color ? props.color : "inherit"}
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: props.borderRadius ?? 2,
                    p: props.padding ? props.padding : 0,
                    minWidth: "100%",
                    mt: props.mt,
                    transition: 'all 0.3s ease-in-out', 
                    fontFamily: "orginalfont",
                    color: "white", // رنگ پیش‌فرض متن (اگر می‌خواهی همیشه سفید باشد)
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.10))',
                        color: 'white',
                    },
                }}
                onClick={onClickHandle}
                loadingIndicator={<CircularProgress color={props.color} size={20} />}
                {...props}
                loading={loadButton}
            />



        </>
    )

}
export default CustomLoadingButton;
export const CustomSubmitButton = (props) => {
    const theme = useTheme();
    const [loadButton, setLoadButton] = useState(false);


    useEffect(() => {
        /*header scroll handler*/

        setTimeout(() => {
            setLoadButton(false)

        }, 1000);

    }, [loadButton]);

    return (
        <>

            <LoadingButton type={'submit'} endIcon={props.endIcon} startIcon={props.startIcon} disabled={props.disabled}
                variant={props.variant ? props.variant : "text"}
                color={props.color ? props.color : "inherit"} sx={{
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: props.borderRadius ?? 2
                    , p: props.padding ? props.padding : 0,
                    minWidth: "100%", mt: props.mt, fontFamily: "orginalfont",
                    '&:hover': {
                        backgroundColor: props.variant === 'contained' ? 'primary.light' : 'primary.dark',
                        color: props.variant === 'contained' ? 'white' : 'black',
                    },
                }}
                loadingIndicator={<CircularProgress color={props.color} size={20} />}

                {...props} loading={loadButton} />



        </>
    )

}
