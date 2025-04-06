import Button from "../button";
import "./titlebar.css";

const titlebar = () => {
  return (
    <div className="titlebar">
      <div>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          File
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          Edit
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          View
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          Window
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          Help
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          Settings
        </Button>
      </div>
      <div>
        
      </div>
      <div>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          <i class="fas fa-minus"></i>
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          <i class="far fa-square"></i>
        </Button>
        <Button className="titlebar-btn" onClick={() => alert("Button clicked!")}>
          <i class="fas fa-xmark"></i>
        </Button>
      </div>
    </div>
  );
};
export default titlebar;