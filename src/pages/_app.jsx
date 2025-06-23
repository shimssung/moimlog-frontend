import React from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../utils/ThemeContext";
import "../index.css";

// eslint-disable-next-line no-unused-vars
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
