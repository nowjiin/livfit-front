import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@api", replacement: "/src/api" },
      { find: "@redux", replacement: "/src/app/redux" },
      { find: "@components", replacement: "/src/components" },
      { find: "@commons", replacement: "/src/components/commons" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@constants", replacement: "/src/constants" },
      { find: "@svgs", replacement: "/src/assets/svgs" },
      { find: "@images", replacement: "/src/assets/images" },
      { find: "@badges", replacement: "/src/assets/images/badge" },
    ],
  },
});
