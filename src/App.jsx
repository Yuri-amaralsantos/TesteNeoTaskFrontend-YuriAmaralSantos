import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  GlobalStyles,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./Components/Header";
import Musicas from "./Components/Musicas";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

function App() {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
    closeModal();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigateTo("/");
  };

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <>
      {/* Global CSS Reset and Body Styling */}
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            margin: 0,
            padding: 0,
            background: "#f5f5f5",
          },
        }}
      />

      {/* Custom Header with Background Image and Gradient */}
      <Header>
        {/* User actions in the header */}
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ mr: 2, display: "inline" }}>
                Welcome, <strong>{user.username}</strong> ({user.role})
              </Typography>
              <Button variant="contained" onClick={handleLogout}>
                Logoff
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => openModal("login")}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button variant="contained" onClick={() => openModal("register")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Header>

      {/* Login/Register Modal */}
      <Dialog open={Boolean(modalType)} onClose={closeModal}>
        <DialogTitle>
          {modalType === "login" ? "Login" : "Register"}
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {modalType === "login" ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm />
          )}
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 2 }}>
        {currentPath === "/" && <Musicas />}
        {/* Add additional routes as needed */}
      </Container>
    </>
  );
}

export default App;
