import { createBrowserRouter } from "react-router";
import HomePage from "@/app/pages/HomePage";
import FreeTemplateExample from "@/app/pages/examples/FreeTemplateExample";
import BusinessTemplateExample from "@/app/pages/examples/BusinessTemplateExample";
import DoneForYouExample from "@/app/pages/examples/DoneForYouExample";
import LoginPage from "@/app/pages/auth/LoginPage";
import RegisterPage from "@/app/pages/auth/RegisterPage";

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
]);