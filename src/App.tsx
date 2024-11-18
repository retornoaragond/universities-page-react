import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { SearchProvider } from "./context/SearchContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SearchProvider>
  </QueryClientProvider>
);

export default App;