// app/docs/guide/page.tsx (یا pages/docs/guide.jsx)
import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from '@mui/material';
import fs from 'fs';
import path from 'path';

export default function GuidePage() {
  // خواندن فایل در سمت سرور
  const filePath = path.join(process.cwd(), './app/docs/guide/guide.md');
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <Typography 
      component="div" 
      textAlign="right" 
      fontSize={12} 
      sx={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: "#ffffff",
        p: { xs: 2, md: 5 },
        m: { xs: 1, md: 4 },
        borderRadius: 2,
      }}
    >
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </Typography>
  );
}