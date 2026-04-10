# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZeroGen Lab website — a Hugo-based bilingual (Chinese/English) static site deployed on Netlify. The lab focuses on foundational LLM research including reasoning, knowledge representation, and cognitive alignment.

## Build Commands

```bash
npm run dev        # Start dev server with CSS watching (Hugo + UnoCSS concurrently)
npm run dev:css    # Watch UnoCSS changes only
npm run dev:hugo   # Hugo server with drafts
npm run build:css  # Build UnoCSS to static/css/uno.css
npm run build      # Full production build: CSS + Hugo minify
```

**Note**: Hugo version pinned at 0.90.0 in netlify.toml. UnoCSS output goes to `static/css/uno.css`.

## Architecture

- **Theme**: `themes/tella/` is a git submodule (from opera7133/tella) providing base templates
- **Content**: Bilingual via file suffixes — `_index.zh.md` / `_index.en.md` for pages, `[slug].[lang].md` for news
- **Configuration**:
  - `hugo.toml` — production config (English default, baseURL points to zerogenlab.github.io)
  - `config/_default/hugo.toml` — development config (localhost:1313, Chinese default)
  - `config/development/` and `config/production/` inherit from default
- **Styling**: UnoCSS with `uno.config.mjs` using preset-wind4, transformerDirectives, transformerVariantGroup
- **i18n**: `i18n/en.yaml` and `i18n/zh.yaml` contain translation keys
- **Deploy**: Netlify with `git submodule update --remote --merge && npm run build` as production command

## Key Directories

- `layouts/` — overrides and custom templates (partials, pages, shortcodes)
- `layouts/partials/members/` — member cards, icons, sections
- `layouts/research/` — publications.html, projects.html custom research templates
- `content/research/publications/` — publication entries (bilingual .zh.md / .en.md)
- `content/members/` — member profiles with individual `[name]/index.[lang].md` subdirectories
- `static/` — static assets (CSS, fonts, images)
- `data/slide/` — JSON data for homepage slide (`en.json`, `zh.json`)

## Important Patterns

- Hugo outputs to `public/` directory which is .gitignored
- Content files without language suffix (e.g., `content/news/_index.md`) are shared/中性
- Menu configuration is in `[languages.zh.menu]` and `[languages.en.menu]` blocks in hugo.toml
- Publications are defined via front matter in `content/research/publications/_index.[lang].md`
