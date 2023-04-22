import React from "react";
import EventForm from "../components/EventForm";
import { redirect } from "react-router-dom";

const NewEvent = () => {
  return (
    <React.Fragment>
      <EventForm method="post" />
    </React.Fragment>
  );
};

export default NewEvent;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const enterValue = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enterValue),
  });
  if (response.status === 422) {
    return response;
  }
  return redirect("/events");
};
