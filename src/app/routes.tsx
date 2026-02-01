import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import FreeTemplateExample from "./pages/examples/FreeTemplateExample"
import BusinessTemplateExample from "./pages/examples/BusinessTemplateExample"
import DoneForYouExample from "./pages/examples/DoneForYouExample"
import OnboardingPage from "./pages/main/OnboardingPage";
import AppLayout from "./pages/app/AppLayout";
import DashboardPage from "./pages/app/DashboardPage";
import LandingBuilderPage from "./pages/app/LandingBuilderPage";
import BuilderPage from "./pages/app/BuilderPage";
import PreviewPage from "./pages/app/PreviewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/examples/free",
    Component: FreeTemplateExample,
  },
  {
    path: "/examples/business",
    Component: BusinessTemplateExample,
  },
  {
    path: "/examples/done-for-you",
    Component: DoneForYouExample,
  },
  {
    path: "/app/:projectId",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "landing", element: <LandingBuilderPage /> },
      {
        path: "builder",
        element: <BuilderPage />,
      },
      {
        path: "preview",
        element: <PreviewPage />,
      },
    ],
  },
]);