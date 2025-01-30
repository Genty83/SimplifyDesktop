/**
 * Adds an event listener to the document and delegates events to a specified selector.
 * @param {string} eventType - The type of event to listen for.
 * @param {string} selector - The CSS selector to match the event target against.
 * @param {Function} callback - The function to call when the event is triggered.
 * @param {Object} options - Additional options to pass to the event listener.
 */
export const eventHandler = (eventType, selector, callback, options) => {
  // Parameter validation
  if (
    typeof eventType !== "string" ||
    typeof selector !== "string" ||
    typeof callback !== "function"
  ) {
    throw new Error("Invalid parameters passed to eventHandler");
  }

  // Event listener with delegation
  document.addEventListener(
    eventType,
    (event) => {
      const targetElement = event.target.closest(selector);
      if (targetElement) {
        callback(event);
      }
    },
    options
  );
};

/**
 * Save local settings for an element.
 * @param {string} elementId - The ID of the element.
 * @param {string} property - The CSS property to save.
 * @param {string} value - The value of the CSS property.
 */
export const saveLocalSettings = (elementId, property, value) => {
  // Parameter validation
  if (
    typeof elementId !== "string" ||
    typeof property !== "string" ||
    typeof value !== "string"
  ) {
    throw new Error("Invalid parameters passed to saveLocalSettings");
  }

  // Save to local storage
  const settings = JSON.parse(localStorage.getItem('localSettings')) || {};
  if (!settings[elementId]) {
    settings[elementId] = {};
  }
  settings[elementId][property] = value;
  localStorage.setItem('localSettings', JSON.stringify(settings));
};

/**
 * Load local settings for an element.
 * @param {string} elementId - The ID of the element.
 * @param {string} property - The CSS property to load.
 * @returns {string} The value of the CSS property.
 */
export const loadLocalSettings = (elementId, property) => {
  // Parameter validation
  if (typeof elementId !== "string" || typeof property !== "string") {
    throw new Error("Invalid parameters passed to loadLocalSettings");
  }

  // Load from local storage
  const settings = JSON.parse(localStorage.getItem('localSettings')) || {};
  if (settings[elementId] && settings[elementId][property]) {
    return settings[elementId][property];
  }
  return null;
};

