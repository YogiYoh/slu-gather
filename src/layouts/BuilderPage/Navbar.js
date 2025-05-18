/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

import { signOut } from "firebase/auth";

import PropTypes from "prop-types";
function BuilderNavbar({ search, setSearch }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

BuilderNavbar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func
};

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    navigate("/authentication/sign-in?redirect=/builder");
  };
  const handleSignUp = () => {
    navigate("/authentication/sign-up?redirect=/builder");
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally, redirect or show a toast, but UI will update automatically
    } catch (err) {
      alert("Failed to log out.");
    }
  };

  return (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="xl"
        px={3}
        py={2}
        boxShadow="sm"
        mb={4}
        sx={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px"
        }}
      >
        {/* Left: Logo */}
        <MDBox display="flex" alignItems="center">
          <img
            src={require("assets/images/favicon.png")}
            alt="Logo"
            style={{
              width: 72,
              height: 72,
              borderRadius: "8px",
              marginRight: 10,
              objectFit: "contain",
            }}
          />
        </MDBox>

        {/* Center: Search bar */}
        <MDBox flex={1} mx={3} maxWidth="400px">
          <MDInput
            type="search"
            placeholder="Search events by title…"
            fullWidth
            size="small"
            sx={{ minWidth: 200 }}
            value={typeof search !== "undefined" ? search : ""}
            onChange={e => setSearch && setSearch(e.target.value)}
          />
        </MDBox>

        {/* Right: Auth buttons or user avatar and logout, plus Create Meetup */}
        <MDBox display="flex" alignItems="center" gap={1}>
          {currentUser ? (
            <>
              <Avatar alt="user avatar" src={currentUser.photoURL || undefined}>
                {(!currentUser.photoURL && currentUser.email)
                  ? currentUser.email.charAt(0).toUpperCase()
                  : ""}
              </Avatar>
              <MDButton
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
                sx={{ ml: 1, minWidth: 80 }}
              >
                Logout
              </MDButton>
            </>
          ) : (
            <>
              <MDButton variant="outlined" color="info" onClick={handleSignIn}>
                Sign In
              </MDButton>
              <MDButton variant="gradient" color="info" onClick={handleSignUp}>
                Sign Up
              </MDButton>
            </>
          )}
        </MDBox>
      </MDBox>
    </>
  );
}

export default BuilderNavbar;
