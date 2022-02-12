import {
  BusinessSettings,
  Dashboard,
  DateAndTimeSettings,
  Login,
  Meets,
  NotFound,
  PhotoGallery,
  Support,
  Comments,
  Register,
  Subscription,
  TableSettings,
  PaymentPage,
  Failed,
  Plan,
  ComingSoon,
} from "./screens";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
    path: "/dashboard/table-settings",
    element: <TableSettings />,
  },
  {
    path: "/dashboard/support",
    element: <Support />,
  },
  {
    path: "/dashboard/comments",
    element: <Comments />,
  },
  {
    path: "/dashboard/subscription",
    element: <Subscription />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard/payment",
    element: <PaymentPage />,
  },
  {
    path: "/failed",
    element: <Failed />,
  },
  {
    path: "/plan",
    element: <Plan />,
  },
  {
    path:"/coming-soon",
    element:<ComingSoon/>
  }
];
