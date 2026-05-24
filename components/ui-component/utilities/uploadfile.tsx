"use client";

import dynamic from 'next/dynamic'; // برای حل مشکل رندر در Next.js
import { Dialog, DialogContent, DialogActions } from '@mui/material';
// { useDropzone } from 'react-dropzone';
import { IconX } from '@tabler/icons-react';
import React, { useState, useEffect, useRef, PropsWithChildren } from "react";
import {
  Box,
  Stack,
  Slider,
  Button,
  Typography,
  IconButton,
  ThemeProvider,
  createTheme,
  styled
} from "@mui/material";
import { useDropzone, Accept } from 'react-dropzone';
import { IconEdit } from '@tabler/icons-react'; // فرض بر استفاده از tabler-icons
import AvatarEditor from 'react-avatar-editor';
// --- ۱. تعاریف و اینترفیس‌ها ---
import api from '@/components/api/api'
interface UploadResponse {
  result: {
    filepath: string;
  };
}

interface FileuploaderProps {
  onChange: (data: { fileskey: string; filepath: string }) => void;
  section_id: string | number;
}

interface CropperProps {
  imageFile: string | File | null;
  onSave: (dataUrl: string) => void;
}

// --- ۲. کامپوننت استایل‌دهی شده (حل مشکل خطای children و border) ---
interface MainCardWrapperProps {
  border?: boolean;
}

// اگر MainCard یک کامپوننت داخلی است، تایپ آن را پاس بده
export const MainCardWrapper = styled(Box)<MainCardWrapperProps>(({ theme, border }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: 150,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  border: border ? `1px solid ${theme.palette.divider}` : 'none',
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      rgba(223, 223, 223, 0.2),
      rgba(61, 61, 61, 0.2) 5px,
      transparent 1px,
      transparent 12px
    )!important`
}));

// --- ۳. تابع کمکی آپلود (Utility) ---
interface UploadHandlerParams {
  onChange: (data: { fileskey: string; filepath: string }) => void;
  fileObj: Blob | File;
  setPercentOfFileUploaded: (percent: number) => void;
  sectionId: string ;
  onComplete?: () => void;
}

export function uploadHandler({
  onChange,
  fileObj,
  setPercentOfFileUploaded,
  sectionId,
  onComplete
}: UploadHandlerParams): void {
  const file = new File([fileObj], 'cropped-image.png', { type: 'image/png' });
  const formdata = new FormData();
  formdata.append("UpFiles", file, file.name);

  const ajax = new XMLHttpRequest();

  ajax.upload.addEventListener("progress", (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      setPercentOfFileUploaded(percent);
    }
  });

  ajax.addEventListener("load", (event: Event) => {
    const target = event.currentTarget as XMLHttpRequest;
    try {
      console.log(target)
      const obj: UploadResponse = JSON.parse(target.response);
      onChange({ fileskey: "", filepath: obj.result.filepath });
      if (onComplete) onComplete();
    } catch (e) {
      console.error("Error parsing upload response", e);
    }
  });

  ajax.open("POST", api.fileUpload(sectionId)); // جایگزین با Api.fileUpload
  ajax.setRequestHeader("File-Name", encodeURIComponent(file.name));
  ajax.send(formdata);
}




// ۱. لود کردن ادیتور به صورت داینامیک (بسیار مهم)


// --- کامپوننت کراپ تصویر ---
const ProfileImageCropper = ({ imageFile, onSave, onCancel }: any) => {
  const editorRef = useRef<any>(null);
  const [scale, setScale] = useState<number>(1);

  const handleSave = () => {
    if (editorRef.current) {
      // دریافت عکس با کیفیت بالا
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL('image/jpeg');
      onSave(dataUrl);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 1 }}>
      {imageFile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <AvatarEditor
            ref={editorRef}
            image={imageFile}
            width={250}
            height={250}
            border={50}
            borderRadius={150} // برای نمایش دایره‌ای
            color={[255, 255, 255, 0.6]} // رنگ حاشیه
            scale={scale}
          />
        </Box>
      )}

      <Box sx={{ px: 2, mb: 3 }}>
        <Typography variant="caption" display="block" gutterBottom sx={{ color: 'text.secondary' }}>
          میزان زوم: {Math.round(scale * 100)}%
        </Typography>
        <Slider
          value={scale}
          min={1}
          max={3}
          step={0.01}
          onChange={(_, val) => setScale(val as number)}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" fullWidth onClick={onCancel} color="inherit">
        <span>انصراف</span>  
        </Button>
        <Button  variant="contained" fullWidth onClick={handleSave}>
        <span>برش /تایید</span>  
        </Button>
      </Box>
    </Box>
  );
};

// --- ۵. کامپوننت اصلی آپلودر ---
export const AvatarCropper = ({ onChange, uploadFileButtonTitle, uploadIconButton }: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,

    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    multiple: false
  });

  return (
    <>
      {/* استفاده از Dialog استاندارد MUI به جای Box معمولی */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">تنظیم تصویر پروفایل</Typography>
        </Box>
        <DialogContent>
          <ProfileImageCropper
            imageFile={image}
            onCancel={() => setDialogOpen(false)}
            onSave={(data: string) => {
              onChange(data);
              setDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Box {...getRootProps()} sx={{ cursor: 'pointer', display: 'inline-block' }}>
        <input {...getInputProps()} />
        {uploadIconButton ? (
          <IconButton color="primary" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <IconEdit size={20} />
          </IconButton>
        ) : (
          <Button variant="outlined" startIcon={<IconEdit size={18} />}>
            {uploadFileButtonTitle}
          </Button>
        )}
      </Box>
    </>
  );
};