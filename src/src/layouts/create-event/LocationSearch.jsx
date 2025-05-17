import { useRef, useEffect } from "react";
import MDInput from "components/MDInput";

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
  }, []);

  return (
    <MDInput
      inputRef={inputRef}
      label="Search Location"
      fullWidth
      sx={{ mb: 2 }}
    />
  );
}

export default LocationSearch;