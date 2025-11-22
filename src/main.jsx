import { ChakraProvider } from "@chakra-ui/react";
import "@smastrom/react-rating/style.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "swiper/swiper-bundle.css";
import theme from "./../theme";
import App from "./App.jsx";
import Lenis from "lenis";
import "./index.css";
// Override local storage color mode setting to light
if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
  localStorage.setItem("chakra-ui-color-mode", "light");
}

function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          {" "}
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Root />
);
