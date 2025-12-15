import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import splash from "assets/images/screen/splash.png"
import Logo from 'ui-component/Logo';
const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 550,
  height: "100vh",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  boxSizing: "border-box",
}));

/* کارت اسپلش با تصویر پس‌زمینه */
const SplashCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
  backgroundImage: `url(${splash})`,
  backgroundSize: "99.99% 99.99%",
  backgroundPosition: "center center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

/* لایه تاریک برای خوانایی */
const Overlay = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.8) 100%)",
}));

/* محتوای وسط */
const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  width: "100%",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
}));

export default function SplashMui() {
  const navigate = useNavigate();

  return (
    <Root>
      <SplashCard>
        <Overlay />

        <Content>
          <Logo/>
          {/* بخش بالا - لوگو یا نام اپ */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 800,
                letterSpacing: 0.5,
                fontSize: { xs: "1.9rem", sm: "2.2rem" },
              }}
            >
              فینالیست
            </Typography>

            <Typography
              variant="body2"
              
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
              }}
            >
              اولین پلت فرم برگزاری مسابقات 
             
            </Typography>
          </Box>

          {/* فاصله میانی */}
          {/* توضیحات امکانات */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 5,
              maxWidth: 350,
              pt: 6,
            }}
          >
            <Typography
              variant="h5"
              
              sx={{ fontWeight: "bold", textShadow: "0 2px 5px rgba(0,0,0,0.6)" }}
            >
              🏆 برگزاری مسابقات دوستانه و  رسمی
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textShadow: "0 2px 5px rgba(0,0,0,0.6)" }}
            >
              📊 ثبت نتایج و رتبه‌بندی تیم‌ها

            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textShadow: "0 2px 5px rgba(0,0,0,0.6)" }}
            >
              💰 کسب درآمد و جوایز متنوع
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* دکمه شروع */}
          <Button
            onClick={() => (window.location.href = "/user/login")}
            variant="contained"
            sx={{
              width: "80%",
              mb: 4,
              py: 1.8,
              borderRadius: 4,
              fontSize: "1.1rem",
              fontWeight: 700,
              background: "linear-gradient(90deg,#22c55e,#16a34a)",
              boxShadow: "0 6px 18px rgba(34,197,94,0.24)",
              textTransform: "none",
              color: "#fff",
              "&:hover": {
                filter: "brightness(0.95)",
              },
            }}
          >
            <span>شروع</span>
          </Button>
        </Content>
      </SplashCard>
    </Root>
  );
}
