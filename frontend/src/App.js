import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import EventRootLayout from "./pages/EventRootLayout";
import { loader as fetchEvents } from "./pages/Events";
import {
  loader as fetchEvent,
  action as deleteEvent,
} from "./pages/EventDetail";
import Error from "./pages/Error";
import Newsletter, { action as newsletterSubmission } from "./pages/Newsletter";
import { action as submitEventForm } from "./components/EventForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "events",
          element: <EventRootLayout />,
          children: [
            { index: true, element: <Events />, loader: fetchEvents },
            {
              path: ":id",
              id: "event-loader",
              loader: fetchEvent,
              children: [
                { index: true, element: <EventDetail />, action: deleteEvent },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: submitEventForm,
                },
              ],
            },
            { path: "new", element: <NewEvent />, action: submitEventForm },
          ],
        },
        {
          path: "newsletter",
          element: <Newsletter />,
          action: newsletterSubmission,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
