import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AppRoutes from "./routes";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;