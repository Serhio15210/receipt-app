import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Layout from "@/components/layout";

export const Root = () => {
  return (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  );
};

export const Route = createRootRoute({
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>;
  },

  component: Root,
});
