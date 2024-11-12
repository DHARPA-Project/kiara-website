import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { readdirSync } from "fs";
import svelte from "@astrojs/svelte";
import semverSort from "semver-sort";

function getOperations() {
  const plugins = readdirSync("src/content/plugins");
  return plugins.map((plugin) => {
    const name = plugin;
    const versions = readdirSync(`src/content/plugins/${name}`);
    const versionNumbers = semverSort.desc(
      versions.map((v) => v.match(/v\d+\.\d+\.\d+/g)[0]),
    );
    return {
      label: name,
      items: [
        { label: "Overview", link: `/plugins/${name}` },
        ...versionNumbers.map((v) => ({
          label: v,
          collapsed: true,
          items: [
            {
              label: `Overview at ${v}`,
              link: `/plugins/${name}/${v}`,
            },
            {
              label: "Operations",
              link: `/plugins/${name}/${v}/operations`,
            },
            { label: "Modules", link: `/plugins/${name}/${v}/modules` },
            { label: "Data types", link: `/plugins/${name}/${v}/datatypes` },
            { label: "Model types", link: `/plugins/${name}/${v}/modeltypes` },
            {
              label: "Operation types",
              link: `/plugins/${name}/${v}/operationtypes`,
            },

            // TODO add data types and things here too!
          ],
        })),
      ],
    };
  });
}
// https://astro.build/config
export default defineConfig({
  // TODO update these to be dharpa's details
  site: "https://caro401.github.io",
  base: "/kiara-website",
  integrations: [
    starlight({
      title: "kiara",
      editLink: {
        baseUrl: "https://github.com/DHARPA-project/kiara-website/edit/main/",
      },
      customCss: ["./src/styles/custom.css"],
      components: {
        // override the default title component, to add in last modified time
        PageTitle: "./src/components/Title.astro",
      },
      expressiveCode: { themes: ["catppuccin-macchiato", "catppuccin-latte"] },
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
        {
          label: "Plugins",
          collapsed: true,
          items: [{ label: "Overview", link: "/plugins" }, ...getOperations()],
        },
      ],
    }),
    svelte(),
  ],
  output: "static",
});
