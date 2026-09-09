// ============================================================
// Analytics — GTM dataLayer Helpers
// ============================================================
// Google Tag Manager uses window.dataLayer to receive events.
// We initialize it safely and provide typed push helpers.
// ============================================================

// Extend the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push an event to the GTM dataLayer.
 * Safe to call even if GTM is not loaded.
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Push the lead_form_submit event after successful form submission.
 */
export function trackLeadFormSubmit(): void {
  pushToDataLayer({
    event: "lead_form_submit",
  });
}
