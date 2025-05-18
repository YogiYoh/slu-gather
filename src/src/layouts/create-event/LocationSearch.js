// LocationSearch.js
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";

function LocationSearch({ onPlaceSelect }) {
  const inputRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    console.log("🧩 useEffect mounted");
    if (!window.google || !window.google.maps) {
      console.warn("⚠️ Google Maps not loaded yet");
      return;
    }

    if (!inputRef.current) {
      console.error("❌ No input ref attached");
      return;
    }

    autoRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"], // Optional: restrict to addresses
    });

    autoRef.current.addListener("place_changed", () => {
      const place = autoRef.current.getPlace();
      console.log("📍 Place selected via autocomplete:", place);
      if (!place.geometry) {
        alert("Selected place has no location data.");
        return;
      }

      onPlaceSelect({
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, []);

  const handleManualGeocode = async (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const query = inputRef.current.value;
    if (!query || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === "OK" && results[0]) {
        console.log("📦 Geocoder result:", results[0]);
        const loc = results[0].geometry.location;
        onPlaceSelect({
          name: results[0].formatted_address,
          address: results[0].formatted_address,
          lat: loc.lat(),
          lng: loc.lng(),
        });
      } else {
        console.warn("❌ Geocode failed:", status);
        alert("Could not find location. Try again or use the suggestions.");
      }
    });
  };

  return (
    <TextField
      inputRef={inputRef}
      onKeyDown={handleManualGeocode}
      label="Search Location"
      variant="outlined"
      fullWidth
      sx={{ mb: 2 }}
    />
  );
}

export default LocationSearch;
