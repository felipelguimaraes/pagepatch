# PagePatch — Product Brief

## What I want

I want a lightweight visual editing and change-request tool that can be loaded on any webpage as a single JavaScript file.

The tool should let marketing, design, and development-oriented teammates inspect a real page, propose changes directly on top of it, preview those changes, and export one organized request covering everything requested on that page.

This is not only an annotation tool and not only a CSS override tool. It combines:

- Visual element selection similar to the browser inspector.
- Temporary edits applied directly to the current page.
- Structured requests containing the original and proposed values.
- A page-wide list of every requested change.
- A single export that can be handed to a developer or coding agent.

The main problem it solves is scattered and ambiguous feedback in Figma comments, screenshots, Trello cards, and messages. Instead of explaining which heading, section, or CSS rule should change, the requester selects the exact element, previews the requested result, and exports one implementation-ready document.

## Distribution and activation

The final deliverable must be one standalone JavaScript file with no runtime dependencies.

It should be possible to include it on a site with a normal script tag:

```html
<script src="https://example.com/pagepatch.js"></script>
```

Importing the script must not automatically expose editing controls to normal visitors. The editor activates when the page URL contains the `edit-mode` query parameter:

```text
https://example.com/pricing?edit-mode
```

The script may also expose a small JavaScript API for manually starting or stopping the tool when needed.

The editor should be isolated from the host page as much as practical so that the page's CSS does not break the editor and the editor does not alter the page layout unintentionally.

## Main interface

The closed interface is a small floating button near the bottom of the screen.

Clicking it expands a compact toolbar containing the available modes, preview controls, and access to the page's request list.

The interface should feel like a visual layer over the existing site rather than a separate administration page.

At minimum, it should provide:

- Mode selection.
- Editor open/collapsed state.
- Preview on/off.
- Request count for the current page.
- A panel listing all requests for the current page.
- Export for the entire page request.
- A way to delete or disable individual requests.

## Interaction modes

Each mode needs its own visual language. Changing modes must visibly change how the page is inspected and what can be selected.

### Inspect mode

Inspect mode works like a lightweight browser element inspector.

- Hovering an element displays an outline without changing layout.
- A small label identifies the element, such as `div.hero__content` or `h1.hero__title`.
- Clicking selects the element and opens its details.
- The selected element is visually stronger than the hovered element.

### Text mode

Text mode focuses on visible text that can be changed.

- Editable text elements receive a subtle, consistent highlight.
- Clicking a text element opens its current value for editing.
- Saving applies the proposed text to the live page.
- The original value and proposed value are both recorded.
- Modified text is visibly marked while edit mode is active.
- Preview can be turned off to see the original page again without deleting the request.

### SEO and semantics mode

SEO mode visually maps the semantic content of the page.

Every relevant element receives a colored type label, for example:

```text
[H1] Sistema de vendas para distribuidores
[H2] Conheça nossos recursos
[H3] Integrações para sua operação
[P]  Transforme dados em oportunidades
[A]  Solicite uma demonstração
[IMG ALT] Dashboard de indicadores
```

Different semantic types should use different colors so that the document structure is understandable at a glance.

The mode should cover:

- Page title.
- Meta description.
- H1 through H6.
- Paragraphs and relevant spans.
- Links and their visible labels or destinations.
- Images and alt text.
- Missing SEO data where practical.

Clicking a labeled item allows its relevant content or semantic property to be edited. For example, a heading request may change its visible text, and an image request may change its alt text.

Text semantics can be changed in either direction among `H1` through `H6`, `P`, and `SPAN`. For example, a paragraph or span can become a heading, and a heading can become a paragraph or span. The live preview applies the requested element type locally, while disabling Preview restores the original element type and content.

The page-level SEO information should also be visible in a compact summary.

SEO mode also includes a dedicated workspace with seven views:

- Overview for title, meta description, canonical URL, robots indexing/following directives, referrer policy, and quick audit signals.
- Headings for the complete H1–H6 hierarchy, structural warnings, and direct editing or semantic-level changes.
- Links for visible labels, destinations, missing href values, and new-tab safety checks.
- Lists for ordered and unordered list structure, item counts, and semantic list-type changes.
- Social for Open Graph and X/Twitter metadata with live Facebook/LinkedIn and X card previews.
- Images for thumbnails, dimensions, alt-text status, and direct alt-text editing.
- Schema for viewing, validating, editing, and adding JSON-LD blocks.

### Div and layout mode

Div mode reveals the structure of the page.

- Containers such as `div`, `section`, `main`, `header`, `footer`, `article`, and `nav` receive nearly transparent outlines.
- Hovering strengthens the outline and shows an element label.
- Selecting a container clearly distinguishes it and its nesting context.
- The visualization must use outlines or a separate overlay and must not cause layout shifts.
- Deeply nested pages should remain usable; labels do not need to be shown for every container until hovered.

### Style mode

Style mode allows technical visual requests.

- Hovering and selection identify the exact element.
- The panel shows the complete computed-style declaration list for the selected element in a read-only column.
- The computed-style column has a control for copying the complete list.
- Every computed property has an arrow that transfers that property and its current value into the requested-overrides editor.
- The requested-overrides side is a CSS textarea where the requester can edit transferred values, remove declarations, or write any valid CSS declarations directly.
- Saving applies the style to the live preview.
- Only requested overrides are recorded, not the element's entire computed style.
- The exported request includes the selector, original value when available, and proposed CSS.

### Note mode

Note mode attaches a plain-language request to an element without requiring a direct DOM or CSS modification.

This covers requests such as adding a new component, replacing an image asset, changing behavior, or discussing something that cannot be represented as a simple text or style edit.

## Saving and persistence

Requests and preview data are saved locally in the browser.

- Refreshing the page should not lose the requests.
- Data is organized by page route.
- Returning to a route restores its request list.
- Enabled changes are applied automatically when the editor starts or the page reloads.
- Saved text, semantic elements, metadata, and styles are reapplied when React or another client framework replaces the affected DOM nodes.
- Text and alt-text drafts update the live DOM while the requester types; cancelling restores the original value.
- Local data does not need accounts or a remote backend.

There are separate controls for:

- Showing or hiding the editor.
- Turning the full requested-change preview on or off.
- Enabling or disabling an individual request.
- Deleting an individual request.
- Clearing the current page only after explicit confirmation.

Turning preview off restores the original page but preserves every recorded request. Turning preview on reapplies all enabled requests.

## Page-wide request

The primary output is one request for the entire current page, not one disconnected file per modification.

The page request contains every saved item for the route, including text, SEO, style, layout, and general notes.

Each visible-element item in the request list is also a page locator. Clicking it scrolls the target into view and flashes it strongly so the requester or implementer can immediately find the affected area. Metadata-only requests explain that they have no visible page target.

The export should include:

- Page URL and normalized route.
- Export date.
- Viewport dimensions.
- A numbered list of all requested changes.
- Change type.
- Human-readable element description.
- A reasonably stable selector.
- Original value.
- Proposed value.
- Optional reason or note.
- Structured JSON data so the request can also be consumed by tooling.

Only enabled requests are exported. Disabled requests are omitted entirely, and the human-readable document does not show redundant enabled/status fields.

Markdown is the preferred human-readable format. Each request leads with a plain-language action such as “Change selected text,” identifies the selected element, and adds nearby section or heading context. Selectors and DOM properties remain available under secondary technical details instead of dominating the handoff. The JSON representation is included as PagePatch import data, not as an AI or implementation prompt.

The editor imports an exported Markdown or JSON file from the PagePatch bar on the original page. Import stores the requests locally for that origin and previews the active changes.

## Element identification

Generated selectors should favor stable identifiers:

1. Explicit review-related `data-*` attributes.
2. Element IDs.
3. Useful stable classes.
4. Semantic ancestors and element position only when necessary.

The tool should retain additional element context, such as tag name, visible text excerpt, classes, and route, so a developer can still find the target if the generated selector later becomes stale.

## Preview behavior

Every direct edit serves two purposes simultaneously:

1. It previews the proposed result on the live page.
2. It creates or updates a structured change request.

The preview is temporary and local. It must never send changes to the website, modify source files, or imply that the real site has been updated.

Elements with saved requests remain visibly marked while the editor is active. These persistent markers are stronger than ordinary mode outlines and identify the request types attached to the element. Notes receive an especially visible marker even though they do not directly change the DOM.

## Route behavior

Requests are grouped by route. The tool should tolerate conventional pages and client-side navigation.

The `edit-mode` query parameter is an activation mechanism and should not be treated as part of the content route. For example, these refer to the same request set:

```text
/example
/example?edit-mode
```

Other meaningful query parameters may be preserved in exported page context, while the storage key should remain predictable.

## First-version boundaries

The first version does not require:

- User accounts.
- Cloud synchronization.
- Figma or Trello integration.
- Automatic source-code modification.
- A complete replacement for browser DevTools.
- A remote database.
- Collaboration or real-time cursors.

The first version succeeds when a teammate can open a page with `?edit-mode`, visually select elements using clearly different modes, create several types of requests, preview them together, turn them on or off, refresh without losing them, and export one unambiguous page-wide change-request file.
