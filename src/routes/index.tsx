import { Routes, Route, Navigate } from "react-router-dom";
import { UniversityList } from "../pages/universities/UniversityList";
import { UniversityDetails } from "../pages/universities/UniversityDetails";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/universities" replace />} />
    <Route path="/universities" element={<UniversityList />} />
    <Route path="/universities/:id" element={<UniversityDetails />} />
  </Routes>
);

export default AppRoutes;

