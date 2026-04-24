import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    let lastY = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const goingDown = window.scrollY >= lastY;
          if (entry.isIntersecting) {
            entry.target.classList.remove("motion-out-down", "motion-out-up");
            entry.target.classList.add("motion-in");
          } else {
            entry.target.classList.remove("motion-in");
            if (goingDown) {
              entry.target.classList.add("motion-out-up");
              entry.target.classList.remove("motion-out-down");
            } else {
              entry.target.classList.add("motion-out-down");
              entry.target.classList.remove("motion-out-up");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const onScroll = () => {
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.querySelectorAll(".motion").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
