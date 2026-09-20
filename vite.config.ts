import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import { kvDataAdapter } from "@vinext/cloudflare/cache/kv-data-adapter";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vinext({
      cache: {
        data: kvDataAdapter(),
      },
      images: {
        optimizer: imagesOptimizer(),
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
