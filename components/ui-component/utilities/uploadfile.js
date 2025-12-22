//---------------------------------React import
import React, { useState, useRef } from 'react';

//----------------------------------Mui import
import { DropzoneArea } from 'react-mui-dropzone'
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import { Box, Button, IconButton, Slider, Stack, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import AvatarEditor from 'react-avatar-editor';

//tabler icon
import { IconEdit, IconSend } from "@tabler/icons-react"
//----------------------------------project import
import Api from 'api/api';
import DialogBox from './Dialog'
import CustomLoadingButton from './CustomLoadingButton'
async function uploadKey(length) {
    //edit the token allowed characters
    var a = "a3bcd342efghijklmnopqrstu135vw4xyzABC545DEFGHIJK334LMNOPQRSTUVWXYZ1234890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
const theme = createTheme({
    overrides: {
        DropzoneArea: {
            text: {
                "font-family": "orginalfont",
                "font-size": "12px"
            },
            icon:
            {

                color: 'gray'
            },
            root:
            {
                background: 'linear-gradient(45deg,#e2e2e2 10%, ,#e2e2e3 90%)'
            }
        }
    }
});
function CropperComponent({ image, onChange }) {
    const theme = useTheme()
    //const [image,setImage]=useState(null)

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [aspect, setAspect] = useState(1)
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;
                ctx.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    resolve(blob);
                }, 'image/jpeg');
            };

            image.onerror = () => {
                reject(new Error('Failed to load image'));
            };
        });
    };
    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    const handleCrop = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onChange(croppedImage)
            //   console.log('Cropped Image:', croppedImage);
            // حالا می‌توانید croppedImage را به سرور ارسال کنید یا ذخیره کنید
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    };
    const BoxStyle = {
        border: "solid 1px",
        borderColor: theme.palette.grey[400],
        borderRadius: 2,
        padding: 1,
        m: 1,

    }
    return (<>
        <Box sx={BoxStyle}>

            <Stack>
                {image && (
                    <Box sx={{ position: 'relative', width: '100%', height: '350px', marginTop: '10px' }}>
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            // aspect={aspect} // نسبت ابعاد کراپ (مثلاً 1 برای مربع)
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            aspect={4 / 3} // نسبت ابعاد ناحیه برش
                        //  cropSize={{width: 400, height: 300}} // اندازه ناحیه برش
                        />
                    </Box>
                )}
                {image && (
                    <Slider
                        aria-label="zoom"
                        defaultValue={1}
                        //getAriaValueText={valuetext}
                        onChange={(e) => setZoom(e.target.value)}
                        valueLabelDisplay="auto"
                        shiftStep={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />)}
                {image && (
                    <CustomLoadingButton endIcon={<IconEdit />} padding={"5px"}
                        onChange={() => handleCrop()} variant={"contained"}>تایید </CustomLoadingButton>
                )}
            </Stack>

        </Box>
    </>)
}

export function Fileuploader({ onChange, section_id }) {
    const [imgSrc, SetimgSrc] = useState("");
    const [Uploadedfile, SetUploadedfile] = useState([]);
    const [fileskey, setFileskey] = useState();
    const [filename, Setfilename] = useState("فایلی انتخاب نشده");
    const [percent, Setpercent] = useState("ارسال فایل");
    const [disable, Setdisable] = useState(false)
    const [colorbtn, Setcolorbtn] = useState("white")
    React.useEffect(() => {

        setFileskey(uploadKey(12))//create a key for file upload

    }, [])

    async function HandleUpload(files) {
        var file = files;

        if (file.length > 0) {
            var reader = new FileReader();
            var fileurl = reader.readAsDataURL(file[0]);

            reader.onloadend = function (e) {

                SetUploadedfile(file);


            }
        }


    }

    async function handleSubmit(e) {

        //   Setdisable(true);


        Uploadedfile.map((item) => {

            var file = item;
            var reader = new FileReader();
            var fileurl = reader.readAsDataURL(file);
            var formdata = new FormData();
            formdata.append("UpFiles", file, file.name);
            var ajax = new XMLHttpRequest();
            ajax.upload.addEventListener("progress", progressHandler, false);
            ajax.addEventListener("load", completeHandler, false);
            ajax.addEventListener("error", errorHandler, false);
            ajax.addEventListener("abort", abortHandler, false);
            ajax.open("POST", Api.fileUpload(section_id));
            ajax.setRequestHeader("UpFiles", unescape(encodeURIComponent(file.name)));
            //use file_upload_parser.php from above url

            ajax.send(formdata);

        })

    }

    function progressHandler(event) {
        var percent = Math.round((event.loaded / event.total) * 100);
        Setpercent(`${percent} %آپلودشده..`)
    }

    async function completeHandler(event) {
        Setpercent("فایل با موفقیت ارسال شد")
        const obj = JSON.parse(event.currentTarget.response);
        await onChange({ fileskey: fileskey, filepath: obj.result.filepath });

        async function errorHandler(event) {
            // this.setState({

            // filestatus: "خطا در ارسال فایل"
            // })
            console.log("خطا در ارسال فایل");

        }

        async function abortHandler(event) {
            console.log("خطا در ارسال فایل");
        }

        return (
            <div className="container ">
                <div classname="">
                    <div class="col-sm-12 ">

                        <div classname="container p-5">
                            <ThemeProvider theme={theme}> <DropzoneArea
                                style={{ border: "1px gray" }}
                                onChange={(event) => HandleUpload(event)}
                                dropzoneClass="font-normal"
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                showPreviews={false}
                                maxFileSize={50000000}
                                dropzoneText={<span style={{ fontSize: "12px" }}>فایل انتخاب کنید یا برروی این قسمت بیاندازید</span>}
                            />
                            </ThemeProvider>


                        </div>


                    </div>
                    <div class="col-sm-12">
                        <Button onClick={handleSubmit} disabled={disable} variant="contained" style={{
                            minWidth: "100%",
                            backgroundColor: "gray",
                            color: "rgb(139, 5, 5)"
                        }}><span>{percent}</span></Button>
                    </div>

                </div>
            </div>
        )

    }

}

export function uploadHandler({ onChange, fileObj, setPercentOfFileUploaded, sectionId, onComplete }) {

    const file = new File([fileObj], 'cropped-image.png', {
        type: 'image/png',
    });
    let formdata = new FormData();
    formdata.append("UpFiles", file, file.name);
    const ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", handleProgress, false);
    ajax.addEventListener("load", handleCompleteUpload, false);
    ajax.addEventListener("error", handleError, false);
    ajax.addEventListener("abort", handleAbort, false);
    ajax.open("POST", Api.fileUpload(sectionId));
    ajax.setRequestHeader("UpFiles", unescape(encodeURIComponent(file.name)));
    //use file_upload_parser.php from above url
 
    ajax.send(formdata);


    async function handleProgress(event) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setPercentOfFileUploaded(percent)
        // setPercent(`${percent} %آپلودشده..`)
        //console.log(percent)
    }

    async function handleError(event) {
        // this.setState({

        // filestatus: "خطا در ارسال فایل"
        // })
     
        console.log("خطا در ارسال فایل");

    }

    async function handleAbort(event) {
        console.log("خطا در ارسال فایل");
    }

    async function handleCompleteUpload(event) {

        const obj = JSON.parse(event.currentTarget.response);
        
        //setBackdropOpen(false)
        onChange({ fileskey: "", filepath: obj.result.filepath});
        if (onComplete) {
            onComplete();
        }
    }


}

export function GetFileButtonWithCrop({ onChange, uploadIconButton, uploadFileButtonTitle }) {
    const [image, setImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setDialogOpen(true)
        };
        reader.readAsDataURL(file);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const cropCompnentOnchange = (e) => {

        if (e) {
            onChange(e)//for send
            setDialogOpen(false)

        }

    }

    //-----------------------------------| Upload Functions |------------------------------------

    //---------------------------------------------------------------------------------------------

    return (<>
        <DialogBox size={"sm"} title={"انتخاب تصویر"} onChange={(event) => setDialogOpen(event)}
            open={dialogOpen}
            content={<CropperComponent image={image} onChange={(e) => cropCompnentOnchange(e)} />} />
        {/*
        <Backdrop
            sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            open={openBackdrop}
            onClick={() => setBackdropOpen(false)}
        >
            <Typography variant={"h6"}>
                {percent}
            </Typography>
            <CircularProgress color="inherit"/>
        </Backdrop>*/}
        {!uploadIconButton ?
            <CustomLoadingButton color={"primary"} variant={"contained"} borderRadius={3} padding={"8px"}
                startIcon={<IconEdit />} {...getRootProps()} >
                <input {...getInputProps()} />
                <Typography fontSize={12}>{uploadFileButtonTitle}</Typography>
            </CustomLoadingButton> :
            <IconButton {...getRootProps()}>
                <IconEdit />
                <input {...getInputProps()} />
            </IconButton>

        }
        {/*<img width={150} height={150} src={cropedImg}/>*/}


        {/* دکمه کراپ */}

    </>)
}
export function AvatarCropper({ onSave, uploadIconButton, uploadFileButtonTitle, onChange }) {
    const [image, setImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const theme = useTheme()
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {

            setImage(reader.result);
            setDialogOpen(true)
        };
        reader.readAsDataURL(file);
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const cropCompnentOnchange = (e) => {
        if (e) {
            onChange(e)//for send
            setDialogOpen(false)

        }
    }
    return (
        <>
            <DialogBox size={"sm"} title={"انتخاب تصویر"} onChange={(event) => setDialogOpen(event)}
                open={dialogOpen}
                content={<ProfileImageCropper imageFile={image} onSave={(e) => cropCompnentOnchange(e)} />} />

            {!uploadIconButton ?
                <CustomLoadingButton color={"primary"} variant={"contained"} borderRadius={3} padding={"8px"}
                    startIcon={<IconEdit size={16} />} {...getRootProps()} >
                    <input {...getInputProps()} />
                    <Typography fontSize={12}>{uploadFileButtonTitle}</Typography>
                </CustomLoadingButton> :
                <IconButton {...getRootProps()}>
                    <IconEdit color={theme.palette.secondary.light} size={18} />
                    <input {...getInputProps()} />
                </IconButton>

            }
        </>

    );
}
const ProfileImageCropper = ({ imageFile, onSave }) => {

    const editorRef = useRef(null);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    /*const handleFileChange = e => {
      const file =imageFile;
      if (file?.type.startsWith('image/')) {
        setImage(file);
      }
    };*/

    const handleSave = () => {
        if (editorRef.current) {
            // خروجی canvas با ابعاد اصلی تصویر
            const canvas = editorRef.current.getImageScaledToCanvas();
            const dataUrl = canvas.toDataURL('image/jpeg');
            onSave?.(dataUrl);
        }
    };

    return (<>
        <Box style={{ textAlign: 'center', minHeight: "100%", background: "#fff", p: 5 }}>


            <AvatarEditor
                ref={editorRef}
                image={imageFile}
                width={200}
                height={200}
                border={20}
                borderRadius={100} // برای خروجی دایره‌ای
                color={[255, 255, 255, 0.6]} // رنگ پس‌زمینه
                scale={scale}
            />
            <Box sx={{ p: 2 }}>
                <Slider
                    value={scale}
                    min={1}
                    max={3}
                    step={0.01}
                    onChange={(e, val) => setScale(val)}
                />
            </Box>
            {
                <CustomLoadingButton borderRadius={0} endIcon={<IconEdit />} padding={"5px"}
                    onChange={() => handleSave()} variant={"contained"}>تایید </CustomLoadingButton>
            }

        </Box>
    </>)
}
