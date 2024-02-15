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
          label: "Mini-app users",
          collapsed: true,
          autogenerate: {
            directory: "mini-app-users",
          },
        },
        {
          label: "Module users",
          autogenerate: {
            directory: "module-users",
          },
        },
        {
          label: "Module writers",
          collapsed: true,
          autogenerate: {
            directory: "module-writers",
          },
        },
        {
          label: "Developing kiara itself",
          collapsed: true,
          autogenerate: {
            directory: "core-devs",
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
    markdoc({ allowHTML: true }),
    keystatic(),
  ],
  output: "hybrid",
  adapter: cloudflare(),
});
