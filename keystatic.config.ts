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
    developer: collection({
      label: "Developer docs",
      slugField: "title",
      path: "src/content/docs/developer/*",
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
    users: collection({
      label: "Docs for researchers",
      slugField: "title",
      path: "src/content/docs/users/*",
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
