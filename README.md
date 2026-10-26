# Tankbot Documentation

This repository contains the Tankbot VitePress documentation site. The
documentation source files are Markdown files under `content/<version>/docs/`.
The `docs/docs/` directory is generated during development and builds.

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run dev:latest
```

AI module version:

```bash
npm run dev:tankbotaI
```

Build and stage all production versions:

```bash
npm run build:all
```

The staged production files are generated under `projects/Tankbot/en/<version>/`.

## GitHub Pages deployment

The build artifacts under `projects/` are committed to the repository. Open
**Settings > Pages**, select **Deploy from a branch**, and choose **main** and
**/(root)**. Do not bind a custom domain.

The GitHub Pages direct URL is:

```text
https://GITHUB-USERNAME.github.io/REPOSITORY-NAME/projects/Tankbot/en/latest/
```

The public-facing URL (via the baota Nginx reverse proxy) is:

```text
https://wiki.hiwonder.com/projects/Tankbot/en/latest/
https://wiki.hiwonder.com/projects/Tankbot/en/tankbotaI/
```

## Version selection

| Version | Display name | Source | Production path |
| --- | --- | --- | --- |
| `latest` | Tankbot | `content/latest/` | `/projects/Tankbot/en/latest/` |
| `tankbotaI` | Tankbot—AI Module | `content/tankbotaI/` | `/projects/Tankbot/en/tankbotaI/` |

Keep the exact spelling and case of `tankbotaI` (the final character is an
uppercase `I`). Both versions appear in the chooser, navigation menu, and
repository version cards. The standard version opens `docs/1. Getting Ready.html`;
the AI module version opens `docs/1. Getting Started.html`.

Each version URL opens its own tutorial directly. Use the **Version** menu
in the navigation bar to switch versions, or open the repository root page
to choose a version.

Edit `docs/.vitepress/site.config.mjs` to change the available versions, labels,
descriptions, and entry paths. The popup and navigation share this definition.
`selectable: false` hides a version from both controls without removing its
build command or existing URL. Rebuild with `npm run build:all` after editing.

Preview all staged versions together using `python -m http.server 4174` from
the repository root, then open
`http://localhost:4174/projects/Tankbot/en/latest/docs/1.%20Getting%20Ready.html`.

See [MULTI_VERSION_DEPLOY.md](MULTI_VERSION_DEPLOY.md) for deployment details.
