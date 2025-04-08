import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * A customizable button component for reuse across the application.
 * 
 * This Button component is versatile, supporting icons, various button types,
 * and styles. It ensures accessibility compliance with ARIA attributes 
 * and enforces the use of required props through PropTypes.
 */
class Button extends Component {
  /**
   * Renders an icon element if the `icon` prop is provided.
   * 
   * @param {string} icon - The icon class name to apply to the `<i>` element.
   * @returns {React.Element|null} The icon element or `null` if no icon is provided.
   */
  renderIcon(icon) {
    if (!icon) return null;
    return <i className={`icon ${icon}`} aria-hidden="true"></i>;
  }

  render() {
    const {
      type = "button", // Default to "button"
      id,
      className = "btn", // Default className
      onClick,
      disabled = false, // Default to enabled
      children,
      icon,
    } = this.props;

    return (
      <button
        type={type}
        id={id}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {this.renderIcon(icon)}
        {children}
      </button>
    );
  }
}

// Define prop types for the Button component
Button.propTypes = {
  /**
   * The button type, which can be "button", "submit", or "reset".
   * Defaults to "button".
   */
  type: PropTypes.oneOf(["button", "submit", "reset"]),

  /**
   * The unique identifier for the button element.
   */
  id: PropTypes.string,

  /**
   * Additional CSS classes to apply for styling purposes.
   * Defaults to "btn".
   */
  className: PropTypes.string,

  /**
   * Callback function to handle the button's click event.
   * This is a required prop.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Indicates whether the button should be disabled.
   * Defaults to `false`.
   */
  disabled: PropTypes.bool,

  /**
   * The content to display within the button, typically text or other React nodes.
   * This is a required prop.
   */
  children: PropTypes.node.isRequired,

  /**
   * An optional icon class name to display an icon alongside the button content.
   */
  icon: PropTypes.string,
};

// Export the Button component for external use
export default Button;