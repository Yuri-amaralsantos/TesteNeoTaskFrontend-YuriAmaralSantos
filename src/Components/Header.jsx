import React from "react";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../background.jpg";

export default function Header({ children }) {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        color: "white",
        textAlign: "center",
        p: "2rem 1rem",
        background: `linear-gradient(to right, rgba(139,69,19,0.9), rgba(210,105,30,0.85)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        component="img"
        src="/tiao-carreiro-pardinho.png"
        alt="Tião Carreiro"
        sx={{
          width: { xs: 150, sm: 200 },
          height: { xs: 150, sm: 200 },
          borderRadius: "50%",
          border: "4px solid rgba(255,255,255,0.8)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          mx: "auto",
          mb: 2,
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", mb: 1 }}
      >
        Top 5 Músicas Mais Tocadas
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        color="white"
        sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", opacity: 0.9 }}
      >
        Tião Carreiro &amp; Pardinho
      </Typography>
      {children}
    </Box>
  );
}
