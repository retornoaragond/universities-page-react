import { Routes, Route, Navigate } from "react-router-dom";
import { UniversityList } from "../pages/universities/UniversityList";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/universities" replace />} />
    <Route path="/universities" element={<UniversityList />} />
  </Routes>
);

export default AppRoutes;

