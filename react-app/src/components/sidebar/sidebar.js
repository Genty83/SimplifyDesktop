import "./sidebar.css";
import Button from "../widgets/button";
import LinkButton from "../widgets/link-button";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <Button
          type="button"
          className="btn sidebar-btn"
          onClick={() => console.log("Button clicked!")}
          icon="fas fa-bars"
        ></Button>
        <hr class="content-divider" />
        <LinkButton
          href="/"
          id="home-link"
          className="btn sidebar-btn"
          icon="fas fa-home"
        ></LinkButton>
      </div>
      <div>
      <hr class="content-divider" />
        <LinkButton
          href="/info"
          id="home-link"
          className="btn sidebar-btn"
          icon="fas fa-info-circle"
        >
        </LinkButton>
        <LinkButton
          href="/help"
          id="home-link"
          className="btn sidebar-btn"
          icon="fas fa-question-circle"
        >
        </LinkButton>
        <LinkButton
          href="/settings"
          id="home-link"
          className="btn sidebar-btn"
          icon="fas fa-cog"
        >
        </LinkButton>
      </div>
    </div>
  );
};

export default Sidebar;
