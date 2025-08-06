import { useEffect, useRef } from "react";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";

const useLenisScroll = () => {
  
  const lenisRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
      AOS.refresh();
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef;
};

export default useLenisScroll;
