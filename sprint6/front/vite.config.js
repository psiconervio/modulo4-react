import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: "stream-browserify",
    },
  },

  define: {
    "process.env": {},
  },

  base: "/",
  plugins: [react(), tailwindcss()],
});
