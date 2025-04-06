import Titlebar from "./components/titlebar/titlebar";
import Sidebar from "./components/sidebar/sidebar";
import Bottombar from "./components/bottombar/bottombar";
import NavMenu from "./components/nav-menu/nav-menu";
import Breadcrumb from "./components/breadcrumb/breadcrumb";

function App() {
  return (
    <div className="app-container app-layout">
      <Titlebar />
      <Sidebar />
      <NavMenu />
      <Breadcrumb />
      <Bottombar />
    </div>
  );
}
export default App;