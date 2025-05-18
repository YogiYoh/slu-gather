/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { GlobalStyles, Modal, Box, Typography, TextField, Button } from "@mui/material";
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import LocationSearch from "./LocationSearch";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  zIndex: 1301,
};

const CreateEventModal = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!title || !date || !time || !location) {
      alert("Please fill out all required fields.");
      return;
    }

    const newEvent = {
      title,
      description,
      date,
      time,
      location,
      // Use a random banner index for meetup card banner (0, 1, or 2)
      bannerImageIdx: Math.floor(Math.random() * 3),
    };

    try {
      const docRef = await addDoc(collection(firestore, "meetups"), newEvent);
      const createdEvent = { id: docRef.id, ...newEvent };
      if (onCreate) onCreate(createdEvent);
      if (onCreate) onCreate(newEvent);
      onClose();
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
    } catch (error) {
      console.error("❌ Error adding event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <>
      <GlobalStyles styles={{ ".pac-container": { zIndex: 1302 } }} />
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Create New Event
          </Typography>

          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            type="time"
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ mt: 2, position: "relative" }}>
            <LocationSearch onPlaceSelect={(place) => setLocation(place.address)} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Create Event
          </Button>
        </Box>
      </Modal>
    </>
  );
};

CreateEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
};

CreateEventModal.defaultProps = {
  onCreate: undefined,
};

export default CreateEventModal;