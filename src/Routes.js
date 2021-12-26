import {
  BusinessSettings,
  Dashboard,
  DateAndTimeSettings,
  Login,
  Meets,
  NotFound,
  PhotoGallery,
  Support,
} from "./screens";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/meets",
    element: <Meets />,
  },
  {
    path: "/dashboard/business-settings",
    element: <BusinessSettings />,
  },
  {
    path: "/dashboard/date-time-settings",
    element: <DateAndTimeSettings />,
  },
  {
    path: "/dashboard/photo-gallery",
    element: <PhotoGallery />,
  },
  {
    path: "/dashboard/support",
    element: <Support />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
