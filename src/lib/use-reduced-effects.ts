"use client";

import * as React from "react";

/** Skip GPU-heavy effects on small screens (parallax, mouse tracking, scroll progress). */
export function useMobileLite() {
  const [lite, setLite] = React.useState(false);

  React.useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setLite(mobileQuery.matches);
    update();
    mobileQuery.addEventListener("change", update);
    return () => mobileQuery.removeEventListener("change", update);
  }, []);

  return lite;
}
