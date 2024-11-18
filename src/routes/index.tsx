import { Routes, Route, Navigate } from "react-router-dom";
import { UniversityList } from "../pages/universities/UniversityList";
import { UniversityDetails } from "../pages/universities/UniversityDetails";
import UniversityForm from "../pages/universities/UniversityForm";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/universities" replace />} />
    <Route path="/universities" element={<UniversityList />} />
    <Route path="/universities/:id" element={<UniversityDetails />} />
    <Route path="/universities/new" element={<UniversityForm />} />
  </Routes>
);

export default AppRoutes;

