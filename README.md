# PagePatch

PagePatch is a dependency-free visual editor that converts proposed changes on a live webpage into one route-wide Markdown request.

The complete product intent is documented in [PRODUCT-BRIEF.md](./PRODUCT-BRIEF.md).

## Build

```powershell
npm run build
```

The distributable file is `dist/pagepatch.js`. It contains the interface, styles, persistence, preview logic, and exporter; it has no runtime dependencies.

The same build prepares `deploy/` for Cloudflare Pages. It contains the installation page, hosted demo, and `/pagepatch.js` distribution URL.

## Import

```html
<script src="https://pagepatch.evoltex.com.br/pagepatch.js"></script>
```

The coworker-friendly installer and bookmarklet are available at `https://pagepatch.evoltex.com.br/`.

The script stays dormant on ordinary URLs. Add the `edit-mode` query parameter to activate it:

```text
https://mercos.com/example?edit-mode
```

Manual activation is also available:

```js
window.PagePatch.start()
```

## Local persistence

Requests are stored in `localStorage` under `pagepatch:v1`. Storage is specific to the current browser and origin. The `edit-mode` parameter is removed when calculating the route key, so `/example` and `/example?edit-mode` share the same page request.

## Important behavior

- Nothing is sent to a server.
- Preview changes affect only the current browser DOM.
- Enabled requests automatically reapply after reloads and client-framework DOM rerenders.
- Text and alt-text edits preview live while typing; closing the editor restores an unsaved draft.
- Turning preview off restores the page without deleting requests.
- SEO mode includes technical metadata, heading hierarchy, anchor/link auditing, list structure, social-card previews, image auditing, and JSON-LD editing.
- Link requests can change both the visible anchor text and its destination URL.
- Exported technical details include a complete `body > ... > element` DOM path plus the shorter stable selector when available.
- Clicking a request card scrolls to and flashes its visible page target.
- Export includes active requests only and produces a human-readable Markdown handoff with page-area context, current/requested values, and secondary technical details.
- The structured JSON is kept as PagePatch import data rather than presented as an implementation prompt.
- Drop an exported Markdown or JSON file at `https://pagepatch.evoltex.com.br/` to reopen its target page, then click the bookmarklet to import and preview it.
- The floating launcher can be collapsed while leaving previews active.

## Public API

```js
window.PagePatch.start()
window.PagePatch.stop()
window.PagePatch.getChanges()
window.PagePatch.exportPage()
window.PagePatch.clearPage()
```
