import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { Send as SendIcon, Email, Phone } from "@mui/icons-material";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ارسال شد:", form);
    alert("پیام شما با موفقیت ارسال شد 🌟");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #70c1b3, #7067cf)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 550,
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 2 }}
        >
          تماس با ما
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<span>نام شما</span>}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<span>ایمیل</span>}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={<span>پیام شما</span>}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                type="submit"
                sx={{
                  py: 1.2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <span>ارسال</span>
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Divider and Contact Info */}
        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: "center", color: "text.secondary" }}>
          <Typography variant="h6" gutterBottom>
            برای ارتباط مستقیم با ما:
          </Typography>

        
       

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Email fontSize="small" color="primary" />
            <Typography variant="body2" dir="ltr">
              contactus@finalistapp.ir
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
