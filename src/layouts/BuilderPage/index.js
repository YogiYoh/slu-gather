/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import { useMaterialUIController, setLayout } from "context";
import Navbar from "./Navbar";
import MeetupListUI from "./MeetupListUI";
import forestBg from "assets/images/forest.png";

function BuilderPage() {
  const [controller, dispatch] = useMaterialUIController();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLayout(dispatch, "vr");
  }, []);

  return (
    <MDBox
      p={3}
      sx={{
        backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
        minHeight: "100vh",
      }}
    >
      <Navbar search={search} setSearch={setSearch} />
      <MeetupListUI search={search} />
    </MDBox>
  );
}

export default BuilderPage;
