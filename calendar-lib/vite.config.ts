import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/Calendar/index.ts",
      name: "GPCalendar",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.esm.js" : "index.cjs")
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        assetFileNames: "gp-calendar.css"
      }
    }
  }
});