import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "kiara",
      social: {
        github: "https://github.com/DHARPA-project/kiara-website",
      },
      sidebar: [
        {
          label: "Concepts",
          autogenerate: {
            directory: "concepts",
          },
        },
        {
          label: "Researcher",
          autogenerate: {
            directory: "users",
          },
        },
        {
          label: "Developer",
          collapsed: true,
          autogenerate: {
            directory: "developer",
          },
        },
        {
          label: "Internal",
          collapsed: true,
          autogenerate: {
            directory: "internal",
          },
        },
      ],
    }),
    react(),
    markdoc(),
    keystatic(),
  ],
  output: "hybrid",
  adapter: cloudflare(),
});
