import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
//ui-material
import {Box, Stack, TextField, useTheme} from "@mui/material";

import {IconSend} from "@tabler/icons-react";
//tabler icon
//project import
import CustomLoadingButton from "views/utilities/CustomLoadingButton";
import {uploadHandler} from "views/utilities/uploadfile"
import dataHandler from "api/dataHandler";
import api from "api/api";
import {showAlert} from "store/alertReducer";
//----------------------------| Add Content |---------------------
const Content = ({image, onChange, file}) => {
    const dispatch=useDispatch()
    const theme = useTheme()
    const [description, setDescription] = React.useState(null)
    const [path, setPath] = React.useState(null
    )

    const [percentOfFileUploaded, setPercentOfFileUploaded] = React.useState(0); // state برای درصد پیشرفت آپلود


    const imgStyle = {
        width: "100%",
        height: "100%",
        minWidt: "100%",
        marginTop: "10px",
        borderRadius: "10px",


    }
    const stackSX = {
        border: "1px solid",
        borderRadius: "5px",
        m: 1,
        borderColor: theme.palette.grey[400]

    }
    function sendContent() {
          const queryParams = new URLSearchParams(location.search); //get tid value
          const team_id=queryParams.get('tid')
            const formData = {
                content_type: "image",
                "title": "Post",
                "description": description,
                "media_url": path,
                "visibility": "public",
                "owner_type":"team",
                "team_id":team_id
            }

            const result = dataHandler(api.createContent(1), "post", formData)
            try {
                result(async function (data, status) {

                    dispatch(showAlert(status ? data["message"] : data.response.data["message"],
                      status ? "success" : "error"  ))


                    onChange(false)

                })
            } catch (error) {

              dispatch(showAlert("خطایی رخ داده",
                       "error"  ))

            }

        }
    const sendData = async () => {
        // تابعی که پس از اتمام آپلود فراخوانی می‌شود

        function handleUploadComplete({fileskey, filepath}) {
            console.log("فایل با موفقیت آپلود شد!");
            console.log("filepath:", filepath);
            setPath(filepath)

        }

        if (file) {//send file to server
            try {
                await uploadHandler({
                    onChange: handleUploadComplete,
                    fileObj: file,
                    setPercentOfFileUploaded: setPercentOfFileUploaded,
                    sectionId: 2,
                   // onComplete: sendContent
                });


            } catch (error) {
                console.error(error);
            }
        }


    }
  React.useEffect(()=>
  {
      if(path)
      {
          sendContent()
          setPath(null)
      }

  },[path])
    return (
        <>

            {image ?
                <Stack sx={stackSX}>

                    <Box sx={{p: 2}}>
                        <img style={imgStyle} src={image}/>
                    </Box>
                    <Box sx={{p: 2}}>
                        <TextField
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={"توضیحاتی در مورد عکس بنویسید"}
                            fullWidth
                            id="caption"
                            /*  onChange={(e) =>
                                  props.onChange({name:"match_location_address",value:`${e.target.value}`})}*/

                            sx={{
                                direction: "rtl",
                                fontFamily: "orginalfont!important",
                                "& .MuiInputBase-input": {
                                    fontFamily: "orginalfont", // تغییر فونت متن داخل input
                                },
                            }}
                            maxRows={4}
                            multiline
                            variant="filled"
                        />
                    </Box>
                    <Box sx={{p: 2}}>
                        <CustomLoadingButton endIcon={<IconSend/>} padding={"5px"}
                                             onChange={sendData}
                                             variant={"contained"}>ارسال</CustomLoadingButton>
                    </Box>


                </Stack> : <h5>
                    فایلی انتخاب نشده
                </h5>
            }
        </>
    )
}

export default Content