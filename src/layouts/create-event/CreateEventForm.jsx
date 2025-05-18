import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import LocationSearch from "./LocationSearch";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState(null);

  const handlePlaceSelect = (place) => {
    setLocation(place);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please select a location");
      return;
    }

    await addDoc(collection(db, "events"), {
      title,
      description: desc,
      timestamp: Timestamp.fromDate(new Date()),
      location,
    });

    alert("✅ Event posted!");
    setTitle("");
    setDesc("");
    setLocation(null);
  };

  return (
    <MDBox component="form" onSubmit={handleSubmit} p={3}>
      <MDInput
        label="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <MDInput
        label="Description"
        multiline
        rows={4}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <LocationSearch onPlaceSelect={handlePlaceSelect} />
      <MDButton type="submit" color="info" sx={{ mt: 2 }}>
        Post Event
      </MDButton>
    </MDBox>
  );
}

export default CreateEventForm;
