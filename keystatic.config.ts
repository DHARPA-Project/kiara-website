import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? {
        kind: "github",
        repo: {
          owner: "DHARPA-Project",
          name: "kiara-website",
        },
      }
    : { kind: "local" },

  collections: {
    concepts: collection({
      label: "Concepts",
      slugField: "title",
      path: "src/content/docs/concepts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    users: collection({
      label: "Module user docs",
      slugField: "title",
      path: "src/content/docs/module-users/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    developer: collection({
      label: "Module writer docs",
      slugField: "title",
      path: "src/content/docs/module-writers/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    miniapp: collection({
      label: "Mini-app user docs",
      slugField: "title",
      path: "src/content/docs/mini-app-users/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    core: collection({
      label: "Core developer docs",
      slugField: "title",
      path: "src/content/docs/core-devs/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    internal: collection({
      label: "Internal docs",
      slugField: "title",
      path: "src/content/docs/internal/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
