import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Error = () => {
  const error = useRouteError();
  let message = "Something went wrong";
  let title = "An error occured";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    message = "Could not find the resource or page!";
  }
  return (
    <React.Fragment>
      <MainNavigation />
      <PageContent title={title}>
        <p> {message} </p>
      </PageContent>
    </React.Fragment>
  );
};

export default Error;
