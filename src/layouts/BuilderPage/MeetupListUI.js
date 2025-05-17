import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

function MeetupListUI() {
  return (
    <MDBox mt={4} px={2}>
      <Grid container spacing={3}>
        {/* Example Meetup Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h6">Meetup Title</MDTypography>
              <MDTypography variant="body2" color="text">
                Date • Location • Time
              </MDTypography>
              <MDBox mt={1}>
                <MDTypography variant="body2">
                  Short description or tags
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>

        {/* Repeat <Grid item> for each meetup */}
      </Grid>
    </MDBox>
  );
}

export default MeetupListUI;