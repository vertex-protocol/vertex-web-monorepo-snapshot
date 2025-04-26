/**
 * Checks if the current window is inside an iframe.
 *
 * @returns {boolean} - Returns true if the current window is within an iframe, false otherwise.
 */
export function getIsIframe() {
  try {
    // Compare window.self (current window) with window.top (topmost window)
    return window.self !== window.top;
  } catch {
    // If accessing window.top throws an error (e.g., due to cross-origin restrictions), assume it's in an iframe
    return true;
  }
}
