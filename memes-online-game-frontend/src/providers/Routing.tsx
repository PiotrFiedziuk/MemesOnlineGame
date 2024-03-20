import {
  createRootRoute,
  createRoute,
  createRouter,
  NotFoundRoute,
  Outlet,
} from "@tanstack/react-router";
import App from "../App.tsx";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const notExistingRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found",
});

const routeTree = rootRoute.addChildren([notExistingRoute, indexRoute]);

export const router = createRouter({
  routeTree,
});
