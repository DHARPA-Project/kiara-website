# Kiara website

For now, this repo is collecting and structuring the documentation required for [kiara](https://github.com/DHARPA-Project/kiara).

[View existing published documentation here](https://dharpa.org/kiara.documentation/latest/)

See [`src/content/docs/index.md`](./index) for a proposed vague structure and entrypoint.

Edit the content in Markdown files in `/src/content/docs` manually, or by going to `/keystatic` on the [live site](kiara-website.pages.dev/keystatic) and using the CMS.

All files need to have a `title` key in the markdown frontmatter. This means the very start of the file needs to look like this:

```md
---
title: Your title here
---
```

The CMS will do this automatically, if you create a file by hand you'll need to add it. If you forget, the build will fail.

## Disclaimer

All of the information is in draft status, and may well be incomplete, misleading or just wrong. Don't rely on anything written here yet.
