import React from "react";
import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

const EventRootLayout = () => {
  return (
    <React.Fragment>
      <EventsNavigation />
      <Outlet />
    </React.Fragment>
  );
};

export default EventRootLayout;
