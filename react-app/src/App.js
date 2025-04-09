import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Titlebar from "./components/titlebar/titlebar";
import Sidebar from "./components/sidebar/sidebar";
import Bottombar from "./components/bottombar/bottombar";
import NavMenu from "./components/nav-menu/nav-menu";
import Breadcrumb from "./components/breadcrumb/breadcrumb";
import Home from "./pages/home"
import Settings from "./pages/settings";
import Info from "./pages/info";
import Help from "./pages/help";


function App() {
  return (
    <Router>
      <div className="app-container app-layout">
        <Titlebar />
        <Sidebar />
        <NavMenu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/info" element={<Info />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
        <Breadcrumb />
        <Bottombar />
      </div>
    </Router>
    );
}
export default App;