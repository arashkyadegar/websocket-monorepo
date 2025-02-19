import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/auth/AuthProvider";
import LoginComponent from "./components/login/loginComponent";
import DashboardComponent from "./components/dashboard/dashboardComponent";
import Layout from "./components/layout/layout";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route path="/" element={<LoginComponent />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<DashboardComponent />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
