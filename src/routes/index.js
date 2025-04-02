import { Navigate } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../Layout/LayoutDefault";
import Company from "../pages/Company";
import CompanyDetail from "../pages/CompanyDetail";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Dashboard from "../pages/Dashboard";
import LayoutAdmin from "../Layout/LayoutAdmin";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CreateJob from "../pages/JobManage/CreateJob";
import JobDetailAdmin from "../pages/JobManage/JobDetailAdmin";
import CVManage from "../pages/CVManage";
import CVDetail from "../pages/CVDetail";

export const routes = [
  {
    // Public
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "job/:id",
        element: <JobDetail />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "company/:id",
        element: <CompanyDetail />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      // End Public
    ],
  },

  //Private
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "info-company",
            element: <InfoCompany />,
          },
          {
            path: "job-manage",
            element: <JobManage />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "detail-job/:id",
            element: <JobDetailAdmin />,
          },
          {
            path: "cv-manage",
            element: <CVManage />,
          },
          {
            path: "detail-cv/:id",
            element: <CVDetail />,
          },
        ],
      },
    ],
  },
  // End Private
];
