/* eslint-disable prettier/prettier */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

function LocationSearch({ onPlaceSelect }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      const location = {
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onPlaceSelect(location);
    });
  }, [onPlaceSelect]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for a location"
      inputRef={inputRef}
      margin="normal"
    />
  );
}

LocationSearch.propTypes = {
  onPlaceSelect: PropTypes.func.isRequired,
};

export default LocationSearch;