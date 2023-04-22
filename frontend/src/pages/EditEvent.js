import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEvent = () => {
  const data = useRouteLoaderData("event-loader");
  return (
    <React.Fragment>
      <EventForm event={data.event} method="patch" />
    </React.Fragment>
  );
};

export default EditEvent;
