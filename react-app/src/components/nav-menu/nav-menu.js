import "./nav-menu.css";
import { useState, useEffect } from "react";

const NavMenu = () => {
  const [width, setWidth] = useState(() => {
    // Load the saved width from local storage or use the default width
    return localStorage.getItem("menuWidth")
      ? parseInt(localStorage.getItem("menuWidth"), 10)
      : 300;
  });

  const handleMouseDown = (e) => {
    const startX = e.clientX;

    const handleMouseMove = (event) => {
      const newWidth = width + (event.clientX - startX);
      const validWidth = newWidth > 100 ? newWidth : 100; // Minimum width is 100px
      setWidth(validWidth);
    };

    const handleMouseUp = () => {
      localStorage.setItem("menuWidth", width); // Save the width to local storage
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Save the width when the state changes
    localStorage.setItem("menuWidth", width);
  }, [width]);

  return (
    <div className="nav-menu" style={{ width: `${width}px` }}>
      <div
        className="nav-menu-resizer"
        onMouseDown={handleMouseDown}
        style={{ cursor: "col-resize" }}
      ></div>
    </div>
  );
};

export default NavMenu;
