//this.setState({ [`image${i}`]: image })
/**
 * <button
                    onClick={() => {
                        this.setState({
                            [this.state.name]: this.state.value,
                        });
                    }}
 */
"use client"
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

    const defaultGradient =
        "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)";

    const onClickHandle = () => {
        setLoadButton(true);

        if (props.type !== "submit" && props.onChange) {
            props.onChange(true);
        }
    };

    useEffect(() => {
        if (loadButton) {
            const timer = setTimeout(() => {
                setLoadButton(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [loadButton]);

    return (
        <LoadingButton
            type={props.type || "button"}
            endIcon={props.endIcon}
            startIcon={props.startIcon}
            disabled={props.disabled}
            variant={props.variant || "contained"}
            color={props.color || "inherit"}
            loading={loadButton}
            loadingIndicator={
                <CircularProgress size={20} color="inherit" />
            }
            onClick={onClickHandle}
            {...props}
            sx={{
                background:
                    props.gradient || defaultGradient,

                borderRadius: props.borderRadius || 2,
                p: props.padding || 0,
                minWidth: "100%",
                mt: props.mt,

                fontFamily: "orginalfont",
                color: "#fff",

                transition: "all .3s ease",

                "&:hover": {
                    background:
                        props.gradient || defaultGradient,
                    filter: "brightness(0.95)",
                    transform: "translateY(-2px)",
                    boxShadow:
                        "0 8px 20px rgba(0,0,0,.15)",
                },

                "&:active": {
                    transform: "translateY(0)",
                },

                ...props.sx,
            }}
        />
    );
};
export default CustomLoadingButton;
//---------------------------------------SUBMIT BUTTON
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
                    backgroundColor: theme.palette.primary.main,
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
