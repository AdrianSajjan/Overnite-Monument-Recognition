import { theme } from "config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Monitor from "pages/Monitor";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/monitor" element={<Monitor />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}
