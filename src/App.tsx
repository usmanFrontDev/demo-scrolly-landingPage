import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useEffect } from "react";


const queryClient = new QueryClient();
const App = () => {



  return (
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  </ThemeProvider>
  );
};

export default App;
