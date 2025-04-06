import Titlebar from "./components/titlebar/titlebar";
import Sidebar from "./components/sidebar/sidebar";
import Bottombar from "./components/bottombar";
import NavMenu from "./components/nav-menu";

function App() {
  return (
    <div className="app-container app-layout">
      <Titlebar />
      <Sidebar />
      <NavMenu />
      <Bottombar />
    </div>
  );
}
export default App;