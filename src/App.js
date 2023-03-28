import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import StudyForm from "./pages/studyform";
import Layout from "./pages/layout";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="studyform" element={<StudyForm />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
