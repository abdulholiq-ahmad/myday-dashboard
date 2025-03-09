import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import Courses from "./pages/Courses";
import Personnel from "./pages/Personnel";
import Finance from "./pages/Finance";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoutes";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Himoyalangan routelar */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="clients" element={<Clients />} />
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Courses />} />
          <Route path="personnel" element={<Personnel />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Faqat admin uchun routelar */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="admin/*" element={<Layout />}>
          {/* Admin sahifalari */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
