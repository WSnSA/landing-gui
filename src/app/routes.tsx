import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";

/* Auth */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

/* Examples */
import FreeTemplateExample from "./pages/examples/FreeTemplateExample";
import BusinessTemplateExample from "./pages/examples/BusinessTemplateExample";
import DoneForYouExample from "./pages/examples/DoneForYouExample";

/* Main */
import OnboardingPage from "./pages/main/OnboardingPage";

/* App */
import AppLayout from "./pages/app/AppLayout";
import DashboardPage from "./pages/app/DashboardPage";
import LandingBuilderPage from "./pages/app/LandingBuilderPage";
import BuilderPage from "./pages/app/BuilderPage";
import PreviewPage from "./pages/app/PreviewPage";

export const router = createBrowserRouter([
  /* ---------- PUBLIC ---------- */
  {
    path: "/",
    element: <HomePage />,
  },

  /* ---------- AUTH ---------- */
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },

  /* ---------- ONBOARDING ---------- */
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },

  /* ---------- EXAMPLES ---------- */
  {
    path: "/examples/free",
    element: <FreeTemplateExample />,
  },
  {
    path: "/examples/business",
    element: <BusinessTemplateExample />,
  },
  {
    path: "/examples/done-for-you",
    element: <DoneForYouExample />,
  },

  /* ---------- APP (PROTECTED) ---------- */
  {
    path: "/app/:projectId",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "landing",
        element: <LandingBuilderPage />,
      },
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
