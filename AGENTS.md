# Agent guide

A one-page bilingual (English and Hebrew) business site for Joseph Sabag, served at
https://joseph-tech-solutions.dev/ by one Cloudflare Worker named `freelance-landing-page`. The
look and motion follow the design file `03-sheets-v6.html` one to one; only the words were
rewritten. Every call button opens WhatsApp at +972546187549 with a localized draft message.
There are no forms, accounts, business API, database or secrets.

## Structure

Code is split by where it runs, then by feature. Imports go one way.

```txt
client/
  prerender.ts          runs at build: writes both language pages with the CSS inlined
  src/                  runs in the browser (React 19 + Vite)
    main.ts  startApp.tsx  renderPage.tsx  App.tsx  globalStyles.css
    assets/             images Vite hashes
    components/         UI used by 2+ features
    hooks/              hooks used by 2+ features
    features/<feature>/ everything one feature needs
  worker/               runs on Cloudflare: page language, redirects, headers, 404s
  e2e/                  runs in Node: Playwright against the production build
  public/               copied as is: 404 page, favicon, robots, sitemap
```

- `src/**` never imports `worker/**` and the reverse (Biome `noRestrictedImports`).
  One tsconfig per runtime (`tsconfig.app.json`, `tsconfig.worker.json`, `tsconfig.node.json`).
- No `shared/`, `utils/`, `docs/`, barrels, re-exports or index files.

Where a new file goes:

1. Where does it run? Browser `src/`, Cloudflare `worker/`, browser test `e2e/`.
2. Which feature? `src/features/<feature>/`.
3. Used by 2+ features? A component goes in `src/components/`, a hook in `src/hooks/`.
4. Unsure? The feature folder.

Name patterns: `<Name>Section.tsx` (a full-screen section), `<Name>Canvas.tsx` (a canvas
animation), `<Problem>Animation.tsx`, `<Name>.tsx` (other components), `use<Name>.ts`,
`<name>.ts` (no React), `<feature>.text.ts` (English and Hebrew words), `<feature>.css`,
`<file>.test.ts` (colocated Vitest), `e2e/<topic>.spec.ts`. A name says what the thing is.
No design-file jargon such as sheet, hero, pains, scene, stage, band, toast or copy, in file
names or CSS classes.

## Code

- Readable and simple. Extend existing code before adding an abstraction.
- Named arrow functions, `const`, flat guard clauses with early returns. One idea combines
  with `&&`; different outcomes get separate guards. No nested ifs, nested ternaries, nested
  calls, `??`, or type assertions that hide errors.
- Specific names, never `data`, `result`, `row` or `record`.
- One component per file. PascalCase component files, camelCase other source files.
- Inline named exports, direct imports, `import type`. Default exports only where a tool
  requires one (configs, the Worker entry).
- `interface XProps` for props, `type` for domain shapes.
- React owns UI state. Browser code stays plain TypeScript so the first load stays small.
  Effect runs in the Worker only: asset I/O with failures logged, and outside values decoded
  with Effect Schema.
- Effects return cleanup. Loops stop offscreen, while covered by the next section, and under
  reduced motion. No animation may block reading or selecting text.
- Plain CSS per feature. Colors are custom properties in the `:root` of `globalStyles.css`.
  No Tailwind, no `!important`.
- Every interactive element has an accessible name, visible focus and a usable touch area.
- No narrating comments or TSDoc. Biome formats: single quotes, semicolons, 100 columns,
  2 spaces, trailing commas.

## Words and languages

- English (`ltr`) and Hebrew (`rtl`) are equal. The Worker picks the page for `/`: the
  `jts-language` cookie (a manual choice) wins, else the browser's first `Accept-Language`.
- Every visible word and accessible label lives in a `<feature>.text.ts` in both languages.
- Voice: spoken and specific. Open on the visitor's problem in their own words, then give the
  fix. The visitor is the one acting, so keep "I" rare. Hebrew talks to the visitor in plural
  and sounds spoken, not written. No em dashes, no revenue promises, no claims beyond the
  facts already in the text. Do not mention military service.
- Use CSS logical properties. Mirror directional animations under `html[dir="rtl"]`.

## Visitor tracking

- The Meta Pixel in `features/visitorTracking/` runs for every visitor, with no consent banner.
  It exists only in the production build, and Meta's script loads only after the first
  interaction, so it never delays the first paint.
- It reports the page view, a WhatsApp click as `Contact`, and the custom events `Click`,
  `Hover`, `Hold`, `SectionView`, `ScrollDepth`, `TimeOnPage`, `TextSelect`, `TextCopy`,
  `ChatOpen` and `ChatClick`. Names and values are the same in both languages.
- A WhatsApp click also goes out as the custom event `WhatsAppClick`, with the same button
  name. Ads Manager offers `Contact` as a conversion event only for some campaign goals, and
  a custom event for all of them.
- Every new button or link gets a `data-track` name in snake_case. Other places report as
  `none`.
- The pixel copies each event to its Conversions API Gateway. The CSP `connect-src` lists the
  gateway's two exact hosts, never a wildcard. The hosts come from the pixel's settings in Meta
  Events Manager: if they change there, the browser console names the blocked host.
- Google Tag Manager (container `GTM-5KKTTCRT`) in `features/visitorTracking/` runs for every
  visitor. It exists only in the production build, and Google's script loads only after the
  first interaction, so it never delays the first paint. `index.html` keeps Google's no-script
  frame right after `<body>`.
- Google Analytics (`G-FGK25F36RF`) is a Google tag inside the container. Do not paste the
  gtag.js snippet into the code as well: every visit would be counted twice.
- Do not add a Facebook Pixel tag in the container: the pixel already runs from the code, so
  every page view would be counted twice.
- The container loads from a module, not from Google's inline snippet, so the CSP keeps no
  `unsafe-inline` for scripts. Custom HTML tags and Custom JavaScript variables need
  `unsafe-inline` and `unsafe-eval`, so they do not run here: use the built-in tag templates.
- Outside scripts (pixel, container, chat widget) start through `runAfterFirstInteraction`:
  after the first pointer, key or scroll event (at once if the visitor scrolled or tapped before
  the code ran) and once the page settles (`runAfterPageSettles`:
  the wait after `load`, no running CSS transition, a last frame to paint). The pixel queue and
  `dataLayer` start at once, so no event is lost. Lighthouse counts an outside request that
  starts before the largest paint, even a blocked one. A test calls `letPageSettle` from
  `e2e/letPageSettle.ts`, then presses a key before it expects the scripts.
- The work showcase also starts rotating on the first interaction (`listenForFirstInteraction`).
  Lighthouse never interacts, so its contrast check never lands on a button mid-fade.
  `navigator.userActivation` is read only where it exists: Safari before 16.4 lacks it, and a
  throw there stops the trackers and crashes the page.
- Checks never reach Meta or Google: Playwright serves stand-ins from `e2e/openSite.ts` and
  Lighthouse blocks `connect.facebook.net` and `www.googletagmanager.com`. The Lighthouse gate
  measures the site's own code: Meta's script adds main-thread work that only Meta can change.
- An outside host works only after it is added to the CSP in `worker/securityHeaders.ts`.
  A tag added in the container needs its hosts there first.

## Loading speed

Most visitors come from Facebook ads on a phone, so the mobile Lighthouse score stays at 100.

- The build prerenders both pages (`index.html`, `index.he.html`) from `src/renderPage.tsx`,
  with the CSS inlined and each language's title and description from `pageHead.text.ts`. The
  first paint needs only the page, the photo and one font.
- `main.ts` loads the app (`startApp.tsx`, which hydrates the page) only after the first
  contentful paint, and `prerender.ts` gives its script `fetchpriority="low"` (Vite strips the
  attribute from `index.html`). A request that starts before the largest paint delays it in
  Lighthouse's mobile simulation.
- Entrance motion that runs on load is CSS (`.enter-on-load`), never JavaScript. It only moves
  and never fades in from opacity 0, so the intro text counts as the largest paint at once.
- Text that JavaScript reveals on scroll (`.reveal-on-scroll`) shows under
  `@media (scripting: none)`, so the prerendered page reads in full without JavaScript.
- Fonts are Inter and the Hebrew subset of Heebo. Mono text uses system fonts. Each extra font
  file is another request before the first paint.
- `openSite` in `e2e/openSite.ts` waits for the app to start. A test that pauses the clock
  first calls `visitSite`, then `letAppStart` from `e2e/letAppStart.ts`.
- Playwright's `evaluate`, locator checks and trace snapshots count as a user gesture
  (`navigator.userActivation`). A test of the page before the first interaction turns tracing
  off for its file and waits for `networkidle` before it touches the page.

## Caching and routes

- `worker/cacheHeaders.ts` sets them (Cloudflare ignores `_headers` when the Worker runs
  first): hashed `/assets/*` are immutable for a year; everything else is
  `max-age=0, must-revalidate` with an ETag, so a reload gets a cheap 304.
- `worker/pageHeaders.ts` gives HTML pages `no-transform`, which stops Cloudflare from
  injecting its analytics script but also turns off its compression, so the Worker compresses
  pages itself through `Content-Encoding`. Other files never get `no-transform`, so Cloudflare
  compresses them.
- `/` adds `Accept-Language, Cookie` to `Vary`. The Hebrew page lives only at `/`; `/index.he`
  returns 404.
- Former domains and `www` redirect with 308 to the canonical apex, keeping path and query.
- Unknown and retired paths return 404, never the home page. Do not bring back the old
  versioned sites, chat, blog, product or legal pages.

## Checks

`pnpm check` runs Biome, `tsc -b`, Vitest, the build, Playwright (Chromium and WebKit, both
languages, 320 to 1440px, on the local Worker at 127.0.0.1:4173) and a mobile Lighthouse gate
(performance 0.98+, FCP 1.5s or less, LCP 2s or less, CLS 0.05 or less, TBT 100ms or less).
Port 4173 must be free.

CI runs the same checks as parallel jobs behind one required `CI Gate` job. Before opening a
PR, run them locally with `act workflow_dispatch -W .github/workflows/ci.yml`; the root
`.actrc` picks the Docker runner, keeps the pnpm store outside the workspace and gives each
job its own copy of an action, so parallel jobs cannot break each other's setup. act skips the
Lighthouse job because Docker is too slow to measure it; `pnpm test:vitals` covers it locally.

## Release

- Feature branch and PR, squash merge. Never push to main. No AI attribution or emojis.
- Before merging, deploying or changing DNS: show verified mobile screenshots and get explicit
  approval. CI never deploys.
- Steps: record the current Worker version for rollback. Squash merge. On the approved main
  commit run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm --dir client run deploy`.
  Then check on the real domains: the canonical apex serves the site, every other host returns
  308 with path and query kept, a retired path ends in 404, both languages and the WhatsApp
  links work. Save the commit and Worker version in the PR. If the live check fails, roll back
  to the recorded version.
- Never touch mail records in the `yosefhayimsabag.com` and `yosefhayimsabag.dev` zones.
- If GitHub Actions is blocked by billing, run the workflow with act in Docker and remove only
  what that run created. Never prune Docker globally.

## Working here

Preserve unrelated local work. Temporary files go in the session scratchpad, not the repo.
Stop servers you start.
