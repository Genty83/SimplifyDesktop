import Button from "../widgets/button";
import "./titlebar.css";

const titlebar = () => {
  return (
    <div className="titlebar">
      <div>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          File
        </Button>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          Edit
        </Button>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          View
        </Button>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          Window
        </Button>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          Help
        </Button>
        <Button
          className="titlebar-btn"
          onClick={() => alert("Button clicked!")}
        >
          Settings
        </Button>
      </div>
      <div></div>
      <div>
        <Button
          className="titlebar-btn"
          icon="fas fa-minus"
          onClick={() => alert("Button clicked!")}
        ></Button>
        <Button
          className="titlebar-btn"
          icon="far fa-square"
          onClick={() => alert("Button clicked!")}
        >
        </Button>
        <Button
          className="titlebar-btn"
          icon="fas fa-xmark"
          onClick={() => alert("Button clicked!")}
        >
        </Button>
      </div>
    </div>
  );
};
export default titlebar;
