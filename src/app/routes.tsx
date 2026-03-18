import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";

/* Auth */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SetupPage from "./pages/auth/SetupPage";

/* Examples */
import ExamplesIndexPage from "./pages/examples/ExamplesIndexPage";
import FreeTemplateExample from "./pages/examples/FreeTemplateExample";
import BusinessTemplateExample from "./pages/examples/BusinessTemplateExample";
import DoneForYouExample from "./pages/examples/DoneForYouExample";
import CafeTemplateExample from "./pages/examples/CafeTemplateExample";

/* Legal/Info */
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";

/* Main */
import MarketplacePage from "./pages/main/MarketplacePage";
import OnboardingPage from "./pages/main/OnboardingPage";

/* App */
import AppLayout from "./pages/app/AppLayout";
import DashboardPage from "./pages/app/DashboardPage";
import PreviewPage from "./pages/app/PreviewPage";
import TemplatesPage from "./pages/app/TemplatesPage";
import ContentEditorPage from "./pages/app/ContentEditorPage";
import BillingPage from "./pages/app/BillingPage";
import AnalyticsPage from "./pages/app/AnalyticsPage";
import SettingsPage from "./pages/app/SettingsPage";
import AdminPaymentsPage from "./pages/app/AdminPaymentsPage";
import AdminTemplatesPage from "./pages/app/AdminTemplatesPage";
import AdminUsersPage from "./pages/app/AdminUsersPage";

/* Standalone Admin */
import AdminLayout from "./pages/admin/AdminLayout";

/* Public render — auth шаардахгүй */
import PublicRenderPage from "./pages/public/PublicRenderPage";

import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./auth/RequireAuth";

export const router = createBrowserRouter([
  /* ---------- PUBLIC ---------- */
  { path: "/", element: <HomePage /> },
  { path: "/examples", element: <ExamplesIndexPage /> },
  { path: "/examples/free", element: <FreeTemplateExample /> },
  { path: "/examples/business", element: <BusinessTemplateExample /> },
  { path: "/examples/done-for-you", element: <DoneForYouExample /> },
  { path: "/examples/cafe", element: <CafeTemplateExample /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/contact", element: <ContactPage /> },

  /* Нийтлэгдсэн landing — auth шаардахгүй */
  { path: "/p/:slug", element: <PublicRenderPage /> },

  /* ---------- AUTH ---------- */
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/setup", element: <SetupPage /> },

  /* ---------- PROTECTED MAIN ---------- */
  {
    path: "/marketplace",
    element: <RequireAuth children={undefined}><MarketplacePage /></RequireAuth>,
  },
  {
    path: "/my-sites",
    element: <RequireAuth children={undefined}><OnboardingPage /></RequireAuth>,
  },
  /* legacy redirect */
  {
    path: "/onboarding",
    element: <Navigate to="/marketplace" replace />,
  },

  /* ---------- APP (PROTECTED) ---------- */
  {
    path: "/app/:projectId",
    element: <RequireAuth children={undefined}><AppLayout /></RequireAuth>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "editor", element: <ContentEditorPage /> },
      { path: "preview", element: <PreviewPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "admin/users", element: <AdminUsersPage /> },
      { path: "admin/payments", element: <AdminPaymentsPage /> },
      { path: "admin/templates", element: <AdminTemplatesPage /> },
    ],
  },

  /* ---------- STANDALONE ADMIN ---------- */
  {
    path: "/admin",
    element: <RequireAuth children={undefined}><AdminLayout /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/admin/users" replace /> },
      { path: "users", element: <AdminUsersPage /> },
      { path: "payments", element: <AdminPaymentsPage /> },
      { path: "templates", element: <AdminTemplatesPage /> },
    ],
  },

  { path: "/app", element: <Navigate to="/marketplace" replace /> },
  { path: "*", element: <NotFoundPage /> },
]);
