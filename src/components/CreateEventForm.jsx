import LocationSearch from "./LocationSearch";
import { useState } from "react";

function CreateEventForm() {
  const [location, setLocation] = useState(null);

  const handlePlaceSelect = (loc) => {
    setLocation(loc);
    console.log("📍 Location selected:", loc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Include location when adding event to Firebase
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ... />
      <textarea ... />
      
      <LocationSearch onPlaceSelect={handlePlaceSelect} />
      <button type="submit">Post Event</button>
    </form>
  );
}
