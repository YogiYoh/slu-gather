// CreateEventForm.js
import { useState } from "react";
import LocationSearch from "./LocationSearch";

console.log("🧩 CreateEventForm.js module loaded");

function CreateEventForm() {
  console.log("🔄 Rendering CreateEventForm");

  // … rest of your state/hooks

  return (
    <form onSubmit={handleSubmit}>
      { /* … your inputs */ }
      <LocationSearch onPlaceSelect={place => setLocation(place)} />
      <button type="submit">Post Event</button>
    </form>
  );
}

export default CreateEventForm;
