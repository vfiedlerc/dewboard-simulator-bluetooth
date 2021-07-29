import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Download } from "./pages/Download";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import "./styles/global.scss"

function App() {
  return (
    <>
   <Dashboard/>
    </>
  );
}

export default App;
