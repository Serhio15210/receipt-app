import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "@/routeTree.gen.ts";
import { queryClient } from "@/api/queryClient.ts";

const router = createRouter({ routeTree });
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
    </QueryClientProvider>
  );
}

export default App;
