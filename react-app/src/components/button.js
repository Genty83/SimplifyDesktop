import React from "react";
import PropTypes from "prop-types";

export const Button = ({ type = "button", id, className = "btn", onClick, disabled = false, children }) => {
  return (
    <button
      type={type}
      id={id}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;