import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMaterialUIController, setLayout } from "context";
/* eslint-disable prettier/prettier */

function BuilderPage() {
  const [controller, dispatch] = useMaterialUIController();

  useEffect(() => {
    setLayout(dispatch, "vr"); // "vr" layout hides sidebar and config
  }, []);

  return (
    <MDBox p={3}>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="white"
        borderRadius="xl"
        px={3}
        py={2}
        boxShadow="sm"
        mb={4}
      >
        {/* Left: Logo & App name */}
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
            placeholder="Search…"
            fullWidth
            size="small"
            sx={{ minWidth: 200 }}
          />
        </MDBox>
        {/* Right: Auth buttons */}
        <MDBox display="flex" alignItems="center" gap={1}>
          <MDButton variant="outlined" color="info">
            Sign In
          </MDButton>
          <MDButton variant="gradient" color="info">
            Sign Up
          </MDButton>
        </MDBox>
      </MDBox>
      {/* Additional components for the builder page will go here */}
    </MDBox>
  );
}


export default BuilderPage;
