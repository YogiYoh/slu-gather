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
import { firestore, auth } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import CreateEventModal from "../../components/CreateEventModal";

import PropTypes from "prop-types";

function MeetupListUI({ search }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  MeetupListUI.propTypes = {
    search: PropTypes.string,
  };

  async function fetchMeetups() {
    setLoading(true);
    try {
      const colRef = collection(firestore, "meetups");
      const snapshot = await getDocs(colRef);

      // For any events missing bannerImageIdx, assign one and patch Firestore!
      const listWithBanner = await Promise.all(
        snapshot.docs.map(async docSnap => {
          const data = docSnap.data();
          if (!("bannerImageIdx" in data)) {
            const newBannerIdx = Math.floor(Math.random() * 3); // 0, 1, or 2
            try {
              await updateDoc(doc(firestore, "meetups", docSnap.id), { bannerImageIdx: newBannerIdx });
            } catch (e) {
              console.error(`Failed to set bannerImageIdx for ${docSnap.id}`, e);
            }
            return { id: docSnap.id, ...data, bannerImageIdx: newBannerIdx };
          }
          return { id: docSnap.id, ...data };
        })
      );
      setMeetups(listWithBanner);
      setError("");
    } catch (err) {
      setError(err.message || String(err));
      setMeetups([]);
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

            {meetups
              .filter(meetup =>
                !search ||
                (meetup.title && meetup.title.toLowerCase().includes(search.toLowerCase()))
              )
              .map(meetup => {
                const isAttending = Array.isArray(meetup.attendees) &&
                  meetup.attendees.some(a => a.email === currentUser?.email);

                return (
                  <Grid item xs={12} md={6} lg={4} key={meetup.id}>
                    <Card>
                      <MDBox
                        component="img"
                        src={[meetupDefault1, meetupDefault2, meetupDefault3][meetup.bannerImageIdx]}
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
                        <MDBox display="flex" alignItems="center">
                          {Array.isArray(meetup.attendees) && meetup.attendees.length > 0
                            ? meetup.attendees.slice(0, 3).map((attendee, idx) => (
                                <Avatar
                                  key={idx}
                                  src={`https://i.pravatar.cc/40?img=${attendee.pravatarId || ((idx + 1) % 70)}`}
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    border: "2px solid white",
                                    ml: idx === 0 ? 0 : -1
                                  }}
                                />
                              ))
                            : null}
                          <MDTypography variant="caption" fontWeight="bold" ml={2}>
                            {Array.isArray(meetup.attendees) ? meetup.attendees.length : 0} attending
                          </MDTypography>
                        </MDBox>
                      </MDBox>

                      {currentUser && (
                        <MDBox display="flex" justifyContent="center" width="100%" mt={1} mb={2}>
                          <MDButton
                            variant={isAttending ? "contained" : "gradient"}
                            color="info"
                            size="small"
                            sx={{
                              px: 2,
                              py: 0.5,
                              fontSize: "0.75rem",
                              minWidth: "100px",
                              backgroundColor: isAttending ? "#b0c4de" : undefined,
                              "&:hover": {
                                backgroundColor: isAttending ? "#a1b5cc" : undefined
                              }
                            }}
                            
                            onClick={async () => {
                              try {
                                const docRef = doc(firestore, "meetups", meetup.id);

                                if (isAttending) {
                                  const updated = meetup.attendees.filter(
                                    a => a.email !== currentUser.email
                                  );
                                  await updateDoc(docRef, { attendees: updated });
                                  setMeetups(prev =>
                                    prev.map(m =>
                                      m.id === meetup.id ? { ...m, attendees: updated } : m
                                    )
                                  );
                                } else {
                                  const newAttendee = {
                                    email: currentUser.email,
                                    pravatarId: Math.floor(Math.random() * 70) + 1
                                  };
                                  await updateDoc(docRef, {
                                    attendees: Array.isArray(meetup.attendees)
                                      ? [...meetup.attendees, newAttendee]
                                      : [newAttendee]
                                  });
                                  setMeetups(prev =>
                                    prev.map(m =>
                                      m.id === meetup.id
                                        ? {
                                            ...m,
                                            attendees: Array.isArray(m.attendees)
                                              ? [...m.attendees, newAttendee]
                                              : [newAttendee]
                                          }
                                        : m
                                    )
                                  );
                                }
                              } catch (err) {
                                alert("Failed to update attendance.");
                                console.error(err);
                              }
                            }}
                          >
                            {isAttending ? "Attending" : "Attend"}
                          </MDButton>
                        </MDBox>
                      )}
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </MDBox>
      </MDBox>
      <CreateEventModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default MeetupListUI;
