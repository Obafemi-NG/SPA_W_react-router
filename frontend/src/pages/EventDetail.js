import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetail = () => {
  const { event, events } = useRouteLoaderData("event-loader");
  return (
    <React.Fragment>
      <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
        <Await resolve={event}>
          {(loadedEventDetail) => (
            <div style={{ textAlign: "center" }}>
              {" "}
              <EventItem event={loadedEventDetail} />{" "}
            </div>
          )}
        </Await>
      </Suspense>
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
    </React.Fragment>
  );
};

export default EventDetail;

const loadEventDetail = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw json(
      { message: "unable to fetch data for the selected event" },
      { status: 500 }
    );
  } else {
    const loadedData = await response.json();
    return loadedData.event;
  }
};

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

export const loader = async ({ request, params }) => {
  const id = params.id;
  return defer({
    event: await loadEventDetail(id),
    events: loadEvents(),
  });
};

export const action = async ({ request, params }) => {
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "unable to delete selected event" }, { status: 500 });
  } else {
    return redirect("/events");
  }
};
