import { useEffect, useRef } from "react";

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
        lng: place.geometry.location.lng()
      };
      onPlaceSelect(location);
    });
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for a location"
      className="w-full p-2 border rounded"
    />
  );
}

export default LocationSearch;
