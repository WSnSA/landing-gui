// @ts-ignore
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";

/* Auth */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

/* Examples */
import ExamplesIndexPage from "./pages/examples/ExamplesIndexPage";
import FreeTemplateExample from "./pages/examples/FreeTemplateExample";
import BusinessTemplateExample from "./pages/examples/BusinessTemplateExample";
import DoneForYouExample from "./pages/examples/DoneForYouExample";

/* Legal/Info */
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";

/* Main */
import OnboardingPage from "./pages/main/OnboardingPage";

/* App */
import AppLayout from "./pages/app/AppLayout";
import DashboardPage from "./pages/app/DashboardPage";
import LandingBuilderPage from "./pages/app/LandingBuilderPage";
import BuilderPage from "./pages/app/BuilderPage";
import PreviewPage from "./pages/app/PreviewPage";
import TemplatesPage from "./pages/app/TemplatesPage";
import BillingPage from "./pages/app/BillingPage";
import AnalyticsPage from "./pages/app/AnalyticsPage";
import SettingsPage from "./pages/app/SettingsPage";
import AdminPaymentsPage from "./pages/app/AdminPaymentsPage";

import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "../auth/RequireAuth";

// @ts-ignore
export const router = createBrowserRouter([
  /* ---------- PUBLIC ---------- */
  { path: "/", element: <HomePage /> },
  { path: "/examples", element: <ExamplesIndexPage /> },
  { path: "/examples/free", element: <FreeTemplateExample /> },
  { path: "/examples/business", element: <BusinessTemplateExample /> },
  { path: "/examples/done-for-you", element: <DoneForYouExample /> },

  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/contact", element: <ContactPage /> },

  /* ---------- AUTH ---------- */
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },

  /* ---------- ONBOARDING ---------- */
  { path: "/onboarding", element: <RequireAuth children={undefined}><OnboardingPage /></RequireAuth> },

  /* ---------- APP (PROTECTED) ---------- */
  {
    path: "/app/:projectId",
    element: <RequireAuth children={undefined}><AppLayout /></RequireAuth>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "landing", element: <LandingBuilderPage /> },
      { path: "builder", element: <BuilderPage /> },
      { path: "preview", element: <PreviewPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "admin/payments", element: <AdminPaymentsPage /> },
    ],
  },

  /* convenience */
  { path: "/app", element: <Navigate to="/onboarding" replace /> },

  { path: "*", element: <NotFoundPage /> },
]);
