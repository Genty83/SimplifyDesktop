import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * A customizable link button component for reuse across the application.
 *
 * This LinkButton component supports icons, various styles, and ensures
 * accessibility compliance with ARIA attributes. It enforces the use of
 * required props through PropTypes.
 */
class LinkButton extends Component {
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
      href,
      id,
      className = "btn", // Default className
      children,
      icon,
      target = "_self", // Default to opening in the same tab
      rel = "noopener noreferrer", // Default for security
    } = this.props;

    return (
      <a
        href={href}
        id={id}
        className={className}
        target={target}
        rel={rel}
      >
        {this.renderIcon(icon)}
        {children}
      </a>
    );
  }
}

// Define prop types for the LinkButton component
LinkButton.propTypes = {
  /**
   * The URL the link should navigate to. This is a required prop.
   */
  href: PropTypes.string.isRequired,

  /**
   * The unique identifier for the link element.
   */
  id: PropTypes.string,

  /**
   * Additional CSS classes to apply for styling purposes.
   * Defaults to "btn".
   */
  className: PropTypes.string,

  /**
   * The content to display within the link, typically text or other React nodes.
   * This is a required prop.
   */
  children: PropTypes.node.isRequired,

  /**
   * An optional icon class name to display an icon alongside the link content.
   */
  icon: PropTypes.string,

  /**
   * Specifies where to open the linked document (e.g., "_blank", "_self").
   * Defaults to "_self".
   */
  target: PropTypes.string,

  /**
   * Specifies the relationship between the current document and the linked document.
   * Defaults to "noopener noreferrer".
   */
  rel: PropTypes.string,
};

// Export the LinkButton component for external use
export default LinkButton;
