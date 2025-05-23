export const trackEvent = (action, category, label, value = null) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  };
  