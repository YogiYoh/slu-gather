/* eslint-disable prettier/prettier */
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import sampleImage from "../../assets/images/sample.jpg";
const attendees = [
  sampleImage,
  sampleImage,
  sampleImage
];

function MeetupListUI() {
  return (
    <MDBox display="flex" justifyContent="center">
      <MDBox width="100%" maxWidth="1200px" px={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <MDBox component="img" src={sampleImage} alt="Meetup" width="100%" height="180px" borderRadius="lg 0 0 0" objectFit="cover" />
              <MDBox p={2} display="flex" justifyContent="space-between" alignItems="center">
                <MDBox>
                  <MDTypography variant="h6">Meetup Title</MDTypography>
                  <MDTypography variant="body2" color="text">
                    Date • Location • Time
                  </MDTypography>
                </MDBox>
                <MDBox display="flex">
                  {attendees.map((src, index) => (
                    <Avatar
                      key={index}
                      src={src}
                      sx={{
                        width: 32,
                        height: 32,
                        border: "2px solid white",
                        ml: index === 0 ? 0 : -1
                      }}
                    />
                  ))}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default MeetupListUI;
