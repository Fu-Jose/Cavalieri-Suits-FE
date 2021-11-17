import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Routes() {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);
  return null;
}
