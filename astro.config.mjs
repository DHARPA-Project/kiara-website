import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: "kiara",
    social: {
      github: "https://github.com/DHARPA-project/kiara-website"
    },
    sidebar: [{
      label: "Concepts",
      autogenerate: {
        directory: "concepts"
      }
    }, {
      label: "Researcher",
      autogenerate: {
        directory: "users"
      }
    }, {
      label: "Developer",
      collapsed: true,
      autogenerate: {
        directory: "developer"
      }
    }, {
      label: "Internal",
      collapsed: true,
      autogenerate: {
        directory: "internal"
      }
    }, {
      label: "Plugins",
      collapsed: true,
      autogenerate: {
        directory: "plugins"
      }
    }]
  }), react(), markdoc({
    allowHTML: true
  }), keystatic(), svelte()],
  output: "hybrid",
  adapter: cloudflare()
});