import React, { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

const Events = () => {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
      <Await resolve={events}>
        {(loadedEvents) => (
          <div style={{ textAlign: "center" }}>
            {" "}
            <EventsList events={loadedEvents} />{" "}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Events;

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json(
      { message: "unable to fetch events" },
      {
        status: 500,
      }
    );
  } else {
    const loadedData = await response.json();
    return loadedData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
