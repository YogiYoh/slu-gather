import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController, setLayout } from "context";
import Navbar from "./Navbar";
import MeetupListUI from "./MeetupListUI";

function BuilderPage() {
  const [controller, dispatch] = useMaterialUIController();

  useEffect(() => {
    setLayout(dispatch, "vr");
  }, []);

  return (
    <MDBox p={3}>
      <Navbar />
      <MeetupListUI />
    </MDBox>
  );
}

export default BuilderPage;
