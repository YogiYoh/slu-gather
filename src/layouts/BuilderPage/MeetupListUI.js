/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import meetupDefault1 from "../../assets/images/meetup_default1.png";
import meetupDefault2 from "../../assets/images/meetup_default2.png";
import meetupDefault3 from "../../assets/images/meetup_default3.png";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import CreateEventModal from "../../components/CreateEventModal";

function MeetupListUI() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  async function fetchMeetups() {
    setLoading(true);
    try {
      const colRef = collection(firestore, "meetups");
      const snapshot = await getDocs(colRef);
      console.log("RAW DOCS", snapshot.docs);
      const list = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("doc.id:", doc.id, "doc.data():", data);
        return { id: doc.id, ...data };
      });
      console.log("MEETUPS LIST", list);
      setMeetups(list);
      setError("");
    } catch (err) {
      setError(err.message || String(err));
      setMeetups([]);
      console.error("FIRESTORE ERROR", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeetups();
  }, []);

  return (
    <>
      <MDBox display="flex" justifyContent="center">
        <MDBox width="100%" maxWidth="1200px" px={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <MDBox display="inline-flex" gap={1}>
                <MDButton
                  variant="outlined"
                  color="info"
                  onClick={fetchMeetups}
                  disabled={loading}
                  sx={{ mb: 2, minWidth: 120 }}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </MDButton>
                <MDButton
                  color="info"
                  onClick={() => setOpenModal(true)}
                  sx={{ mb: 2, height: "40px", minWidth: 145 }}
                >
                  + Create Meetup
                </MDButton>
              </MDBox>
            </Grid>
            {loading && (
              <Grid item xs={12}>
                <MDTypography align="center">Loading meetups…</MDTypography>
              </Grid>
            )}
            {error && (
              <Grid item xs={12}>
                <MDTypography align="center" color="error">
                  Error: {error}
                </MDTypography>
              </Grid>
            )}
            {!loading && !error && meetups.length === 0 && (
              <Grid item xs={12}>
                <MDTypography align="center" color="secondary">
                  No meetups found.
                </MDTypography>
              </Grid>
            )}
            {meetups.map(meetup => (
              <Grid item xs={12} md={6} lg={4} key={meetup.id}>
                <Card>
                  <MDBox
                    component="img"
                    src={meetup.imageUrl || [meetupDefault1, meetupDefault2, meetupDefault3][(meetups.findIndex(m => m.id === meetup.id)) % 3]}
                    alt="Meetup"
                    width="100%"
                    height="180px"
                    borderRadius="lg 0 0 0"
                    objectFit="cover"
                  />
                  <MDBox p={2} display="flex" justifyContent="space-between" alignItems="center">
                    <MDBox>
                      <MDTypography variant="h6">
                        {meetup.title || "Untitled Meetup"}
                      </MDTypography>
                      <MDTypography variant="body2" color="text">
                        {meetup.date || "Date"} • {meetup.location || "Location"} • {meetup.time || "Time"}
                      </MDTypography>
                    </MDBox>
                    <MDBox display="flex">
                      {(meetup.attendees && Array.isArray(meetup.attendees) && meetup.attendees.length > 0
                        ? meetup.attendees
                        : [meetupDefault1, meetupDefault2, meetupDefault3]
                      ).map((attendee, idx) => (
                        <Avatar
                          key={idx}
                          src={attendee.photoUrl || attendee || [meetupDefault1, meetupDefault2, meetupDefault3][idx % 3]}
                          sx={{
                            width: 32,
                            height: 32,
                            border: "2px solid white",
                            ml: idx === 0 ? 0 : -1
                          }}
                        />
                      ))}
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </MDBox>
      <CreateEventModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default MeetupListUI;
