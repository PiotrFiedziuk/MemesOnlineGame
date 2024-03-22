import {
  createRootRoute,
  createRoute,
  createRouter,
  NotFoundRoute,
  Outlet,
} from "@tanstack/react-router";
import App from "../App.tsx";
import { LoginPage } from "../pages/LoginPage.tsx";
import { RoomPage } from "../pages/RoomPage.tsx";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const loginRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/login",
  component: LoginPage,
});

const roomRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/room",
  component: RoomPage,
});

const notExistingRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found",
});

const routeTree = rootRoute.addChildren([
  notExistingRoute,
  indexRoute,
  loginRoute,
  roomRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
