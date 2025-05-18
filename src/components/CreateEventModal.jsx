import React from "react";
import PropTypes from "prop-types"; // ✅ Add this
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CreateEventForm from "layouts/create-event/CreateEventForm";

function CreateEventModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Create Meetup
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div style={{ padding: "0 24px 24px" }}>
        <CreateEventForm onSuccess={onClose} />
      </div>
    </Dialog>
  );
}

// ✅ Add this to resolve ESLint warnings
CreateEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateEventModal;
