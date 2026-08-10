import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const script = await readFile(fileURLToPath(new URL("../dist/pagepatch.js", import.meta.url)), "utf8");
const homepage = await readFile(fileURLToPath(new URL("../deploy/index.html", import.meta.url)), "utf8");
const openPages = new Set();

const fixture = `<!doctype html><html><head>
  <title>Old page title</title>
  <meta name="description" content="Old description">
  <meta name="robots" content="index,follow">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="https://example.com/old">
  <meta property="og:title" content="Old OG title">
  <meta property="og:description" content="Old OG description">
  <meta property="og:image" content="https://example.com/old-og.jpg">
  <meta property="og:url" content="https://example.com/old-og">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Old X title">
  <meta name="twitter:description" content="Old X description">
  <meta name="twitter:image" content="https://example.com/old-x.jpg">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Old"}</script>
</head><body>
  <main id="content"><section class="hero"><h2 id="semantic">Same heading</h2><h3 id="both">Old combined heading</h3>
  <p id="text">Old paragraph</p><p id="react-title">React original</p><div id="layout">Layout block</div>
  <a id="link" href="/old-link">Reference link</a><ul id="list"><li>First item</li><li>Second item</li></ul>
  <img id="image" src="/photo.jpg" alt="Old alt"></section></main>
</body></html>`;

function element(tag, label, text = "") {
  return { tag, label, text, path: `body > main#content > ${label}`, context: { area: "Hero section" } };
}

function change(overrides) {
  return {
    id: overrides.id || Math.random().toString(36).slice(2),
    route: "/review",
    url: "https://example.com/review",
    enabled: true,
    createdAt: "2026-08-10T12:00:00.000Z",
    note: "",
    ...overrides,
  };
}

const matrix = [
  change({ id: "text", kind: "text", selector: "#text", property: "textContent", before: "Old paragraph", after: "New paragraph", note: "Marketing-approved copy.", element: element("p", "p#text", "Old paragraph") }),
  change({ id: "semantic", kind: "seo", selector: "#semantic", property: "textContent", before: "Same heading", after: "Same heading", semanticTag: "H1", element: element("h2", "h2#semantic", "Same heading") }),
  change({ id: "both", kind: "seo", selector: "#both", property: "textContent", before: "Old combined heading", after: "New combined heading", semanticTag: "H2", element: element("h3", "h3#both", "Old combined heading") }),
  change({ id: "style", kind: "style", selector: "#layout", property: "style", before: { color: "rgb(0, 0, 0)", padding: "8px" }, after: { color: "rgb(255, 85, 0)", padding: "16px" }, priorities: { color: true }, element: element("div", "div#layout") }),
  change({ id: "note", kind: "note", selector: "#text", property: "note", before: "", after: "Move this copy below the image.", note: "Move this copy below the image.", element: element("p", "p#text", "Old paragraph") }),
  change({ id: "div", kind: "div", selector: "#layout", property: "note", before: "", after: "Make this section full width.", note: "Make this section full width.", element: element("div", "div#layout") }),
  change({ id: "alt", kind: "seo", selector: "#image", property: "attr:alt", before: "Old alt", after: "Team reviewing sales results", element: element("img", "img#image") }),
  change({ id: "href", kind: "seo", selector: "#link", property: "attr:href", before: "/old-link", after: "/new-link", element: element("a", "a#link", "Reference link") }),
  change({ id: "list", kind: "seo", selector: "#list", property: "semantic-tag", before: "UL", after: "OL", element: element("ul", "ul#list", "First item Second item") }),
  change({ id: "title", kind: "seo", selector: "title", property: "document-title", before: "Old page title", after: "New page title", element: element("title", "Page title") }),
  change({ id: "description", kind: "seo", selector: 'meta[name="description"]', property: "meta-description", before: "Old description", after: "New description", element: element("meta", "Meta description") }),
  change({ id: "jsonld", kind: "seo", selector: 'script[type="application/ld+json"]:nth-of-type(1)', property: "jsonld", before: '{"@context":"https://schema.org","@type":"WebPage","name":"Old"}', after: '{"@context":"https://schema.org","@type":"WebPage","name":"New"}', create: false, element: element("script", "JSON-LD schema") }),
  change({ id: "jsonld-new", kind: "seo", selector: 'script[data-pagepatch-schema="new"]', property: "jsonld", before: "", after: '{"@context":"https://schema.org","@type":"FAQPage"}', create: true, element: element("script", "JSON-LD schema") }),
  ...[
    ["canonical", 'link[rel="canonical"]', "Canonical URL", "https://example.com/old", "https://example.com/new"],
    ["robots", 'meta[name="robots"]', "Robots directive", "index,follow", "noindex,nofollow"],
    ["referrer", 'meta[name="referrer"]', "Referrer policy", "strict-origin-when-cross-origin", "no-referrer"],
    ["og-title", 'meta[property="og:title"]', "Open Graph title", "Old OG title", "New OG title"],
    ["og-description", 'meta[property="og:description"]', "Open Graph description", "Old OG description", "New OG description"],
    ["og-image", 'meta[property="og:image"]', "Open Graph image", "https://example.com/old-og.jpg", "https://example.com/new-og.jpg"],
    ["og-url", 'meta[property="og:url"]', "Open Graph URL", "https://example.com/old-og", "https://example.com/new-og"],
    ["og-type", 'meta[property="og:type"]', "Open Graph type", "website", "article"],
    ["x-card", 'meta[name="twitter:card"]', "X card type", "summary", "summary_large_image"],
    ["x-title", 'meta[name="twitter:title"]', "X title", "Old X title", "New X title"],
    ["x-description", 'meta[name="twitter:description"]', "X description", "Old X description", "New X description"],
    ["x-image", 'meta[name="twitter:image"]', "X image", "https://example.com/old-x.jpg", "https://example.com/new-x.jpg"],
  ].map(([id, selector, label, before, after]) => change({ id, kind: "seo", selector, property: "head-content", head: { selector, attribute: selector.startsWith("link") ? "href" : "content" }, before, after, element: element(selector.startsWith("link") ? "link" : "meta", label) })),
];

function withoutEnabled(value) {
  return value.map(({ enabled, ...rest }) => rest);
}

function createPage({ changes = [], url = "https://example.com/review", html = fixture } = {}) {
  const dom = new JSDOM(html, { url, runScripts: "outside-only", pretendToBeVisual: true });
  const { window } = dom;
  Object.defineProperty(window.navigator, "language", { configurable: true, value: "en-US" });
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
  window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
  window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  window.HTMLElement.prototype.getBoundingClientRect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 200, bottom: 40, width: 200, height: 40 });
  window.HTMLElement.prototype.scrollIntoView = function () { this.__pagePatchScrolled = (this.__pagePatchScrolled || 0) + 1; };
  window.HTMLElement.prototype.animate = function () { this.__pagePatchAnimated = (this.__pagePatchAnimated || 0) + 1; return { cancel() {} }; };
  window.localStorage.setItem("pagepatch:v1", JSON.stringify(changes));
  let exported = "";
  window.Blob = class BlobCapture {
    constructor(parts) { exported = parts.join(""); }
  };
  window.URL.createObjectURL = () => "blob:pagepatch-test";
  window.URL.revokeObjectURL = () => {};
  window.HTMLAnchorElement.prototype.click = function () {};
  window.eval(script);
  window.PagePatch.start();
  const page = { dom, window, get exported() { return exported; } };
  openPages.add(page);
  return page;
}

function closePage(page) {
  if (!page || !openPages.has(page)) return;
  page.window.PagePatch?.stop();
  page.window.close();
  openPages.delete(page);
}

function shadow(page) {
  return page.window.document.querySelector("pagepatch-root").shadowRoot;
}

function parseImport(markdown) {
  const match = markdown.match(/<summary>PagePatch import data<\/summary>[\s\S]*?```json\n([\s\S]*?)\n```/);
  assert.ok(match, "export includes embedded import JSON");
  return JSON.parse(match[1]);
}

function base64url(value) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

afterEach(() => {
  for (const page of [...openPages]) closePage(page);
});

describe("homepage copy", () => {
  function openHomepage(language) {
    return new JSDOM(homepage, {
      url: "https://pagepatch.evoltex.com.br/",
      runScripts: "dangerously",
      beforeParse(window) {
        Object.defineProperty(window.navigator, "language", { configurable: true, value: language });
        Object.defineProperty(window.navigator, "languages", { configurable: true, value: [language] });
      },
    });
  }

  test("English copy is direct and task-focused", () => {
    const dom = openHomepage("en-US");
    const { document } = dom.window;
    assert.equal(document.documentElement.lang, "en");
    assert.equal(document.querySelector("h1").textContent, "Point at the page. Say what should change.");
    assert.match(document.querySelector(".lead").textContent, /write the request right there/i);
    assert.equal(document.querySelector("#bookmarklet strong").textContent, "PagePatch by Evoltex");
    assert.match(document.querySelector("footer").textContent, /does not change the real site/i);
    assert.equal(document.title, "PagePatch: mark changes on any webpage");
    dom.window.close();
  });

  test("Brazilian Portuguese copy carries the same meaning", () => {
    const dom = openHomepage("pt-BR");
    const { document } = dom.window;
    assert.equal(document.documentElement.lang, "pt-BR");
    assert.equal(document.querySelector("h1").textContent, "Aponte na página. Diga o que precisa mudar.");
    assert.match(document.querySelector(".lead").textContent, /escreva o pedido ali mesmo/i);
    assert.equal(document.querySelector("#bookmarklet strong").textContent, "PagePatch by Evoltex");
    assert.match(document.querySelector("footer").textContent, /não altera o site de verdade/i);
    assert.equal(document.title, "PagePatch: marque alterações em qualquer página");
    dom.window.close();
  });
});

describe("complete change-request export matrix", () => {
  test("exports every active field losslessly and humanizes every request type", () => {
    const disabled = change({ id: "disabled", enabled: false, kind: "text", selector: "#text", property: "textContent", before: "Never", after: "Exported", element: element("p", "p#text") });
    const page = createPage({ changes: [...matrix, disabled] });
    page.window.PagePatch.exportPage();
    const markdown = page.exported;
    const payload = parseImport(markdown);

    assert.deepEqual(payload.changes, withoutEnabled(matrix));
    assert.equal(payload.changes.some((item) => item.id === "disabled"), false);
    assert.doesNotMatch(markdown, /Status:\s*Enabled|Machine-only nearby context|Conteúdo próximo/i);
    assert.match(markdown, /Change `H2` to `H1`\. Keep the text unchanged\./);
    const semanticSection = markdown.match(/## \d+\. Change semantic element[\s\S]*?(?=\n## \d+\.|\n<details>\n<summary>PagePatch import data)/)?.[0] || "";
    assert.equal((semanticSection.match(/Same heading/g) || []).length, 1);
    assert.match(markdown, /Change `H3` to `H2`\. Replace the text as shown below\./);
    assert.match(markdown, /### Current text[\s\S]*Old combined heading[\s\S]*### New text[\s\S]*New combined heading/);
    assert.match(markdown, /### Current values[\s\S]*padding: 8px;[\s\S]*### Requested CSS[\s\S]*color: rgb\(255, 85, 0\) !important;/);
    assert.match(markdown, /Move this copy below the image\./);
    assert.match(markdown, /Make this section full width\./);
    assert.match(markdown, /Old alt[\s\S]*Team reviewing sales results/);
    assert.match(markdown, /### Link text for reference[\s\S]*Reference link[\s\S]*### Current destination[\s\S]*\/old-link[\s\S]*### New destination[\s\S]*\/new-link/);
    assert.match(markdown, /Change the list from `UL` to `OL`\. Keep its list items unchanged\./);
    for (const item of matrix.filter((entry) => ["document-title", "meta-description", "head-content", "jsonld"].includes(entry.property))) {
      if (item.before) assert.ok(markdown.includes(item.before), `${item.id}: current value is visible`);
      assert.ok(markdown.includes(item.after), `${item.id}: requested value is visible`);
    }
  });

  test("the embedded JSON imports back with all implementation data intact", () => {
    const source = createPage({ changes: matrix });
    source.window.PagePatch.exportPage();
    const payload = parseImport(source.exported);
    closePage(source);
    const imported = createPage({ url: `https://example.com/review#pagepatch-import=${base64url(payload)}` });
    const restored = imported.window.PagePatch.getChanges();
    assert.equal(restored.length, matrix.length);
    for (const expected of payload.changes) {
      const actual = restored.find((item) => item.selector === expected.selector && item.property === expected.property && item.kind === expected.kind);
      assert.ok(actual, `${expected.id}: imported`);
      for (const key of ["kind", "selector", "property", "before", "after", "note", "semanticTag", "head", "create", "priorities", "element"]) {
        assert.deepEqual(JSON.parse(JSON.stringify(actual[key] ?? null)), JSON.parse(JSON.stringify(expected[key] ?? null)), `${expected.id}: ${key} preserved`);
      }
      assert.equal(actual.enabled, true);
    }
    assert.equal(imported.window.location.hash, "");
  });
});

describe("visible SEO inventory anchors", () => {
  test("headings, links, lists, and images all scroll and blink their page element", async () => {
    const page = createPage();
    const ui = shadow(page);
    ui.querySelector('[data-action="mode"][data-mode="seo"]').click();
    const cases = [
      ["headings", "#semantic"],
      ["links", "#link"],
      ["lists", "#list"],
      ["images", "#image"],
    ];
    for (const [view, selector] of cases) {
      const tab = ui.querySelector(`[data-action="seo-tab"][data-view="${view}"]`);
      assert.ok(tab, `${view}: tab exists`);
      tab.click();
      const row = ui.querySelector(`[data-action="seo-locate"][data-selector="${selector}"]`);
      assert.ok(row, `${view}: row exposes shared locator`);
      row.click();
      assert.equal(page.window.document.querySelector(selector).__pagePatchScrolled, 1, `${view}: scrolls to page element`);
    }
    ui.querySelector('[data-action="seo-tab"][data-view="headings"]').click();
    const keyboardRow = ui.querySelector('[data-action="seo-locate"][data-selector="#semantic"]');
    keyboardRow.dispatchEvent(new page.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    assert.equal(page.window.document.querySelector("#semantic").__pagePatchScrolled, 2, "keyboard activation locates too");
    assert.ok(ui.querySelector('[data-action="seo-heading"][data-selector="#semantic"]'), "Edit remains a separate action");
    await new Promise((resolve) => page.window.setTimeout(resolve, 380));
    for (const [, selector] of cases) assert.ok(page.window.document.querySelector(selector).__pagePatchAnimated >= 1, `${selector}: blinked`);
  });
});

describe("runtime safety and persistence", () => {
  test("saved text reapplies after a React-style DOM replacement", async () => {
    const saved = change({ id: "react", kind: "text", selector: "#react-title", property: "textContent", before: "React original", after: "Requested React copy", element: element("p", "p#react-title") });
    const page = createPage({ changes: [saved] });
    assert.equal(page.window.document.querySelector("#react-title").textContent, "Requested React copy");
    const replacement = page.window.document.createElement("p");
    replacement.id = "react-title";
    replacement.textContent = "React original";
    page.window.document.querySelector("#react-title").replaceWith(replacement);
    await new Promise((resolve) => page.window.setTimeout(resolve, 220));
    assert.equal(page.window.document.querySelector("#react-title").textContent, "Requested React copy");
  });

  test("a request is not deleted until confirmation succeeds", () => {
    const saved = change({ id: "delete-me", kind: "note", selector: "#text", property: "note", before: "", after: "Keep me", note: "Keep me", element: element("p", "p#text") });
    const page = createPage({ changes: [saved] });
    const ui = shadow(page);
    page.window.confirm = () => false;
    ui.querySelector('[data-action="delete-change"]').click();
    assert.equal(page.window.PagePatch.getChanges().length, 1);
    page.window.confirm = () => true;
    ui.querySelector('[data-action="delete-change"]').click();
    assert.equal(page.window.PagePatch.getChanges().length, 0);
  });

  test("an unchanged text selection with only a note saves as a note request", () => {
    const page = createPage();
    const ui = shadow(page);
    ui.querySelector('[data-action="mode"][data-mode="text"]').click();
    page.window.document.querySelector("#text").dispatchEvent(new page.window.MouseEvent("click", { bubbles: true, cancelable: true }));
    const form = ui.querySelector("form[data-form='change']");
    form.querySelector('[name="note"]').value = "Only explain this element.";
    form.dispatchEvent(new page.window.Event("submit", { bubbles: true, cancelable: true }));
    const [saved] = page.window.PagePatch.getChanges();
    assert.equal(saved.kind, "note");
    assert.equal(saved.property, "note");
    assert.equal(saved.before, "");
    assert.equal(saved.after, "Only explain this element.");
  });
});
