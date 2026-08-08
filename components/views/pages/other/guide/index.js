// src/pages/TermsMd.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
//import remarkGfm from "remark-gfm";


export default function Terms() {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    fetch("./guide.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);
 
  return ( 
    
  <Typography component="div"  textAlign="right"  fontSize={12}  sx={{
        direction: "rtl",
        textAlign: "right",
        backgroundColor: "#ffffff",
        p: { xs: 2, md: 5 },
        m: { xs: 1, md: 4 },
        borderRadius: 2,
      }}><ReactMarkdown >{content}</ReactMarkdown></Typography>)

}