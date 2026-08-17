/* PagePatch v0.5.0 | Standalone visual change-request editor */
(function () {
  "use strict";

  if (window.PagePatch && window.PagePatch.version) return;

  var VERSION = "0.5.0";
  var ICON_DATA = "data:image/png;base64,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";
  var STORAGE_KEY = "pagepatch:v1";
  var EDIT_PARAM = "edit-mode";
  var MODES = ["inspect", "text", "seo", "div", "style", "note"];
  var LANGUAGE = /^pt(?:-|$)/i.test((navigator.languages && navigator.languages[0]) || navigator.language || "") ? "pt-BR" : "en";
  var IS_PT = LANGUAGE === "pt-BR";
  var UI_PT = {
    "Close": "Fechar", "Preview": "Prévia", "Requests": "Solicitações", "Page": "Página", "Delete": "Excluir", "Enable request": "Ativar solicitação",
    "Export active requests": "Exportar solicitações ativas", "Edit page SEO": "Editar SEO da página", "Clear page": "Limpar página", "Import": "Importar",
    "No requests yet. Choose a mode and select something on the page.": "Nenhuma solicitação ainda. Escolha um modo e selecione algo na página.",
    "Overview": "Visão geral", "Headings": "Cabeçalhos", "Links": "Links", "Lists": "Listas", "Social": "Social", "Images": "Imagens", "Schema": "Schema", "SEO workspace": "Área de trabalho de SEO",
    "Title": "Título", "Description": "Descrição", "Missing": "Ausente", "H1 headings": "Cabeçalhos H1", "Missing alt text": "Texto alternativo ausente", "Canonical": "Canônica", "JSON-LD blocks": "Blocos JSON-LD",
    "Page title": "Título da página", "Meta description": "Meta descrição", "Canonical URL": "URL canônica", "Indexing": "Indexação", "Link crawling": "Rastreamento de links", "Referrer policy": "Política de referência", "Browser default": "Padrão do navegador", "Save SEO overview": "Salvar visão geral de SEO",
    "Edit": "Editar", "Edit link": "Editar link", "Edit list": "Editar lista", "Locate on page": "Localizar na página", "No headings found.": "Nenhum cabeçalho encontrado.", "No links found.": "Nenhum link encontrado.", "No lists found.": "Nenhuma lista encontrada.", "Heading hierarchy has no obvious structural warnings.": "A hierarquia de cabeçalhos não apresenta problemas estruturais evidentes.",
    "Open Graph title": "Título Open Graph", "Open Graph type": "Tipo Open Graph", "Open Graph description": "Descrição Open Graph", "Open Graph image": "Imagem Open Graph", "Open Graph image URL": "URL da imagem Open Graph", "Open Graph URL": "URL Open Graph", "Open Graph page URL": "URL da página Open Graph", "X card type": "Tipo de cartão do X", "X title": "Título no X", "X description": "Descrição no X", "X image": "Imagem no X", "X image URL": "URL da imagem no X", "Robots directives": "Diretivas de robôs", "Save social metadata": "Salvar metadados sociais", "No social image": "Sem imagem social", "X preview": "Prévia no X",
    "Edit alt text": "Editar texto alternativo", "ALT MISSING": "ALT AUSENTE", "No images found.": "Nenhuma imagem encontrada.", "Add schema block": "Adicionar bloco de schema", "Save schema": "Salvar schema", "No JSON-LD blocks found.": "Nenhum bloco JSON-LD encontrado.",
    "Requested text": "Texto solicitado", "Link text": "Texto do link", "Destination URL": "URL de destino", "Reason or implementation note": "Motivo ou observação de implementação", "Save request": "Salvar solicitação", "Requested semantic element": "Elemento semântico solicitado", "Requested list type": "Tipo de lista solicitado", "Request": "Solicitação", "Size": "Tamanho", "Display": "Exibição",
    "Computed styles": "Estilos calculados", "Copy all": "Copiar tudo", "Requested overrides": "Substituições solicitadas", "Editable CSS declarations": "Declarações CSS editáveis", "read-only": "somente leitura",
    "Page SEO": "SEO da página", "Save page SEO": "Salvar SEO da página",
    "PagePatch is active": "PagePatch está ativo", "Request saved": "Solicitação salva", "Page request exported": "Solicitação da página exportada", "Computed styles copied": "Estilos calculados copiados",
    "Page SEO saved": "SEO da página salvo", "SEO overview saved": "Visão geral de SEO salva", "Social metadata saved": "Metadados sociais salvos", "JSON-LD schema saved": "Schema JSON-LD salvo",
    "There are no active requests to export.": "Não há solicitações ativas para exportar.", "The selected element is no longer on the page.": "O elemento selecionado não está mais na página.",
    "This request changes page metadata and has no visible target.": "Esta solicitação altera metadados da página e não possui um alvo visível.", "Add at least one valid CSS declaration.": "Adicione pelo menos uma declaração CSS válida.",
    "Write the request before saving.": "Escreva a solicitação antes de salvar.", "Describe the requested container or layout change.": "Descreva a alteração solicitada no contêiner ou layout.", "Change something or write a note before saving.": "Altere algo ou escreva uma observação antes de salvar.",
    "Local storage is unavailable. Export before leaving this page.": "O armazenamento local não está disponível. Exporte antes de sair desta página.", "This PagePatch import link is invalid or damaged.": "Este link de importação do PagePatch é inválido ou está corrompido.",
    "No PagePatch import data was found in this file.": "Nenhum dado de importação do PagePatch foi encontrado neste arquivo.", "This file has no active requests to import.": "Este arquivo não possui solicitações ativas para importar.", "This request file could not be read.": "Não foi possível ler este arquivo de solicitação.",
    "Toggle PagePatch": "Abrir ou fechar PagePatch"
  };

  function languageText(english, portuguese) { return IS_PT ? portuguese : english; }

  function translateUiText(value) {
    if (!IS_PT) return value;
    var source = String(value == null ? "" : value);
    var trimmed = source.trim();
    var translated = UI_PT[trimmed];
    if (!translated) {
      translated = trimmed
        .replace(/^Page request · (\d+)$/, "Solicitações da página · $1")
        .replace(/^(\d+) characters$/, "$1 caracteres")
        .replace(/^(\d+) chars$/, "$1 caracteres")
        .replace(/^(\d+) properties · read-only$/, "$1 propriedades · somente leitura")
        .replace(/^(\d+) request imported$/, "$1 solicitação importada")
        .replace(/^(\d+) requests imported$/, "$1 solicitações importadas")
        .replace(/^The page has (\d+) H1 headings\.$/, "A página possui $1 cabeçalhos H1.")
        .replace(/^The page has no H1 heading\.$/, "A página não possui um cabeçalho H1.")
        .replace(/^Heading level skips from H(\d) to H(\d)\.$/, "O nível de cabeçalho salta de H$1 para H$2.")
        .replace(/^H(\d+) heading is empty\.$/, "O cabeçalho H$1 está vazio.");
    }
    if (translated === trimmed) return source;
    return source.replace(trimmed, translated);
  }

  function localizeShadow() {
    if (!IS_PT || !shadow) return;
    var walker = document.createTreeWalker(shadow, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var parentName = node.parentElement ? node.parentElement.tagName : "";
      if (/^(STYLE|SCRIPT|TEXTAREA|CODE|PRE)$/.test(parentName)) continue;
      if (node.parentElement && node.parentElement.closest(".pp-item-preview,.pp-heading-text,.pp-code,.pp-computed-value")) continue;
      node.nodeValue = translateUiText(node.nodeValue);
    }
    shadow.querySelectorAll("[aria-label],[title],[placeholder]").forEach(function (element) {
      ["aria-label", "title", "placeholder"].forEach(function (attribute) {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, translateUiText(element.getAttribute(attribute)));
      });
    });
  }
  var state = {
    running: false,
    expanded: true,
    panel: "requests",
    mode: "inspect",
    seoView: "overview",
    schemaDrafts: 0,
    preview: true,
    selected: null,
    draft: null,
    hovered: null,
    route: routeKey(),
    allChanges: loadChanges(),
    runtimeOriginals: new Map(),
    lastUrl: location.href,
    observer: null,
    redrawQueued: false,
    applying: false
  };

  var host;
  var shadow;
  var overlayLayer;
  var controls;
  var panel;
  var hoverBox;

  function routeKey() {
    var url = new URL(location.href);
    url.searchParams.delete(EDIT_PARAM);
    url.hash = "";
    var query = url.searchParams.toString();
    return url.pathname + (query ? "?" + query : "");
  }

  function loadChanges() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveChanges() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.allChanges));
    } catch (_) {
      announce("Local storage is unavailable. Export before leaving this page.", true);
    }
  }

  function pageChanges() {
    return state.allChanges.filter(function (change) { return change.route === state.route; });
  }

  function uid() {
    return "pp-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function cssEscape(value) {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, function (char) {
      return "\\" + char.codePointAt(0).toString(16) + " ";
    });
  }

  function visible(element) {
    if (!element || !element.getBoundingClientRect) return false;
    var style = getComputedStyle(element);
    var rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0 &&
      rect.bottom >= 0 && rect.right >= 0 && rect.top <= innerHeight && rect.left <= innerWidth;
  }

  function usefulClasses(element) {
    return Array.from(element.classList || []).filter(function (name) {
      return /^[A-Za-z][A-Za-z0-9_-]{1,60}$/.test(name) &&
        !/^(active|selected|hover|focus|open|closed|visible|hidden|current)$/i.test(name);
    }).slice(0, 2);
  }

  function selectorFor(element) {
    if (!element || element.nodeType !== 1) return "";
    if (element === document.documentElement) return "html";
    if (element === document.body) return "body";
    if (element.tagName === "TITLE") return "title";
    if (element.matches('meta[name="description"]')) return 'meta[name="description"]';

    var stableAttrs = ["data-review-id", "data-testid", "data-component", "data-section"];
    for (var index = 0; index < stableAttrs.length; index += 1) {
      var attr = stableAttrs[index];
      if (element.hasAttribute(attr)) {
        return "[" + attr + '=\"' + cssEscape(element.getAttribute(attr)) + '\"]';
      }
    }
    if (element.id) return "#" + cssEscape(element.id);

    var direct = element.tagName.toLowerCase();
    var classes = usefulClasses(element);
    if (classes.length) direct += "." + classes.map(cssEscape).join(".");
    try {
      if (document.querySelectorAll(direct).length === 1) return direct;
    } catch (_) {}

    var parts = [];
    var current = element;
    while (current && current !== document.body && parts.length < 5) {
      var part = current.tagName.toLowerCase();
      if (current.id) {
        parts.unshift("#" + cssEscape(current.id));
        break;
      }
      var currentClasses = usefulClasses(current);
      if (currentClasses.length) part += "." + currentClasses.map(cssEscape).join(".");
      var siblings = current.parentElement ? Array.from(current.parentElement.children).filter(function (item) {
        return item.tagName === current.tagName;
      }) : [];
      if (siblings.length > 1) part += ":nth-of-type(" + (siblings.indexOf(current) + 1) + ")";
      parts.unshift(part);
      var candidate = parts.join(" > ");
      try {
        if (document.querySelectorAll(candidate).length === 1) return candidate;
      } catch (_) {}
      current = current.parentElement;
    }
    return parts.join(" > ");
  }

  function domPathFor(element) {
    if (!element || element.nodeType !== 1) return "";
    if (element === document.documentElement) return "html";
    var parts = [];
    var current = element;
    while (current && current.nodeType === 1 && current !== document.documentElement) {
      var part = current.tagName.toLowerCase();
      if (current.id) part += "#" + cssEscape(current.id);
      var classes = usefulClasses(current);
      if (classes.length) part += "." + classes.map(cssEscape).join(".");
      var siblings = current.parentElement ? Array.from(current.parentElement.children).filter(function (item) { return item.tagName === current.tagName; }) : [];
      if (!current.id && siblings.length > 1) part += ":nth-of-type(" + (siblings.indexOf(current) + 1) + ")";
      parts.unshift(part);
      if (current === document.body) break;
      current = current.parentElement;
    }
    return parts.join(" > ");
  }

  function describeElement(element) {
    if (!element) return {};
    var text = (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || "",
      classes: usefulClasses(element),
      text: text.slice(0, 160),
      label: elementLabel(element),
      path: domPathFor(element),
      context: describeContext(element)
    };
  }

  function describeContext(element) {
    if (!element || !element.closest) return {};
    var container = element.closest("section,article,main,header,footer,nav,aside,[role='region']") || element.parentElement;
    var heading = element.matches("h1,h2,h3,h4,h5,h6") ? element : element.querySelector("h1,h2,h3,h4,h5,h6");
    if (!heading && container) heading = container.querySelector("h1,h2,h3,h4,h5,h6");
    var parent = element.parentElement;
    var nearby = parent ? (parent.innerText || parent.textContent || "").replace(/\s+/g, " ").trim() : "";
    var ownText = (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
    if (nearby === ownText && container && container !== parent) nearby = (container.innerText || container.textContent || "").replace(/\s+/g, " ").trim();
    return {
      area: heading ? (heading.innerText || heading.textContent || "").replace(/\s+/g, " ").trim().slice(0, 180) : "",
      parent: parent ? elementLabel(parent) : "",
      nearby: nearby.slice(0, 260)
    };
  }

  function elementLabel(element) {
    if (!element) return "element";
    var label = element.tagName.toLowerCase();
    if (element.id) return label + "#" + element.id;
    var classes = usefulClasses(element);
    return label + (classes.length ? "." + classes.join(".") : "");
  }

  function createUi() {
    host = document.createElement("pagepatch-root");
    host.setAttribute("data-pagepatch", "root");
    shadow = host.attachShadow({ mode: "open" });
    shadow.innerHTML = "<style>" + uiCss() + "</style>" +
      '<div class="pp-overlays" aria-hidden="true"></div>' +
      '<div class="pp-hover" aria-hidden="true"><span></span></div>' +
      '<aside class="pp-panel"></aside>' +
      '<div class="pp-controls"></div>' +
      '<div class="pp-toast" role="status"></div>';
    document.documentElement.appendChild(host);
    overlayLayer = shadow.querySelector(".pp-overlays");
    hoverBox = shadow.querySelector(".pp-hover");
    controls = shadow.querySelector(".pp-controls");
    panel = shadow.querySelector(".pp-panel");
    shadow.addEventListener("click", onUiClick);
    shadow.addEventListener("submit", onUiSubmit);
    shadow.addEventListener("input", onUiInput);
    shadow.addEventListener("keydown", onUiKeydown);
    renderUi();
  }

  function uiCss() {
    return `
      :host { all: initial; position: fixed; inset: 0; z-index: 2147483647; pointer-events: none; color: #172033; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; }
      * { box-sizing: border-box; }
      button, input, textarea, select { font: inherit; }
      button { cursor: pointer; }
      .pp-controls { position: fixed; left: 50%; bottom: 20px; display: flex; align-items: center; gap: 6px; max-width: calc(100vw - 28px); padding: 7px; background: #11182a; border: 1px solid #303a51; border-radius: 16px; box-shadow: 0 18px 55px rgba(9, 14, 28, .35); color: white; pointer-events: auto; }
      .pp-controls button { min-height: 38px; padding: 0 12px; border: 0; border-radius: 10px; background: transparent; color: #dce3f3; }
      .pp-controls button:hover { background: #252f46; color: white; }
      .pp-controls button[aria-pressed="true"] { background: #f36c21; color: white; }
      .pp-controls .pp-launch { display: grid; width: 40px; padding: 0; place-items: center; background: #f36c21; }
      .pp-launch img { width: 27px; height: 27px; border-radius: 7px; }
      .pp-controls .pp-count { display: inline-flex; min-width: 20px; height: 20px; align-items: center; justify-content: center; margin-left: 5px; padding: 0 5px; border-radius: 10px; background: #39445e; font-size: 11px; }
      .pp-divider { width: 1px; height: 25px; background: #39445e; }
      .pp-preview { display: flex; align-items: center; gap: 7px; padding: 0 8px; white-space: nowrap; }
      .pp-preview input { accent-color: #7b89ff; }
      .pp-panel { position: fixed; top: 18px; right: 18px; width: 390px; max-width: calc(100vw - 36px); max-height: calc(100vh - 100px); overflow: auto; border: 1px solid #dce2ee; border-radius: 16px; background: #fff; box-shadow: 0 22px 70px rgba(13, 23, 45, .24); pointer-events: auto; }
      .pp-panel.pp-wide { width: 820px; }
      .pp-panel:empty { display: none; }
      .pp-panel-head { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 15px 17px; border-bottom: 1px solid #e6eaf1; background: rgba(255,255,255,.96); }
      .pp-panel-head strong { font-size: 15px; }
      .pp-icon { width: 32px; height: 32px; padding: 0; border: 0; border-radius: 8px; background: #eff2f8; color: #46516a; }
      .pp-content { padding: 17px; }
      .pp-route { margin: 0 0 14px; color: #6a748a; font-size: 12px; word-break: break-all; }
      .pp-empty { padding: 25px 12px; color: #778197; text-align: center; }
      .pp-list { display: grid; gap: 10px; }
      .pp-item { padding: 12px; border: 1px solid #e1e6ef; border-radius: 11px; background: #fbfcfe; cursor: pointer; transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; }
      .pp-item:hover { border-color: #aebafd; box-shadow: 0 5px 16px rgba(62,82,178,.1); transform: translateY(-1px); }
      .pp-item:focus-visible { outline: 3px solid rgba(243,108,33,.26); border-color: #f36c21; }
      .pp-item-top { display: flex; align-items: center; gap: 8px; }
      .pp-kind { padding: 3px 7px; border-radius: 6px; background: #fff0e6; color: #b9470c; font-size: 10px; font-weight: 800; text-transform: uppercase; }
      .pp-item-title { flex: 1; overflow: hidden; font-size: 12px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
      .pp-item-preview { margin: 8px 0 0 25px; color: #5e687d; font-size: 12px; white-space: pre-wrap; }
      .pp-item button { border: 0; background: transparent; color: #8892a6; }
      .pp-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px; }
      .pp-button { min-height: 38px; padding: 0 13px; border: 1px solid #d8deea; border-radius: 9px; background: #fff; color: #38445b; font-weight: 700; }
      .pp-button:hover { background: #f5f7fb; }
      .pp-primary { border-color: #dc5a13; background: #f36c21; color: #fff; }
      .pp-primary:hover { background: #d9570f; }
      .pp-danger { color: #b12943; }
      .pp-fields { display: grid; gap: 13px; }
      .pp-field { display: grid; gap: 6px; }
      .pp-field label { color: #5f6a80; font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
      .pp-field input, .pp-field textarea, .pp-field select { width: 100%; padding: 10px 11px; border: 1px solid #ccd4e1; border-radius: 9px; background: white; color: #172033; }
      .pp-field textarea { min-height: 90px; resize: vertical; }
      .pp-code { padding: 9px 10px; border-radius: 8px; background: #f0f3f8; color: #40506a; font: 12px/1.5 Consolas, monospace; word-break: break-all; }
      .pp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .pp-style-workbench { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr); gap: 14px; }
      .pp-style-column { min-width: 0; overflow: hidden; border: 1px solid #dfe4ed; border-radius: 11px; background: #f8f9fc; }
      .pp-style-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px; padding: 8px 10px; border-bottom: 1px solid #dfe4ed; background: #fff; }
      .pp-style-head strong { font-size: 12px; }
      .pp-style-head span { color: #7c8699; font-size: 11px; }
      .pp-style-copy { min-height: 30px; padding: 0 9px; border: 1px solid #d5dbe7; border-radius: 7px; background: #fff; color: #44516a; font-size: 11px; font-weight: 700; }
      .pp-computed-list { height: 410px; overflow: auto; background: #fff; }
      .pp-computed-row { display: grid; grid-template-columns: minmax(110px, .75fr) minmax(130px, 1fr) 28px; align-items: start; border-bottom: 1px solid #edf0f5; font: 11px/1.35 Consolas, monospace; }
      .pp-computed-row:hover { background: #fff7f2; }
      .pp-computed-name, .pp-computed-value { min-width: 0; padding: 7px 8px; overflow-wrap: anywhere; }
      .pp-computed-name { color: #3d4b64; font-weight: 700; }
      .pp-computed-value { color: #6a7488; }
      .pp-transfer { width: 24px; height: 24px; margin-top: 4px; padding: 0; border: 0; border-radius: 6px; background: #fff0e6; color: #b9470c; font-weight: 900; }
      .pp-transfer:hover { background: #f36c21; color: #fff; }
      .pp-css-wrap { padding: 10px; }
      .pp-css-editor { width: 100%; min-height: 410px; padding: 12px; border: 1px solid #ccd4e1; border-radius: 9px; background: #111827; color: #e6edf7; font: 12px/1.55 Consolas, monospace; resize: vertical; tab-size: 2; }
      .pp-css-editor:focus { border-color: #f36c21; outline: 2px solid rgba(243,108,33,.18); }
      .pp-seo-summary { display: grid; gap: 9px; margin-bottom: 17px; }
      .pp-stat { display: flex; justify-content: space-between; padding: 9px 11px; border-radius: 8px; background: #f3f5f9; }
      .pp-seo-tabs { position: sticky; top: 63px; z-index: 2; display: flex; gap: 5px; overflow-x: auto; padding: 9px 12px; border-bottom: 1px solid #e6eaf1; background: rgba(255,255,255,.96); }
      .pp-seo-tabs button { min-height: 34px; padding: 0 11px; border: 0; border-radius: 8px; background: transparent; color: #657086; font-size: 12px; font-weight: 800; }
      .pp-seo-tabs button[aria-pressed="true"] { background: #fff0e6; color: #b9470c; }
      .pp-seo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .pp-audit-card { padding: 14px; border: 1px solid #e0e5ee; border-radius: 11px; background: #fbfcfe; }
      .pp-audit-card strong { display: block; margin-bottom: 4px; }
      .pp-audit-card small { color: #748096; }
      .pp-ok { color: #188461; }
      .pp-warn { color: #bd6728; }
      .pp-heading-list { display: grid; gap: 7px; }
      .pp-heading-row { display: grid; grid-template-columns: 38px minmax(0,1fr) auto; align-items: center; gap: 8px; padding: 8px 9px; border: 1px solid #e1e6ef; border-radius: 9px; background: #fff; }
      .pp-seo-anchor { cursor: pointer; transition: border-color .14s ease, background .14s ease, transform .14s ease; }
      .pp-seo-anchor:hover, .pp-seo-anchor:focus-visible { border-color: #f36c21; background: #fff8f3; outline: 2px solid rgba(243,108,33,.16); outline-offset: 1px; }
      .pp-seo-anchor:active { transform: translateY(1px); }
      .pp-heading-level { color: #d9570f; font-size: 11px; font-weight: 900; }
      .pp-heading-text { overflow: hidden; color: #38445b; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
      .pp-heading-copy { min-width: 0; overflow: hidden; }
      .pp-heading-copy .pp-heading-text { display: block; }
      .pp-heading-copy small { display: block; overflow: hidden; color: #7a8497; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
      .pp-edit-link { min-height: 28px; padding: 0 9px; border: 0; border-radius: 7px; background: #eef1f7; color: #46536c; font-size: 11px; font-weight: 800; }
      .pp-audit-warning { margin: 0 0 12px; padding: 10px 12px; border-radius: 9px; background: #fff4e8; color: #95501f; font-size: 12px; }
      .pp-social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 15px; }
      .pp-social-card { overflow: hidden; border: 1px solid #dce2ec; border-radius: 12px; background: #fff; }
      .pp-social-image { display: flex; height: 155px; align-items: center; justify-content: center; overflow: hidden; background: #e9edf5; color: #7b8598; }
      .pp-social-image img { width: 100%; height: 100%; object-fit: cover; }
      .pp-social-copy { padding: 12px; }
      .pp-social-copy small { color: #7a8497; }
      .pp-social-copy strong { display: block; margin: 3px 0; }
      .pp-social-copy p { display: -webkit-box; overflow: hidden; margin: 0; color: #687389; font-size: 12px; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
      .pp-image-list { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 11px; }
      .pp-image-card { overflow: hidden; border: 1px solid #dfe4ed; border-radius: 11px; background: #fff; }
      .pp-image-thumb { display: flex; height: 120px; align-items: center; justify-content: center; overflow: hidden; background: #eef1f6; }
      .pp-image-thumb img { max-width: 100%; max-height: 100%; object-fit: contain; }
      .pp-image-info { padding: 10px; }
      .pp-image-info p { overflow: hidden; margin: 0 0 7px; color: #5f6b80; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
      .pp-badge { display: inline-flex; margin-right: 5px; padding: 2px 6px; border-radius: 5px; background: #eef1f7; color: #556178; font-size: 10px; font-weight: 800; }
      .pp-badge.pp-missing { background: #ffe8ec; color: #af3149; }
      .pp-schema-list { display: grid; gap: 13px; }
      .pp-schema-card { padding: 12px; border: 1px solid #dfe4ed; border-radius: 11px; background: #f8f9fc; }
      .pp-schema-card textarea { width: 100%; min-height: 210px; margin-top: 9px; padding: 11px; border: 1px solid #cad2df; border-radius: 8px; background: #111827; color: #e7edf7; font: 12px/1.5 Consolas, monospace; resize: vertical; }
      .pp-overlays, .pp-hover { position: fixed; inset: 0; pointer-events: none; }
      .pp-box { position: fixed; border: 1px solid var(--pp-color, rgba(243,108,33,.5)); background: var(--pp-fill, transparent); }
      .pp-box-label { position: absolute; top: -19px; right: -1px; max-width: 180px; height: 18px; overflow: hidden; padding: 1px 6px; border-radius: 4px 4px 0 0; background: var(--pp-color, #f36c21); color: white; font: 700 10px/16px Arial, sans-serif; text-overflow: ellipsis; white-space: nowrap; }
      .pp-box.pp-changed { z-index: 3; border-width: 2px; border-radius: 3px; box-shadow: 0 0 0 3px color-mix(in srgb, var(--pp-color) 18%, transparent); }
      .pp-box.pp-changed.pp-disabled { border-style: dashed; opacity: .62; }
      .pp-box.pp-changed .pp-box-label { top: auto; right: -2px; bottom: -21px; height: 20px; padding: 2px 7px; border-radius: 0 0 5px 5px; box-shadow: 0 4px 10px rgba(20,28,47,.18); }
      .pp-hover { display: none; border: 2px solid #f36c21; background: rgba(243,108,33,.06); }
      .pp-hover span { position: absolute; top: -22px; right: -2px; height: 20px; max-width: 220px; overflow: hidden; padding: 2px 7px; border-radius: 5px 5px 0 0; background: #f36c21; color: white; font: 700 11px/16px Arial, sans-serif; text-overflow: ellipsis; white-space: nowrap; }
      .pp-toast { position: fixed; left: 50%; bottom: 82px; max-width: 500px; padding: 10px 15px; border-radius: 9px; background: #151d30; color: white; opacity: 0; transform: translate(-50%, 8px); transition: .18s ease; pointer-events: none; }
      .pp-toast.pp-show { opacity: 1; transform: translate(-50%, 0); }
      .pp-toast.pp-error { background: #9f2941; }
      @media (max-width: 800px) { .pp-controls { overflow-x: auto; left: 14px; right: 14px; transform: none; } .pp-panel { top: 12px; right: 12px; max-width: calc(100vw - 24px); } .pp-style-workbench, .pp-seo-grid, .pp-social-grid { grid-template-columns: 1fr; } .pp-image-list { grid-template-columns: 1fr; } .pp-computed-list, .pp-css-editor { height: 260px; min-height: 260px; } }
    `;
  }

  function renderUi() {
    renderControls();
    renderPanel();
    localizeShadow();
    redrawOverlays();
  }

  function modeLabel(mode) {
    var labels = IS_PT ? { inspect: "Inspecionar", text: "Texto", seo: "SEO", div: "Blocos", style: "Estilo", note: "Nota" } : { inspect: "Inspect", text: "Text", seo: "SEO", div: "Div", style: "Style", note: "Note" };
    return labels[mode] || mode;
  }

  function renderControls() {
    if (!controls) return;
    var modeButtons = state.expanded ? MODES.map(function (mode) {
      return '<button type="button" data-action="mode" data-mode="' + mode + '" aria-pressed="' + (state.mode === mode) + '">' +
        modeLabel(mode) + "</button>";
    }).join("") : "";
    controls.innerHTML = '<button class="pp-launch" type="button" data-action="expand" aria-label="Toggle PagePatch"><img src="' + ICON_DATA + '" alt=""></button>' +
      modeButtons + (state.expanded ? '<span class="pp-divider"></span>' +
      '<label class="pp-preview"><input type="checkbox" data-action="preview" ' + (state.preview ? "checked" : "") + '> Preview</label>' +
      '<button type="button" data-action="import">Import</button>' +
      '<button type="button" data-action="requests">Requests <span class="pp-count">' + pageChanges().length + "</span></button>" : "");
  }

  function renderPanel() {
    if (!panel) return;
    if (!state.panel) { panel.innerHTML = ""; return; }
    if (state.panel === "editor" && state.selected) renderEditor();
    else if (state.panel === "seo") renderSeoWorkspace();
    else renderRequests();
    localizeShadow();
  }

  function panelHeader(title) {
    return '<div class="pp-panel-head"><strong>' + escapeHtml(title) + '</strong><button class="pp-icon" type="button" data-action="close-panel" aria-label="Close">×</button></div>';
  }

  function renderRequests() {
    panel.classList.remove("pp-wide");
    var changes = pageChanges();
    var activeCount = changes.filter(function (change) { return change.enabled; }).length;
    var items = changes.map(function (change) {
      var preview = change.kind === "style" ? declarationsToCss(change.after, change.priorities) : String(change.after || change.note || "");
      return '<div class="pp-item" role="button" tabindex="0" data-action="locate-change" data-id="' + change.id + '"><div class="pp-item-top">' +
        '<input type="checkbox" data-action="toggle-change" data-id="' + change.id + '" ' + (change.enabled ? "checked" : "") + ' aria-label="Enable request">' +
        '<span class="pp-kind">' + escapeHtml(change.kind) + '</span><span class="pp-item-title">' + escapeHtml(change.element.label || change.selector || "Page") + '</span>' +
        '<button type="button" data-action="delete-change" data-id="' + change.id + '" aria-label="Delete">×</button></div>' +
        '<div class="pp-item-preview">' + escapeHtml(preview.slice(0, 170)) + '</div></div>';
    }).join("");
    panel.innerHTML = panelHeader("Page request · " + changes.length) + '<div class="pp-content"><p class="pp-route">' + escapeHtml(state.route) + '</p>' +
      (state.mode === "seo" ? seoSummaryHtml() : "") +
      (items ? '<div class="pp-list">' + items + "</div>" : '<div class="pp-empty">No requests yet. Choose a mode and select something on the page.</div>') +
      '<div class="pp-actions"><button class="pp-button pp-primary" type="button" data-action="export" ' + (activeCount ? "" : "disabled") + '>Export active requests</button>' +
      (state.mode === "seo" ? '<button class="pp-button" type="button" data-action="page-seo">Edit page SEO</button>' : "") +
      '<button class="pp-button pp-danger" type="button" data-action="clear" ' + (changes.length ? "" : "disabled") + '>Clear page</button></div></div>';
  }

  function seoSummaryHtml() {
    var meta = document.querySelector('meta[name="description"]');
    var imagesMissing = document.querySelectorAll("img:not([alt]), img[alt='']").length;
    return '<div class="pp-seo-summary"><div class="pp-stat"><span>Title</span><strong>' + escapeHtml(document.title ? document.title.length + " chars" : "Missing") + '</strong></div>' +
      '<div class="pp-stat"><span>Meta description</span><strong>' + escapeHtml(meta && meta.content ? meta.content.length + " chars" : "Missing") + '</strong></div>' +
      '<div class="pp-stat"><span>H1 / H2</span><strong>' + document.querySelectorAll("h1").length + " / " + document.querySelectorAll("h2").length + '</strong></div>' +
      '<div class="pp-stat"><span>Missing image alt</span><strong>' + imagesMissing + "</strong></div></div>";
  }

  function renderSeoWorkspace() {
    panel.classList.add("pp-wide");
    var tabs = ["overview", "headings", "links", "lists", "social", "images", "schema"].map(function (view) {
      var labels = IS_PT ? { overview: "Visão geral", headings: "Cabeçalhos", links: "Links", lists: "Listas", social: "Social", images: "Imagens", schema: "Schema" } : { overview: "Overview", headings: "Headings", links: "Links", lists: "Lists", social: "Social", images: "Images", schema: "Schema" };
      return '<button type="button" data-action="seo-tab" data-view="' + view + '" aria-pressed="' + (state.seoView === view) + '">' + labels[view] + "</button>";
    }).join("");
    var content = state.seoView === "headings" ? seoHeadingsHtml() : state.seoView === "links" ? seoLinksHtml() : state.seoView === "lists" ? seoListsHtml() : state.seoView === "social" ? seoSocialHtml() :
      state.seoView === "images" ? seoImagesHtml() : state.seoView === "schema" ? seoSchemaHtml() : seoOverviewHtml();
    panel.innerHTML = panelHeader("SEO workspace") + '<nav class="pp-seo-tabs">' + tabs + '</nav><div class="pp-content">' + content + "</div>";
    localizeShadow();
  }

  function headValue(selector, attribute) {
    var element = document.querySelector(selector);
    return element ? element.getAttribute(attribute || "content") || "" : "";
  }

  function selectField(label, name, value, options) {
    return '<div class="pp-field"><label>' + escapeHtml(label) + '</label><select name="' + name + '">' + options.map(function (option) {
      var optionValue = typeof option === "string" ? option : option.value;
      var optionLabel = typeof option === "string" ? option || "Browser default" : option.label;
      return '<option value="' + escapeHtml(optionValue) + '" ' + (optionValue === value ? "selected" : "") + '>' + escapeHtml(optionLabel) + "</option>";
    }).join("") + "</select></div>";
  }

  function seoOverviewHtml() {
    var title = document.title;
    var description = headValue('meta[name="description"]');
    var canonical = headValue('link[rel="canonical"]', "href");
    var robots = headValue('meta[name="robots"]').toLowerCase();
    var referrer = headValue('meta[name="referrer"]');
    var indexValue = robots.indexOf("noindex") >= 0 ? "noindex" : "index";
    var followValue = robots.indexOf("nofollow") >= 0 ? "nofollow" : "follow";
    var h1Count = document.querySelectorAll("h1").length;
    var missingAlt = document.querySelectorAll("img:not([alt]), img[alt='']").length;
    var schemaCount = document.querySelectorAll('script[type="application/ld+json"]').length;
    var linkCount = document.querySelectorAll("a").length;
    var missingLinks = Array.from(document.querySelectorAll("a")).filter(function (link) { return !link.getAttribute("href") || !link.textContent.trim(); }).length;
    var listCount = document.querySelectorAll("ul,ol").length;
    var audit = '<div class="pp-seo-grid">' +
      auditCard("Title", title ? title.length + " characters" : "Missing", !!title && title.length <= 60) +
      auditCard("Description", description ? description.length + " characters" : "Missing", !!description && description.length <= 160) +
      auditCard("H1 headings", String(h1Count), h1Count === 1) + auditCard("Missing alt text", String(missingAlt), missingAlt === 0) +
      auditCard("Canonical", canonical || "Missing", !!canonical) + auditCard("JSON-LD blocks", String(schemaCount), schemaCount > 0) +
      auditCard("Links", linkCount + (missingLinks ? " · " + missingLinks + " need review" : ""), missingLinks === 0) + auditCard("Lists", String(listCount), true) + "</div>";
    return audit + '<form class="pp-fields" data-form="seo-overview" style="margin-top:16px">' +
      field("Page title", "input", "title", title) + field("Meta description", "textarea", "description", description) +
      field("Canonical URL", "input", "canonical", canonical) + '<div class="pp-grid">' +
      selectField("Indexing", "indexing", indexValue, ["index", "noindex"]) + selectField("Link crawling", "following", followValue, ["follow", "nofollow"]) + "</div>" +
      selectField("Referrer policy", "referrer", referrer, [
        { value: "", label: "Browser default" }, "no-referrer", "no-referrer-when-downgrade", "origin", "same-origin", "strict-origin", "strict-origin-when-cross-origin"
      ]) + '<div class="pp-actions"><button class="pp-button pp-primary" type="submit">Save SEO overview</button></div></form>';
  }

  function auditCard(label, value, okay) {
    return '<div class="pp-audit-card"><strong>' + escapeHtml(label) + '</strong><small class="' + (okay ? "pp-ok" : "pp-warn") + '">' + escapeHtml(value) + "</small></div>";
  }

  function seoHeadingsHtml() {
    var headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).filter(function (element) { return !element.closest("pagepatch-root"); });
    var warnings = [];
    var h1Count = headings.filter(function (heading) { return heading.tagName === "H1"; }).length;
    if (h1Count !== 1) warnings.push(h1Count ? "The page has " + h1Count + " H1 headings." : "The page has no H1 heading.");
    var previousLevel = 0;
    headings.forEach(function (heading) {
      var level = Number(heading.tagName.slice(1));
      if (previousLevel && level > previousLevel + 1) warnings.push("Heading level skips from H" + previousLevel + " to H" + level + ".");
      previousLevel = level;
    });
    var list = headings.map(function (heading) {
      var level = Number(heading.tagName.slice(1));
      var selector = selectorFor(heading);
      return '<div class="pp-heading-row pp-seo-anchor" role="button" tabindex="0" title="Locate on page" data-action="seo-locate" data-selector="' + escapeHtml(selector) + '" style="margin-left:' + ((level - 1) * 16) + 'px"><span class="pp-heading-level">H' + level + '</span><span class="pp-heading-text">' + escapeHtml(heading.textContent.trim() || "(empty heading)") + '</span>' +
        '<button class="pp-edit-link" type="button" data-action="seo-heading" data-selector="' + escapeHtml(selector) + '">Edit</button></div>';
    }).join("");
    return (warnings.length ? warnings.map(function (warning) { return '<p class="pp-audit-warning">' + escapeHtml(warning) + "</p>"; }).join("") : '<p class="pp-audit-warning pp-ok">Heading hierarchy has no obvious structural warnings.</p>') +
      '<div class="pp-heading-list">' + (list || '<div class="pp-empty">No headings found.</div>') + "</div>";
  }

  function seoLinksHtml() {
    var links = Array.from(document.querySelectorAll("a")).filter(function (link) { return !link.closest("pagepatch-root"); });
    var missingHref = links.filter(function (link) { return !link.getAttribute("href"); }).length;
    var missingText = links.filter(function (link) { return !link.textContent.trim() && !link.getAttribute("aria-label") && !link.querySelector("img[alt]"); }).length;
    var unsafeBlank = links.filter(function (link) { return link.target === "_blank" && !(link.rel || "").split(/\s+/).includes("noopener"); }).length;
    var warnings = [];
    if (missingHref) warnings.push(missingHref + languageText(" link(s) have no destination.", " link(s) não possuem destino."));
    if (missingText) warnings.push(missingText + languageText(" link(s) have no accessible text.", " link(s) não possuem texto acessível."));
    if (unsafeBlank) warnings.push(unsafeBlank + languageText(" new-tab link(s) are missing noopener.", " link(s) que abrem nova aba não possuem noopener."));
    var rows = links.map(function (link) {
      var href = link.getAttribute("href") || languageText("Missing destination", "Destino ausente");
      var text = link.textContent.trim() || link.getAttribute("aria-label") || languageText("Untitled link", "Link sem título");
      var selector = selectorFor(link);
      return '<div class="pp-heading-row pp-seo-anchor" role="button" tabindex="0" title="Locate on page" data-action="seo-locate" data-selector="' + escapeHtml(selector) + '"><span class="pp-heading-level">A</span><span class="pp-heading-copy"><span class="pp-heading-text">' + escapeHtml(text) + '</span><small title="' + escapeHtml(href) + '">' + escapeHtml(href) + '</small></span>' +
        '<button class="pp-edit-link" type="button" data-action="seo-link" data-selector="' + escapeHtml(selector) + '">Edit link</button></div>';
    }).join("");
    return (warnings.length ? warnings.map(function (warning) { return '<p class="pp-audit-warning">' + escapeHtml(warning) + "</p>"; }).join("") : '<p class="pp-audit-warning pp-ok">' + languageText("Links have destinations and accessible text.", "Os links possuem destinos e texto acessível.") + '</p>') +
      '<div class="pp-heading-list">' + (rows || '<div class="pp-empty">No links found.</div>') + '</div>';
  }

  function seoListsHtml() {
    var lists = Array.from(document.querySelectorAll("ul,ol")).filter(function (list) { return !list.closest("pagepatch-root"); });
    var rows = lists.map(function (list) {
      var count = Array.from(list.children).filter(function (child) { return child.tagName === "LI"; }).length;
      var preview = (list.innerText || list.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120) || languageText("Empty list", "Lista vazia");
      var selector = selectorFor(list);
      return '<div class="pp-heading-row pp-seo-anchor" role="button" tabindex="0" title="Locate on page" data-action="seo-locate" data-selector="' + escapeHtml(selector) + '"><span class="pp-heading-level">' + list.tagName + '</span><span class="pp-heading-copy"><span class="pp-heading-text">' + escapeHtml(preview) + '</span><small>' + count + languageText(count === 1 ? " item" : " items", count === 1 ? " item" : " itens") + '</small></span>' +
        '<button class="pp-edit-link" type="button" data-action="seo-list" data-selector="' + escapeHtml(selector) + '">Edit list</button></div>';
    }).join("");
    return '<div class="pp-heading-list">' + (rows || '<div class="pp-empty">No lists found.</div>') + '</div>';
  }

  function seoSocialHtml() {
    var values = {
      ogTitle: headValue('meta[property="og:title"]') || document.title,
      ogDescription: headValue('meta[property="og:description"]') || headValue('meta[name="description"]'),
      ogImage: headValue('meta[property="og:image"]'), ogUrl: headValue('meta[property="og:url"]') || location.href,
      ogType: headValue('meta[property="og:type"]') || "website",
      twitterCard: headValue('meta[name="twitter:card"]') || "summary_large_image",
      twitterTitle: headValue('meta[name="twitter:title"]') || headValue('meta[property="og:title"]') || document.title,
      twitterDescription: headValue('meta[name="twitter:description"]') || headValue('meta[property="og:description"]') || headValue('meta[name="description"]'),
      twitterImage: headValue('meta[name="twitter:image"]') || headValue('meta[property="og:image"]')
    };
    var fields = '<div class="pp-grid">' + field("Open Graph title", "input", "ogTitle", values.ogTitle) + field("Open Graph type", "input", "ogType", values.ogType) + "</div>" +
      field("Open Graph description", "textarea", "ogDescription", values.ogDescription) + field("Open Graph image URL", "input", "ogImage", values.ogImage) + field("Open Graph page URL", "input", "ogUrl", values.ogUrl) +
      selectField("X card type", "twitterCard", values.twitterCard, ["summary_large_image", "summary"]) +
      field("X title", "input", "twitterTitle", values.twitterTitle) + field("X description", "textarea", "twitterDescription", values.twitterDescription) + field("X image URL", "input", "twitterImage", values.twitterImage);
    return '<form class="pp-fields" data-form="seo-social">' + fields + socialPreviewHtml(values) +
      '<div class="pp-actions"><button class="pp-button pp-primary" type="submit">Save social metadata</button></div></form>';
  }

  function socialPreviewHtml(values) {
    return '<div class="pp-social-grid"><article class="pp-social-card"><div class="pp-social-image"><span data-social-empty="og">No social image</span><img data-social-image="og" src="' + escapeHtml(values.ogImage) + '" ' + (values.ogImage ? "" : "hidden") + '></div><div class="pp-social-copy"><small>Facebook / LinkedIn</small><strong data-social-title="og">' + escapeHtml(values.ogTitle) + '</strong><p data-social-description="og">' + escapeHtml(values.ogDescription) + '</p></div></article>' +
      '<article class="pp-social-card"><div class="pp-social-image"><span data-social-empty="twitter">No social image</span><img data-social-image="twitter" src="' + escapeHtml(values.twitterImage) + '" ' + (values.twitterImage ? "" : "hidden") + '></div><div class="pp-social-copy"><small>X preview</small><strong data-social-title="twitter">' + escapeHtml(values.twitterTitle) + '</strong><p data-social-description="twitter">' + escapeHtml(values.twitterDescription) + "</p></div></article></div>";
  }

  function updateSocialPreview(form) {
    [["og", "ogTitle", "ogDescription", "ogImage"], ["twitter", "twitterTitle", "twitterDescription", "twitterImage"]].forEach(function (entry) {
      var key = entry[0];
      var image = panel.querySelector('[data-social-image="' + key + '"]');
      var imageValue = form.elements[entry[3]].value.trim();
      panel.querySelector('[data-social-title="' + key + '"]').textContent = form.elements[entry[1]].value;
      panel.querySelector('[data-social-description="' + key + '"]').textContent = form.elements[entry[2]].value;
      panel.querySelector('[data-social-empty="' + key + '"]').hidden = !!imageValue;
      image.hidden = !imageValue;
      if (imageValue) image.src = imageValue;
    });
  }

  function seoImagesHtml() {
    var images = Array.from(document.querySelectorAll("img")).filter(function (image) { return !image.closest("pagepatch-root"); });
    var cards = images.map(function (image) {
      var selector = selectorFor(image);
      var alt = image.getAttribute("alt");
      return '<article class="pp-image-card pp-seo-anchor" role="button" tabindex="0" title="Locate on page" data-action="seo-locate" data-selector="' + escapeHtml(selector) + '"><div class="pp-image-thumb"><img src="' + escapeHtml(image.currentSrc || image.src) + '" alt=""></div><div class="pp-image-info"><p title="' + escapeHtml(image.currentSrc || image.src) + '">' + escapeHtml(image.currentSrc || image.src) + '</p>' +
        '<span class="pp-badge ' + (alt ? "" : "pp-missing") + '">' + escapeHtml(alt ? "ALT: " + alt : "ALT MISSING") + '</span><span class="pp-badge">' + (image.naturalWidth || image.width) + "×" + (image.naturalHeight || image.height) + '</span>' +
        '<div class="pp-actions"><button class="pp-edit-link" type="button" data-action="seo-image" data-selector="' + escapeHtml(selector) + '">Edit alt text</button></div></div></article>';
    }).join("");
    return '<div class="pp-image-list">' + (cards || '<div class="pp-empty">No images found.</div>') + "</div>";
  }

  function seoSchemaHtml() {
    var schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    var cards = schemas.map(function (script, index) {
      var text = script.textContent.trim();
      var type = "Unknown schema";
      try {
        var parsed = JSON.parse(text); type = parsed["@type"] || (parsed["@graph"] ? "@graph" : "JSON-LD"); text = JSON.stringify(parsed, null, 2);
      } catch (_) { type = "Invalid JSON-LD"; }
      return schemaCardHtml(index, selectorFor(script), type, text, false);
    });
    for (var draftIndex = 0; draftIndex < state.schemaDrafts; draftIndex += 1) cards.push(schemaCardHtml(schemas.length + draftIndex, "", "New JSON-LD", '{\n  "@context": "https://schema.org",\n  "@type": "Organization"\n}', true));
    return '<form data-form="seo-schema"><div class="pp-schema-list">' + (cards.join("") || '<div class="pp-empty">No JSON-LD blocks found.</div>') + '</div><div class="pp-actions"><button class="pp-button" type="button" data-action="schema-add">Add schema block</button><button class="pp-button pp-primary" type="submit">Save schema</button></div></form>';
  }

  function schemaCardHtml(index, selector, type, text, isNew) {
    return '<section class="pp-schema-card"><strong>' + escapeHtml(type) + '</strong><input type="hidden" name="schemaSelector' + index + '" value="' + escapeHtml(selector) + '"><input type="hidden" name="schemaNew' + index + '" value="' + (isNew ? "1" : "0") + '">' +
      '<textarea name="schemaValue' + index + '" spellcheck="false">' + escapeHtml(text) + "</textarea></section>";
  }

  function openSeoElement(selector) {
    var element;
    try { element = document.querySelector(selector); } catch (_) { element = null; }
    if (!element) { announce("The selected element is no longer on the page.", true); return; }
    revealElement(element, function () {
      try { return document.querySelector(selector); } catch (_) { return null; }
    });
    state.selected = element; state.panel = "editor"; renderPanel();
  }

  function renderEditor() {
    var element = state.selected;
    var mode = state.mode;
    var selector = selectorFor(element);
    var title = mode.charAt(0).toUpperCase() + mode.slice(1) + " · " + elementLabel(element);
    var fields = '<div class="pp-code">' + escapeHtml(selector) + "</div>";
    var existingElementChange = pageChanges().find(function (change) { return change.selector === selector && change.kind === mode; });
    var existingNote = existingElementChange ? existingElementChange.note || "" : "";
    panel.classList.toggle("pp-wide", mode === "style");

    if (mode === "text") {
      fields += field("Requested text", "textarea", "value", element.textContent.trim());
    } else if (mode === "style") {
      var entries = computedStyleEntries(element);
      var existingStyle = pageChanges().find(function (change) { return change.selector === selector && change.property === "style"; });
      var requestedCss = existingStyle ? declarationsToCss(existingStyle.after, existingStyle.priorities) : "";
      existingNote = existingStyle ? existingStyle.note || "" : "";
      var rows = entries.map(function (entry) {
        return '<div class="pp-computed-row"><span class="pp-computed-name">' + escapeHtml(entry.property) + '</span><span class="pp-computed-value">' + escapeHtml(entry.value) + '</span>' +
          '<button class="pp-transfer" type="button" data-action="style-add" data-property="' + escapeHtml(entry.property) + '" data-value="' + escapeHtml(entry.value) + '" title="Add this property to requested CSS" aria-label="Add ' + escapeHtml(entry.property) + '">›</button></div>';
      }).join("");
      fields += '<div class="pp-style-workbench"><section class="pp-style-column"><div class="pp-style-head"><div><strong>Computed styles</strong><br><span>' + entries.length + ' properties · read-only</span></div>' +
        '<button class="pp-style-copy" type="button" data-action="style-copy-all">Copy all</button></div><div class="pp-computed-list">' + rows + '</div></section>' +
        '<section class="pp-style-column"><div class="pp-style-head"><div><strong>Requested overrides</strong><br><span>Editable CSS declarations</span></div></div><div class="pp-css-wrap">' +
        '<textarea class="pp-css-editor" name="css" spellcheck="false" placeholder="color: #111827;\nfont-size: 42px;">' + escapeHtml(requestedCss) + '</textarea></div></section></div>';
    } else if (mode === "seo") {
      var seo = seoProperty(element);
      if (element.tagName === "A") {
        fields += field("Link text", "textarea", "value", seo.value) + field("Destination URL", "input", "href", element.getAttribute("href") || "");
      } else if (/^(UL|OL)$/.test(element.tagName)) {
        fields += '<div class="pp-field"><label>Requested list type</label><select name="semanticTag"><option value="">' + languageText("Keep ", "Manter ") + element.tagName + '</option><option value="' + (element.tagName === "UL" ? "OL" : "UL") + '">' + (element.tagName === "UL" ? "OL" : "UL") + '</option></select></div>';
      } else {
        fields += field(seo.label, "textarea", "value", seo.value);
      }
      if (/^(H[1-6]|P|SPAN)$/.test(element.tagName)) {
        fields += '<div class="pp-field"><label>Requested semantic element</label><select name="semanticTag"><option value="">' + languageText("Keep ", "Manter ") + element.tagName + '</option>' +
          ["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN"].filter(function (tag) { return tag !== element.tagName; }).map(function (tag) {
            return '<option value="' + tag + '">' + tag + "</option>";
          }).join("") + "</select></div>";
      }
    } else if (mode === "note") {
      fields += field("Request", "textarea", "value", "");
    } else {
      var rect = element.getBoundingClientRect();
      fields += '<div class="pp-seo-summary"><div class="pp-stat"><span>Size</span><strong>' + Math.round(rect.width) + " × " + Math.round(rect.height) + '</strong></div>' +
        '<div class="pp-stat"><span>Display</span><strong>' + escapeHtml(getComputedStyle(element).display) + '</strong></div></div>';
    }

    if (mode !== "inspect") fields += field("Reason or implementation note", "textarea", "note", existingNote);
    panel.innerHTML = panelHeader(title) + '<div class="pp-content"><form class="pp-fields" data-form="change">' + fields +
      (mode !== "inspect" ? '<div class="pp-actions"><button class="pp-button pp-primary" type="submit">Save request</button></div>' : "") + "</form></div>";
  }

  function field(label, type, name, value) {
    var control = type === "textarea" ? '<textarea name="' + name + '">' + escapeHtml(value) + "</textarea>" :
      '<input name="' + name + '" value="' + escapeHtml(value) + '">';
    return '<div class="pp-field"><label>' + escapeHtml(label) + "</label>" + control + "</div>";
  }

  function seoProperty(element) {
    if (element.tagName === "IMG") return { property: "attr:alt", label: "Image alt text", value: element.getAttribute("alt") || "" };
    if (element.tagName === "A") return { property: "textContent", label: "Link text", value: element.textContent.trim() };
    if (/^(UL|OL)$/.test(element.tagName)) return { property: "semantic-tag", label: "List type", value: element.tagName };
    return { property: "textContent", label: element.tagName + " content", value: element.textContent.trim() };
  }

  function computedStyleEntries(element) {
    if (!element) return [];
    var computed = getComputedStyle(element);
    return Array.from(computed).sort(function (left, right) {
      var leftVendor = left.charAt(0) === "-" ? 1 : 0;
      var rightVendor = right.charAt(0) === "-" ? 1 : 0;
      return leftVendor - rightVendor || left.localeCompare(right);
    }).map(function (property) {
      return { property: property, value: computed.getPropertyValue(property).trim() };
    });
  }

  function computedCssText(element) {
    return computedStyleEntries(element).map(function (entry) {
      return entry.property + ": " + entry.value + ";";
    }).join("\n");
  }

  function addComputedStyle(property, value) {
    var textarea = panel.querySelector('textarea[name="css"]');
    if (!textarea) return;
    var declaration = property + ": " + value + ";";
    var lines = textarea.value ? textarea.value.split("\n") : [];
    var existingIndex = lines.findIndex(function (line) { return line.trim().indexOf(property + ":") === 0; });
    if (existingIndex >= 0) lines[existingIndex] = declaration;
    else lines.push(declaration);
    textarea.value = lines.filter(function (line, index) { return line || index < lines.length - 1; }).join("\n");
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { announce("Computed styles copied"); }).catch(function () { fallbackCopy(text); });
    } else fallbackCopy(text);
  }

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;left:-9999px;top:0;";
    document.body.appendChild(textarea);
    textarea.select();
    var copied = false;
    try { copied = document.execCommand("copy"); } catch (_) {}
    textarea.remove();
    announce(copied ? "Computed styles copied" : "Copy was blocked by the browser", !copied);
  }

  function parseDeclarations(cssText) {
    var source = cssText.trim();
    var openBrace = source.indexOf("{");
    var closeBrace = source.lastIndexOf("}");
    if (openBrace >= 0 && closeBrace > openBrace) source = source.slice(openBrace + 1, closeBrace);
    var probe = document.createElement("div");
    probe.style.cssText = source;
    var declarations = {};
    var priorities = {};
    Array.from(probe.style).forEach(function (property) {
      declarations[property] = probe.style.getPropertyValue(property).trim();
      var priority = probe.style.getPropertyPriority(property);
      if (priority) priorities[property] = priority;
    });
    return { declarations: declarations, priorities: priorities };
  }

  function onUiClick(event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    var action = target.dataset.action;
    if (action === "style-add") { addComputedStyle(target.dataset.property, target.dataset.value); return; }
    if (action === "style-copy-all") { copyText(computedCssText(state.selected)); return; }
    if (action === "expand") state.expanded = !state.expanded;
    if (action === "mode") {
      restoreDraft();
      state.mode = target.dataset.mode;
      state.selected = null;
      state.panel = state.mode === "seo" ? "seo" : "requests";
    }
    if (action === "requests") { restoreDraft(); state.panel = state.panel === "requests" ? null : "requests"; }
    if (action === "close-panel") { restoreDraft(); state.panel = null; }
    if (action === "preview") {
      restoreDraft();
      state.preview = target.checked;
      if (state.preview) applyAll(); else restoreAll();
    }
    if (action === "toggle-change") toggleChange(target.dataset.id, target.checked);
    if (action === "delete-change") deleteChange(target.dataset.id);
    if (action === "locate-change") { locateChange(target.dataset.id); return; }
    if (action === "import") { chooseImportFile(); return; }
    if (action === "export") exportPage();
    if (action === "clear") clearPage();
    if (action === "page-seo") { renderPageSeoEditor(); return; }
    if (action === "seo-tab") { state.seoView = target.dataset.view; state.panel = "seo"; renderUi(); return; }
    if (action === "seo-locate") { locateSeoElement(target.dataset.selector); return; }
    if (action === "seo-heading" || action === "seo-image" || action === "seo-link" || action === "seo-list") { openSeoElement(target.dataset.selector); return; }
    if (action === "schema-add") { state.schemaDrafts += 1; renderSeoWorkspace(); return; }
    renderUi();
  }

  function onUiKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var target = event.target.closest('[data-action="locate-change"],[data-action="seo-locate"]');
    if (!target || event.target !== target) return;
    event.preventDefault();
    if (target.dataset.action === "seo-locate") locateSeoElement(target.dataset.selector);
    else locateChange(target.dataset.id);
  }

  function revealElement(target, resolver) {
    if (!target || !target.getBoundingClientRect) return false;
    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    state.selected = target;
    setTimeout(function () {
      if (!target.isConnected && resolver) target = resolver() || target;
      if (target.animate) target.animate([
        { outline: "0 solid rgba(243,108,33,0)", boxShadow: "0 0 0 0 rgba(243,108,33,0)" },
        { outline: "4px solid #f36c21", boxShadow: "0 0 0 12px rgba(243,108,33,.24)" },
        { outline: "2px solid #f36c21", boxShadow: "0 0 0 4px rgba(243,108,33,.14)" },
        { outline: "0 solid rgba(243,108,33,0)", boxShadow: "0 0 0 0 rgba(243,108,33,0)" }
      ], { duration: 1300, iterations: 2, easing: "ease-in-out" });
      queueRedraw();
    }, 350);
    return true;
  }

  function locateSeoElement(selector) {
    var element;
    try { element = document.querySelector(selector); } catch (_) { element = null; }
    if (!revealElement(element, function () {
      try { return document.querySelector(selector); } catch (_) { return null; }
    })) announce("The selected element is no longer on the page.", true);
  }

  function locateChange(id) {
    var change = state.allChanges.find(function (item) { return item.id === id; });
    if (!change) return;
    var target = targetForChange(change);
    if (!target || target === document.head || !target.getBoundingClientRect) {
      announce("This request changes page metadata and has no visible target.", true);
      return;
    }
    revealElement(target, function () { return targetForChange(change); });
  }

  function onUiSubmit(event) {
    event.preventDefault();
    if (event.target.dataset.form === "change") saveEditorRequest(new FormData(event.target));
    if (event.target.dataset.form === "page-seo") savePageSeo(new FormData(event.target));
    if (event.target.dataset.form === "seo-overview") saveSeoOverview(new FormData(event.target));
    if (event.target.dataset.form === "seo-social") saveSeoSocial(new FormData(event.target));
    if (event.target.dataset.form === "seo-schema") saveSeoSchema(new FormData(event.target));
  }

  function onUiInput(event) {
    if (event.target.closest('[data-form="seo-social"]')) updateSocialPreview(event.target.form);
    if (!state.selected || event.target.name !== "value" || (state.mode !== "text" && state.mode !== "seo")) return;
    var property = state.mode === "seo" ? seoProperty(state.selected).property : "textContent";
    if (property !== "textContent" && property !== "attr:alt") return;
    if (!state.draft) {
      state.draft = {
        selector: selectorFor(state.selected), element: state.selected, property: property,
        before: property === "textContent" ? state.selected.textContent : state.selected.getAttribute("alt") || "",
        value: event.target.value
      };
    } else state.draft.value = event.target.value;
    applyDraft();
  }

  function renderPageSeoEditor() {
    var meta = document.querySelector('meta[name="description"]');
    state.panel = "custom";
    panel.classList.remove("pp-wide");
    panel.innerHTML = panelHeader("Page SEO") + '<div class="pp-content"><form class="pp-fields" data-form="page-seo">' +
      field("Page title", "input", "title", document.title) + field("Meta description", "textarea", "description", meta ? meta.content : "") +
      '<div class="pp-actions"><button class="pp-button pp-primary" type="submit">Save page SEO</button></div></form></div>';
    localizeShadow();
  }

  function savePageSeo(data) {
    upsertChange({ kind: "seo", selector: "title", property: "document-title", before: document.title, after: String(data.get("title") || "").trim(), note: "", element: { tag: "title", label: "Page title", classes: [], text: document.title } });
    var meta = document.querySelector('meta[name="description"]');
    upsertChange({ kind: "seo", selector: 'meta[name="description"]', property: "meta-description", before: meta ? meta.content : "", after: String(data.get("description") || "").trim(), note: "", element: { tag: "meta", label: "Meta description", classes: [], text: meta ? meta.content : "" } });
    afterSave("Page SEO saved");
  }

  function saveSeoOverview(data) {
    var title = String(data.get("title") || "").trim();
    var description = String(data.get("description") || "").trim();
    var canonical = String(data.get("canonical") || "").trim();
    var robots = String(data.get("indexing") || "index") + ", " + String(data.get("following") || "follow");
    var referrer = String(data.get("referrer") || "").trim();
    if (document.title !== title) upsertChange({ kind: "seo", selector: "title", property: "document-title", before: document.title, after: title, note: "", element: pageElement("Page title", document.title) });
    saveHeadContent("Meta description", 'meta[name="description"]', { tag: "meta", key: "name", keyValue: "description", attribute: "content" }, headValue('meta[name="description"]'), description);
    saveHeadContent("Canonical URL", 'link[rel="canonical"]', { tag: "link", key: "rel", keyValue: "canonical", attribute: "href", removeWhenEmpty: true }, headValue('link[rel="canonical"]', "href"), canonical);
    var robotsBefore = headValue('meta[name="robots"]');
    if (robotsBefore || robots !== "index, follow") saveHeadContent("Robots directives", 'meta[name="robots"]', { tag: "meta", key: "name", keyValue: "robots", attribute: "content" }, robotsBefore, robots);
    saveHeadContent("Referrer policy", 'meta[name="referrer"]', { tag: "meta", key: "name", keyValue: "referrer", attribute: "content", removeWhenEmpty: true }, headValue('meta[name="referrer"]'), referrer);
    state.panel = "seo"; state.seoView = "overview"; renderUi(); announce("SEO overview saved");
  }

  function pageElement(label, text) {
    return { tag: "head", label: label, classes: [], text: text || "" };
  }

  function saveHeadContent(label, selector, head, before, after) {
    if (before === after) return;
    upsertChange({ kind: "seo", selector: selector, property: "head-content", head: head, before: before, after: after, note: "", element: pageElement(label, before) });
  }

  function saveSeoSocial(data) {
    var fields = [
      ["Open Graph title", 'meta[property="og:title"]', "property", "og:title", "ogTitle"],
      ["Open Graph description", 'meta[property="og:description"]', "property", "og:description", "ogDescription"],
      ["Open Graph image", 'meta[property="og:image"]', "property", "og:image", "ogImage"],
      ["Open Graph URL", 'meta[property="og:url"]', "property", "og:url", "ogUrl"],
      ["Open Graph type", 'meta[property="og:type"]', "property", "og:type", "ogType"],
      ["X card type", 'meta[name="twitter:card"]', "name", "twitter:card", "twitterCard"],
      ["X title", 'meta[name="twitter:title"]', "name", "twitter:title", "twitterTitle"],
      ["X description", 'meta[name="twitter:description"]', "name", "twitter:description", "twitterDescription"],
      ["X image", 'meta[name="twitter:image"]', "name", "twitter:image", "twitterImage"]
    ];
    fields.forEach(function (fieldDefinition) {
      var before = headValue(fieldDefinition[1]);
      var after = String(data.get(fieldDefinition[4]) || "").trim();
      saveHeadContent(fieldDefinition[0], fieldDefinition[1], { tag: "meta", key: fieldDefinition[2], keyValue: fieldDefinition[3], attribute: "content", removeWhenEmpty: true }, before, after);
    });
    state.panel = "seo"; state.seoView = "social"; renderUi(); announce("Social metadata saved");
  }

  function saveSeoSchema(data) {
    var entries = [];
    for (var index = 0; data.has("schemaValue" + index); index += 1) {
      var raw = String(data.get("schemaValue" + index) || "").trim();
      if (!raw) continue;
      var parsed;
      try { parsed = JSON.parse(raw); } catch (error) { announce("Schema block " + (index + 1) + " contains invalid JSON.", true); return; }
      entries.push({ index: index, value: JSON.stringify(parsed, null, 2), selector: String(data.get("schemaSelector" + index) || ""), isNew: data.get("schemaNew" + index) === "1" });
    }
    entries.forEach(function (entry) {
      var selector = entry.selector;
      var before = "";
      var create = entry.isNew;
      if (!selector) selector = 'script[data-pagepatch-schema="' + uid() + '"]';
      else {
        var existing = document.querySelector(selector);
        before = existing ? existing.textContent.trim() : "";
      }
      if (before === entry.value && !create) return;
      upsertChange({ kind: "seo", selector: selector, property: "jsonld", create: create, before: before, after: entry.value, note: "", element: pageElement("JSON-LD schema", before) });
    });
    state.schemaDrafts = 0; state.panel = "seo"; state.seoView = "schema"; renderUi(); announce("JSON-LD schema saved");
  }

  function saveEditorRequest(data) {
    var element = state.selected;
    if (!element) return;
    var mode = state.mode;
    var value = String(data.get("value") || "").trim();
    var note = String(data.get("note") || "").trim();
    var draftBefore = state.draft ? state.draft.before : null;
    var draftSelector = state.draft ? state.draft.selector : "";
    restoreDraft();
    if (!element.isConnected && draftSelector) element = document.querySelector(draftSelector) || element;
    var record = { kind: mode, selector: selectorFor(element), note: note, element: describeElement(element) };

    if (mode === "text") {
      record.property = "textContent"; record.before = draftBefore !== null ? draftBefore : element.textContent.trim(); record.after = value;
    } else if (mode === "seo") {
      var seo = seoProperty(element);
      var semanticTag = String(data.get("semanticTag") || "");
      if (element.tagName === "A") {
        var beforeText = draftBefore !== null ? draftBefore : seo.value;
        var beforeHref = element.getAttribute("href") || "";
        var afterHref = String(data.get("href") || "").trim();
        var savedLinkChange = false;
        if (beforeText !== value) {
          upsertChange(Object.assign({}, record, { property: "textContent", before: beforeText, after: value }));
          savedLinkChange = true;
        }
        if (beforeHref !== afterHref) {
          upsertChange(Object.assign({}, record, { property: "attr:href", before: beforeHref, after: afterHref, note: savedLinkChange ? "" : note }));
          savedLinkChange = true;
        }
        if (!savedLinkChange && note) upsertChange(Object.assign({}, record, { kind: "note", property: "note", before: "", after: note, note: "" }));
        else if (!savedLinkChange) { announce("Change something or write a note before saving.", true); return; }
        afterSave("Request saved");
        return;
      }
      if (/^(UL|OL)$/.test(element.tagName)) {
        if (semanticTag && semanticTag !== element.tagName) {
          record.property = "semantic-tag"; record.before = element.tagName; record.after = semanticTag;
        } else if (note) {
          record.kind = "note"; record.property = "note"; record.before = ""; record.after = note; record.note = "";
        } else { announce("Change something or write a note before saving.", true); return; }
      } else {
        record.property = seo.property; record.before = draftBefore !== null ? draftBefore : seo.value; record.after = value;
        if (semanticTag && semanticTag !== element.tagName) record.semanticTag = semanticTag;
      }
    } else if (mode === "style") {
      var parsed = parseDeclarations(String(data.get("css") || ""));
      if (!Object.keys(parsed.declarations).length) { announce("Add at least one valid CSS declaration.", true); return; }
      record.property = "style"; record.before = {}; record.after = parsed.declarations; record.priorities = parsed.priorities;
      record.cssText = String(data.get("css") || "").trim();
      var computed = getComputedStyle(element);
      Object.keys(record.after).forEach(function (property) { record.before[property] = computed.getPropertyValue(property).trim(); });
    } else if (mode === "note") {
      if (!value) { announce("Write the request before saving.", true); return; }
      record.property = "note"; record.before = ""; record.after = value;
    } else if (mode === "div") {
      if (!note) { announce("Describe the requested container or layout change.", true); return; }
      record.property = "note"; record.before = ""; record.after = note; record.note = "";
    }
    if ((mode === "text" || mode === "seo") && record.property !== "note" && record.before === record.after && !record.semanticTag) {
      if (!note) { announce("Change something or write a note before saving.", true); return; }
      record.kind = "note"; record.property = "note"; record.before = ""; record.after = note; record.note = "";
    }
    upsertChange(record);
    afterSave("Request saved");
  }

  function upsertChange(record) {
    var existing = state.allChanges.find(function (change) {
      var legacyDivNote = record.kind === "div" && record.property === "note" && change.kind === "div" && !change.property;
      return change.route === state.route && change.selector === record.selector && (change.property === record.property || legacyDivNote);
    });
    if (existing) {
      if (record.property === "style") {
        restoreChange(existing);
        var styleTarget = findTarget(existing);
        if (styleTarget) {
          var restoredComputed = getComputedStyle(styleTarget);
          Object.keys(record.after).forEach(function (property) { record.before[property] = restoredComputed.getPropertyValue(property).trim(); });
        }
      }
      existing.kind = record.kind; existing.property = record.property; existing.after = record.after; existing.note = record.note; existing.element = record.element || existing.element; existing.enabled = true;
      if (record.property === "style") { existing.before = record.before; existing.priorities = record.priorities; existing.cssText = record.cssText; }
      if (record.kind === "seo" && record.property === "textContent") existing.semanticTag = record.semanticTag || "";
    } else {
      state.allChanges.push(Object.assign({
        id: uid(), route: state.route, url: location.href, enabled: true,
        createdAt: new Date().toISOString(), viewport: { width: innerWidth, height: innerHeight }
      }, record));
    }
    saveChanges();
    if (state.preview) applyAll();
  }

  function afterSave(message) {
    state.selected = null; state.panel = state.mode === "seo" ? "seo" : "requests"; renderUi(); announce(message);
  }

  function applyDraft() {
    var draft = state.draft;
    if (!draft || !state.preview) return;
    var target = draft.element && draft.element.isConnected ? draft.element : document.querySelector(draft.selector);
    if (!target) return;
    draft.element = target;
    if (draft.property === "textContent" && target.textContent !== draft.value) target.textContent = draft.value;
    if (draft.property === "attr:alt" && target.getAttribute("alt") !== draft.value) target.setAttribute("alt", draft.value);
  }

  function restoreDraft() {
    var draft = state.draft;
    if (!draft) return;
    var target = draft.element && draft.element.isConnected ? draft.element : document.querySelector(draft.selector);
    if (target) {
      if (draft.property === "textContent") target.textContent = draft.before;
      if (draft.property === "attr:alt") target.setAttribute("alt", draft.before);
    }
    state.draft = null;
  }

  function toggleChange(id, enabled) {
    var change = state.allChanges.find(function (item) { return item.id === id; });
    if (!change) return;
    if (!enabled) restoreChange(change);
    change.enabled = enabled;
    saveChanges();
    if (state.preview && enabled) applyChange(change);
  }

  function deleteChange(id) {
    var change = state.allChanges.find(function (item) { return item.id === id; });
    if (!change) return;
    var label = requestTitle(change) + " — " + readableElement(change);
    if (!confirm(languageText("Delete this request?\n\n", "Excluir esta solicitação?\n\n") + label + languageText("\n\nThis cannot be undone unless you import a previous export.", "\n\nIsso não poderá ser desfeito, a menos que você importe uma exportação anterior."))) return;
    restoreChange(change);
    state.allChanges = state.allChanges.filter(function (item) { return item.id !== id; });
    state.runtimeOriginals.delete(id);
    saveChanges();
  }

  function clearPage() {
    if (!pageChanges().length || !confirm(languageText("Delete every saved request for ", "Excluir todas as solicitações salvas de ") + state.route + "?")) return;
    pageChanges().forEach(restoreChange);
    state.allChanges = state.allChanges.filter(function (change) { return change.route !== state.route; });
    saveChanges();
    renderUi();
  }

  function findTarget(change) {
    try { return document.querySelector(change.selector); } catch (_) { return null; }
  }

  function targetForChange(change) {
    var runtime = state.runtimeOriginals.get(change.id);
    if (runtime && runtime.element && runtime.element.isConnected) return runtime.element;
    return findTarget(change);
  }

  function applyAll() {
    if (!state.preview || state.applying) return;
    state.applying = true;
    pageChanges().filter(function (change) { return change.enabled; }).forEach(applyChange);
    state.applying = false;
  }

  function applyChange(change) {
    if (!change.enabled || change.property === "note") return;
    var target = targetForChange(change);
    if (change.property === "document-title") {
      if (!state.runtimeOriginals.has(change.id)) state.runtimeOriginals.set(change.id, { value: document.title });
      if (document.title !== change.after) document.title = change.after;
      return;
    }
    if (change.property === "meta-description") {
      var meta = target;
      if (!state.runtimeOriginals.has(change.id)) state.runtimeOriginals.set(change.id, { existed: !!meta, value: meta ? meta.content : "" });
      if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
      if (meta.content !== change.after) meta.content = change.after;
      return;
    }
    if (change.property === "head-content") {
      var headRuntime = state.runtimeOriginals.get(change.id);
      if (!headRuntime) {
        headRuntime = { existed: !!target, value: target ? target.getAttribute(change.head.attribute) || "" : "", element: target };
        state.runtimeOriginals.set(change.id, headRuntime);
      }
      if (!change.after && change.head.removeWhenEmpty) {
        if (target) target.remove();
        return;
      }
      if (!target) {
        target = document.createElement(change.head.tag);
        target.setAttribute(change.head.key, change.head.keyValue);
        document.head.appendChild(target);
        headRuntime.element = target;
      }
      if (target.getAttribute(change.head.attribute) !== change.after) target.setAttribute(change.head.attribute, change.after);
      return;
    }
    if (change.property === "jsonld") {
      var schemaRuntime = state.runtimeOriginals.get(change.id);
      if (!schemaRuntime) {
        schemaRuntime = { existed: !!target, value: target ? target.textContent : "", element: target };
        state.runtimeOriginals.set(change.id, schemaRuntime);
      }
      if (!target && change.create) {
        target = document.createElement("script");
        target.type = "application/ld+json";
        var schemaIdMatch = change.selector.match(/data-pagepatch-schema="([^"]+)"/);
        if (schemaIdMatch) target.setAttribute("data-pagepatch-schema", schemaIdMatch[1]);
        document.head.appendChild(target);
        schemaRuntime.element = target;
      }
      if (target && target.textContent !== change.after) target.textContent = change.after;
      return;
    }
    if (!target) return;
    if (change.property === "semantic-tag") {
      var currentSemanticRuntime = state.runtimeOriginals.get(change.id);
      if (!currentSemanticRuntime || !currentSemanticRuntime.element || (!currentSemanticRuntime.element.isConnected && target !== currentSemanticRuntime.element)) {
        state.runtimeOriginals.set(change.id, { element: target, originalElement: target });
      }
      var semanticRuntime = state.runtimeOriginals.get(change.id);
      if (target.tagName !== change.after) {
        var semanticReplacement = document.createElement(change.after.toLowerCase());
        Array.from(target.attributes).forEach(function (attribute) { semanticReplacement.setAttribute(attribute.name, attribute.value); });
        semanticReplacement.innerHTML = target.innerHTML;
        target.replaceWith(semanticReplacement);
        semanticRuntime.element = semanticReplacement;
      }
    } else if (change.property === "textContent") {
      var existingTextRuntime = state.runtimeOriginals.get(change.id);
      if (!existingTextRuntime || !existingTextRuntime.element || !existingTextRuntime.element.isConnected) {
        state.runtimeOriginals.set(change.id, { value: change.before !== undefined ? change.before : target.textContent, element: target, originalElement: target });
      }
      var textRuntime = state.runtimeOriginals.get(change.id);
      if (change.semanticTag && target.tagName !== change.semanticTag) {
        var replacement = document.createElement(change.semanticTag.toLowerCase());
        Array.from(target.attributes).forEach(function (attribute) { replacement.setAttribute(attribute.name, attribute.value); });
        replacement.innerHTML = target.innerHTML;
        target.replaceWith(replacement);
        textRuntime.element = replacement;
        target = replacement;
      }
      if (target.textContent !== change.after) target.textContent = change.after;
    } else if (change.property.indexOf("attr:") === 0) {
      var attr = change.property.slice(5);
      if (!state.runtimeOriginals.has(change.id)) state.runtimeOriginals.set(change.id, { existed: target.hasAttribute(attr), value: target.getAttribute(attr) });
      if (target.getAttribute(attr) !== change.after) target.setAttribute(attr, change.after);
    } else if (change.property === "style") {
      if (!state.runtimeOriginals.has(change.id)) {
        var original = {};
        Object.keys(change.after).forEach(function (property) { original[property] = { value: target.style.getPropertyValue(property), priority: target.style.getPropertyPriority(property) }; });
        state.runtimeOriginals.set(change.id, original);
      }
      Object.keys(change.after).forEach(function (property) {
        if (target.style.getPropertyValue(property) !== change.after[property] || target.style.getPropertyPriority(property) !== ((change.priorities || {})[property] || "")) {
          target.style.setProperty(property, change.after[property], (change.priorities || {})[property] || "");
        }
      });
    }
  }

  function restoreAll() {
    pageChanges().slice().reverse().forEach(restoreChange);
  }

  function restoreChange(change) {
    var original = state.runtimeOriginals.get(change.id);
    if (!original) return;
    if (change.property === "document-title") document.title = original.value;
    else if (change.property === "meta-description") {
      var meta = findTarget(change);
      if (meta && !original.existed) meta.remove(); else if (meta) meta.content = original.value;
    } else if (change.property === "head-content") {
      var headElement = original.element;
      if (original.existed) {
        if (!headElement.isConnected) document.head.appendChild(headElement);
        headElement.setAttribute(change.head.attribute, original.value);
      } else if (headElement && headElement.isConnected) headElement.remove();
    } else if (change.property === "jsonld") {
      var schemaElement = original.element;
      if (original.existed) {
        if (!schemaElement.isConnected) document.head.appendChild(schemaElement);
        schemaElement.textContent = original.value;
      } else if (schemaElement && schemaElement.isConnected) schemaElement.remove();
    } else {
      var target = targetForChange(change);
      if (!target) return;
      if (change.property === "semantic-tag") {
        if (original.originalElement && target !== original.originalElement) target.replaceWith(original.originalElement);
      } else if (change.property === "textContent") {
        if (original.originalElement && target !== original.originalElement) {
          target.replaceWith(original.originalElement);
          target = original.originalElement;
        }
        target.textContent = original.value;
      }
      else if (change.property.indexOf("attr:") === 0) {
        var attr = change.property.slice(5);
        if (original.existed) target.setAttribute(attr, original.value); else target.removeAttribute(attr);
      } else if (change.property === "style") {
        Object.keys(original).forEach(function (property) {
          if (original[property].value) target.style.setProperty(property, original[property].value, original[property].priority);
          else target.style.removeProperty(property);
        });
      }
    }
    state.runtimeOriginals.delete(change.id);
  }

  function onDocumentMove(event) {
    if (!state.running || event.composedPath().indexOf(host) >= 0) return;
    var target = document.elementFromPoint(event.clientX, event.clientY);
    if (!target || target === host || target.closest && target.closest("pagepatch-root")) return;
    if (state.mode === "div") target = target.closest("div,section,main,header,footer,article,nav,aside") || target;
    if (state.mode === "text" || state.mode === "seo") target = target.closest("h1,h2,h3,h4,h5,h6,p,span,a,button,label,ul,ol,li,img") || target;
    state.hovered = target;
    drawHover(target);
  }

  function onDocumentClick(event) {
    if (!state.running || event.composedPath().indexOf(host) >= 0) return;
    var target = event.target;
    if (state.mode === "div") target = target.closest("div,section,main,header,footer,article,nav,aside") || target;
    if (state.mode === "text" || state.mode === "seo") target = target.closest("h1,h2,h3,h4,h5,h6,p,span,a,button,label,ul,ol,li,img") || target;
    if (!target || !target.tagName || target === document.body || target === document.documentElement) return;
    event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
    restoreDraft();
    state.selected = target;
    state.panel = "editor";
    renderPanel();
  }

  function drawHover(element) {
    if (!hoverBox || !visible(element)) { if (hoverBox) hoverBox.style.display = "none"; return; }
    var rect = element.getBoundingClientRect();
    hoverBox.style.display = "block";
    hoverBox.style.left = Math.round(rect.left) + "px";
    hoverBox.style.top = Math.round(rect.top) + "px";
    hoverBox.style.width = Math.round(rect.width) + "px";
    hoverBox.style.height = Math.round(rect.height) + "px";
    hoverBox.querySelector("span").textContent = elementLabel(element);
  }

  function redrawOverlays() {
    if (!overlayLayer) return;
    overlayLayer.innerHTML = "";
    var selector = "";
    if (state.mode === "div") selector = "div,section,main,header,footer,article,nav,aside";
    if (state.mode === "text") selector = "h1,h2,h3,h4,h5,h6,p,span,a,button,label,li";
    if (state.mode === "seo") selector = "h1,h2,h3,h4,h5,h6,p,span,a,ul,ol,li,img";
    if (selector) Array.from(document.querySelectorAll(selector)).slice(0, 600).forEach(function (element) {
      if (!visible(element) || element.closest("pagepatch-root")) return;
      var rect = element.getBoundingClientRect();
      var color = overlayColor(element, state.mode);
      var box = document.createElement("div");
      box.className = "pp-box";
      box.style.cssText = "left:" + Math.round(rect.left) + "px;top:" + Math.round(rect.top) + "px;width:" + Math.round(rect.width) + "px;height:" + Math.round(rect.height) + "px;--pp-color:" + color + ";";
      if (state.mode === "div") box.style.setProperty("--pp-fill", "rgba(75, 103, 154, .015)");
      if (state.mode === "text") box.style.setProperty("--pp-fill", "rgba(45, 117, 220, .025)");
      if (state.mode === "seo") {
        var label = document.createElement("span"); label.className = "pp-box-label"; label.textContent = semanticLabel(element); box.appendChild(label);
      }
      overlayLayer.appendChild(box);
    });
    drawChangedOverlays();
  }

  function overlayColor(element, mode) {
    if (mode === "div") return "rgba(61, 89, 139, .20)";
    if (mode === "text") return "rgba(45, 117, 220, .32)";
    var colors = { H1: "#dc3f59", H2: "#e56a32", H3: "#d89a20", H4: "#af8b22", H5: "#8e7929", H6: "#786a32", P: "#3478d4", SPAN: "#4e8fdc", A: "#7557d9", UL: "#d9570f", OL: "#c45c18", LI: "#df7b32", IMG: "#278a67" };
    return colors[element.tagName] || "#f36c21";
  }

  function semanticLabel(element) {
    if (element.tagName === "IMG") return element.getAttribute("alt") ? "IMG ALT" : "IMG ALT MISSING";
    return element.tagName;
  }

  function drawChangedOverlays() {
    var grouped = {};
    pageChanges().forEach(function (change) {
      if (!change.selector || change.selector === "title" || change.selector.indexOf("meta[") === 0) return;
      if (!grouped[change.selector]) grouped[change.selector] = { changes: [], target: targetForChange(change) };
      grouped[change.selector].changes.push(change);
    });
    Object.keys(grouped).forEach(function (selector) {
      var group = grouped[selector];
      var element = group.target;
      if (!visible(element) || element.closest("pagepatch-root")) return;
      var kinds = Array.from(new Set(group.changes.map(function (change) { return change.kind.toUpperCase(); })));
      var enabled = group.changes.some(function (change) { return change.enabled; });
      var color = kinds.indexOf("NOTE") >= 0 ? "#d22978" : kinds.indexOf("STYLE") >= 0 ? "#dc6b26" : kinds.indexOf("SEO") >= 0 ? "#16866b" : "#3f61df";
      var rect = element.getBoundingClientRect();
      var box = document.createElement("div");
      box.className = "pp-box pp-changed" + (enabled ? "" : " pp-disabled");
      box.style.cssText = "left:" + Math.round(rect.left) + "px;top:" + Math.round(rect.top) + "px;width:" + Math.round(rect.width) + "px;height:" + Math.round(rect.height) + "px;--pp-color:" + color + ";--pp-fill:" + color + "10;";
      var label = document.createElement("span");
      label.className = "pp-box-label";
      label.textContent = kinds.join(" + ") + (group.changes.length > 1 ? " · " + group.changes.length : "");
      box.appendChild(label);
      overlayLayer.appendChild(box);
    });
  }

  function queueRedraw() {
    if (state.redrawQueued) return;
    state.redrawQueued = true;
    requestAnimationFrame(function () { state.redrawQueued = false; redrawOverlays(); if (state.hovered) drawHover(state.hovered); });
  }

  function watchPage() {
    state.observer = new MutationObserver(function () {
      // Coalesce mutations without postponing forever on carousels and other continuously updating UI.
      if (!state.applying && !watchPage.timer) {
        watchPage.timer = setTimeout(function () {
          watchPage.timer = null;
          applyAll(); applyDraft(); queueRedraw();
        }, 120);
      }
    });
    state.observer.observe(document.documentElement, { childList: true, characterData: true, attributes: true, subtree: true });
    watchPage.routeTimer = setInterval(function () {
      if (location.href !== state.lastUrl) {
        restoreAll(); state.lastUrl = location.href; state.route = routeKey(); state.runtimeOriginals.clear();
        applyAll(); renderUi();
      }
    }, 500);
  }

  function decodeImportPayload(value) {
    var normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    while (normalized.length % 4) normalized += "=";
    var binary = atob(normalized);
    var bytes = new Uint8Array(binary.length);
    for (var index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  function parseRequestText(text) {
    var source = String(text || "");
    try {
      var direct = JSON.parse(source);
      if (direct && Array.isArray(direct.changes)) return direct;
    } catch (_) {}
    var fence = /```json\s*([\s\S]*?)```/gi;
    var block;
    while ((block = fence.exec(source))) {
      try {
        var parsed = JSON.parse(block[1]);
        if (parsed && Array.isArray(parsed.changes)) return parsed;
      } catch (_) {}
    }
    throw new Error("No PagePatch import data was found in this file.");
  }

  function applyImportedPayload(payload) {
    var result = { count: 0, error: "" };
    if (!payload || !Array.isArray(payload.changes)) {
      result.error = "This PagePatch import link is invalid or damaged.";
      return result;
    }
    var cleanUrl = location.origin + location.pathname + location.search;
    payload.changes.filter(function (change) { return change && change.enabled !== false; }).forEach(function (change) {
      var imported = JSON.parse(JSON.stringify(change));
      if (!imported.property && (imported.kind === "div" || imported.kind === "note")) imported.property = "note";
      if (imported.property === "note" && !imported.after) imported.after = imported.note || "";
      if (!imported.selector || !imported.kind || !imported.property) return;
      imported.route = state.route; imported.url = cleanUrl; imported.enabled = true;
      imported.importedAt = new Date().toISOString();
      var existing = state.allChanges.find(function (item) {
        var legacyDivNote = imported.kind === "div" && imported.property === "note" && item.kind === "div" && !item.property;
        return item.route === state.route && item.selector === imported.selector && (item.property === imported.property || legacyDivNote);
      });
      if (existing) {
        var existingId = existing.id; var existingCreatedAt = existing.createdAt;
        Object.assign(existing, imported, { id: existingId, createdAt: existingCreatedAt || imported.createdAt || new Date().toISOString() });
      } else {
        imported.id = uid(); imported.createdAt = imported.createdAt || new Date().toISOString();
        state.allChanges.push(imported);
      }
      result.count += 1;
    });
    if (result.count) saveChanges();
    return result;
  }

  function importFromText(text) {
    var result = { count: 0, error: "" };
    try {
      result = applyImportedPayload(parseRequestText(text));
    } catch (_) {
      result.error = "No PagePatch import data was found in this file.";
    }
    if (!result.error && !result.count) result.error = "This file has no active requests to import.";
    if (result.error) {
      announce(result.error, true);
      return result;
    }
    applyAll();
    state.panel = "requests";
    renderUi();
    announce(result.count + " request" + (result.count === 1 ? "" : "s") + " imported");
    return result;
  }

  function chooseImportFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown,.json,application/json,text/markdown";
    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (input.parentNode) input.parentNode.removeChild(input);
      if (!file) return;
      if (file.text) {
        file.text().then(importFromText).catch(function () {
          announce("This request file could not be read.", true);
        });
        return;
      }
      var reader = new FileReader();
      reader.onload = function () { importFromText(String(reader.result || "")); };
      reader.onerror = function () { announce("This request file could not be read.", true); };
      reader.readAsText(file);
    });
    document.documentElement.appendChild(input);
    input.click();
  }

  function consumeImportFromUrl() {
    var marker = "#pagepatch-import=";
    if (location.hash.indexOf(marker) !== 0) return { count: 0, error: "" };
    var result = { count: 0, error: "" };
    try {
      result = applyImportedPayload(decodeImportPayload(location.hash.slice(marker.length)));
      if (result.error) throw new Error(result.error);
    } catch (_) {
      result.error = "This PagePatch import link is invalid or damaged.";
    }
    history.replaceState(history.state, document.title, location.pathname + location.search);
    return result;
  }

  function declarationsToCss(declarations, priorities) {
    return Object.keys(declarations || {}).map(function (property) {
      return property + ": " + declarations[property] + ((priorities || {})[property] ? " !important" : "") + ";";
    }).join("\n");
  }

  function exportPage() {
    var changes = pageChanges().filter(function (change) { return change.enabled; });
    if (!changes.length) { announce("There are no active requests to export.", true); return; }
    var pageUrl = location.origin + state.route;
    var exportedAt = new Date().toISOString();
    var lines = [languageText("# Page change request", "# Solicitação de alterações da página"), "", languageText("Requested changes for **", "Alterações solicitadas para **") + pageUrl + "**.", "", languageText("- Exported: ", "- Exportado em: ") + exportedAt, languageText("- Viewport reviewed: ", "- Área de visualização revisada: ") + innerWidth + " × " + innerHeight, languageText("- Active requests: ", "- Solicitações ativas: ") + changes.length, "", languageText("## Summary", "## Resumo"), ""];
    changes.forEach(function (change, index) {
      var context = exportContext(change);
      var targetSummary = isPageMetadataChange(change) ? "" : " — " + readableElement(change, false);
      lines.push((index + 1) + ". **" + requestTitle(change) + "**" + targetSummary);
    });
    lines.push("");
    changes.forEach(function (change, index) {
      var context = exportContext(change);
      lines.push("## " + (index + 1) + ". " + requestTitle(change));
      if (usefulPageArea(change, context)) lines.push("", languageText("**Page area:** “", "**Área da página:** “") + context.area + "”");
      appendHumanChange(lines, change);
      var noteIsRequest = (change.property === "note" || change.kind === "div" || change.kind === "note") && (!change.after || change.after === change.note);
      if (change.note && !noteIsRequest) lines.push("", languageText("### Reason or implementation note", "### Motivo ou observação de implementação"), "", change.note);
      var fullPath = exportDomPath(change);
      lines.push("", "<details>", "<summary>" + languageText("Technical details", "Detalhes técnicos") + "</summary>", "", languageText("- DOM path: `", "- Caminho no DOM: `") + (fullPath || change.selector) + "`");
      if (fullPath && change.selector && fullPath !== change.selector) lines.push(languageText("- Stable selector: `", "- Seletor estável: `") + change.selector + "`");
      if (change.property) lines.push(languageText("- Property: `", "- Propriedade: `") + change.property + "`");
      lines.push("", "</details>", "");
    });
    var importChanges = JSON.parse(JSON.stringify(changes));
    importChanges.forEach(function (change) { delete change.enabled; });
    lines.push("<details>", "<summary>" + languageText("PagePatch import data", "Dados de importação do PagePatch") + "</summary>", "", languageText("This JSON restores the request in PagePatch. It is not an implementation prompt.", "Este JSON restaura a solicitação no PagePatch. Ele não é um prompt de implementação."), "", "```json", JSON.stringify({ version: VERSION, route: state.route, url: pageUrl, exportedAt: exportedAt, changes: importChanges }, null, 2), "```", "", "</details>", "");
    var blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    var link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "pagepatch-" + (state.route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home") + ".md";
    link.click(); setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000); announce("Page request exported");
  }

  function requestTitle(change) {
    if (change.kind === "note") return languageText("Implementation note", "Observação de implementação");
    if (change.property === "note" || change.kind === "div") return languageText("Element or layout request", "Solicitação de elemento ou layout");
    if (change.property === "textContent" && change.semanticTag) return String(change.before || "") === String(change.after || "") ? languageText("Change semantic element", "Alterar elemento semântico") : languageText("Change text and semantic element", "Alterar texto e elemento semântico");
    if (change.property === "textContent") return languageText("Change selected text", "Alterar texto selecionado");
    if (change.property === "attr:alt") return languageText("Change image alternative text", "Alterar texto alternativo da imagem");
    if (change.property === "attr:href") return languageText("Change link destination", "Alterar destino do link");
    if (change.property === "semantic-tag") return languageText("Change list type", "Alterar tipo de lista");
    if (change.property === "style") return languageText("Change visual styling", "Alterar estilo visual");
    if (change.property === "document-title") return languageText("Change page title", "Alterar título da página");
    if (change.property === "meta-description") return languageText("Change meta description", "Alterar meta descrição");
    if (change.property === "jsonld") return languageText("Update JSON-LD structured data", "Atualizar dados estruturados JSON-LD");
    if (change.property === "head-content") {
      var metadataLabel = translateUiText(String((change.element || {}).label || languageText("page metadata", "metadados da página")));
      if (IS_PT) metadataLabel = metadataLabel.charAt(0).toLowerCase() + metadataLabel.slice(1);
      return languageText("Change ", "Alterar ") + metadataLabel;
    }
    return languageText("Update ", "Atualizar ") + String((change.element || {}).label || languageText("selected element", "elemento selecionado"));
  }

  function isPageMetadataChange(change) {
    return change.property === "document-title" || change.property === "meta-description" || change.property === "head-content" || change.property === "jsonld";
  }

  function normalizedText(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function usefulPageArea(change, context) {
    if (!context || !context.area || isPageMetadataChange(change)) return false;
    var area = normalizedText(context.area);
    return area && area !== normalizedText(change.before) && area !== normalizedText(change.after) && area !== normalizedText(change.element && change.element.text);
  }

  function readableElement(change, includeLabel) {
    var element = change.element || {};
    var names = IS_PT
      ? { h1: "Cabeçalho H1", h2: "Cabeçalho H2", h3: "Cabeçalho H3", h4: "Cabeçalho H4", h5: "Cabeçalho H5", h6: "Cabeçalho H6", p: "Parágrafo", span: "Trecho de texto", a: "Link", ul: "Lista não ordenada", ol: "Lista ordenada", li: "Item de lista", img: "Imagem", div: "Contêiner", section: "Seção", title: "Título da página", meta: "Metadados", script: "Dados estruturados" }
      : { h1: "H1 heading", h2: "H2 heading", h3: "H3 heading", h4: "H4 heading", h5: "H5 heading", h6: "H6 heading", p: "Paragraph", span: "Text span", a: "Link", ul: "Unordered list", ol: "Ordered list", li: "List item", img: "Image", div: "Container", section: "Section", title: "Page title", meta: "Metadata", script: "Structured data" };
    var name = names[element.tag] || (element.tag ? element.tag.toUpperCase() + languageText(" element", " elemento") : languageText("Page element", "Elemento da página"));
    return name + (includeLabel === false || !element.label ? "" : " (`" + element.label + "`)");
  }

  function exportContext(change) {
    var stored = change.element && change.element.context;
    if (stored && (stored.area || stored.nearby || stored.parent)) return stored;
    var target = targetForChange(change);
    return target ? describeContext(target) : {};
  }

  function exportDomPath(change) {
    if (change.element && change.element.path) return change.element.path;
    var target = targetForChange(change);
    return target ? domPathFor(target) : "";
  }

  function quoteBlock(value) {
    return String(value == null ? "" : value).split("\n").map(function (line) { return "> " + line; }).join("\n");
  }

  function appendHumanChange(lines, change) {
    var requested = change.after !== undefined && change.after !== "" ? change.after : change.note;
    if (change.property === "note" || change.kind === "div" || change.kind === "note") {
      if (requested) lines.push("", languageText("### Request", "### Solicitação"), "", quoteBlock(requested));
      return;
    }
    if (change.property === "semantic-tag") {
      lines.push("", languageText("### Requested change", "### Alteração solicitada"), "", languageText("Change the list from `", "Trocar a lista de `") + change.before + languageText("` to `", "` para `") + change.after + languageText("`. Keep its list items unchanged.", "`. Manter os itens da lista inalterados."));
      return;
    }
    if (change.semanticTag) {
      var originalTag = String((change.element || {}).tag || "element").toUpperCase();
      var textChanged = normalizedText(change.before) !== normalizedText(change.after);
      lines.push("", languageText("### Requested change", "### Alteração solicitada"), "", languageText("Change `", "Trocar de `") + originalTag + languageText("` to `", "` para `") + change.semanticTag + "`." + (textChanged ? languageText(" Replace the text as shown below.", " Substituir também o texto conforme indicado abaixo.") : languageText(" Keep the text unchanged.", " Manter o texto inalterado.")));
      if (change.before !== undefined && change.before !== "") lines.push("", textChanged ? languageText("### Current text", "### Texto atual") : languageText("### Reference text", "### Texto de referência"), "", quoteBlock(change.before));
      if (textChanged && change.after !== undefined && change.after !== "") lines.push("", languageText("### New text", "### Novo texto"), "", quoteBlock(change.after));
      return;
    }
    if (change.property === "style") {
      if (change.before && Object.keys(change.before).length) lines.push("", languageText("### Current values", "### Valores atuais"), "", fenced(declarationsToCss(change.before)));
      lines.push("", languageText("### Requested CSS", "### CSS solicitado"), "", fenced(declarationsToCss(change.after, change.priorities)));
      return;
    }
    if (change.property === "attr:href") {
      var linkText = normalizedText(change.element && change.element.text);
      if (linkText) lines.push("", languageText("### Link text for reference", "### Texto do link para referência"), "", quoteBlock(linkText));
      if (change.before !== undefined) lines.push("", languageText("### Current destination", "### Destino atual"), "", quoteBlock(change.before || languageText("(no destination)", "(sem destino)")));
      lines.push("", languageText("### New destination", "### Novo destino"), "", quoteBlock(change.after || languageText("(remove destination)", "(remover destino)")));
      return;
    }
    if (change.before !== undefined && change.before !== "") lines.push("", change.property === "textContent" ? languageText("### Current text", "### Texto atual") : languageText("### Current value", "### Valor atual"), "", quoteBlock(typeof change.before === "string" ? change.before : JSON.stringify(change.before, null, 2)));
    if (requested !== undefined && requested !== "") lines.push("", change.property === "textContent" ? languageText("### New text", "### Novo texto") : languageText("### Requested value", "### Valor solicitado"), "", quoteBlock(typeof requested === "string" ? requested : JSON.stringify(requested, null, 2)));
  }

  function fenced(value) {
    var text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    return "```\n" + text + "\n```";
  }

  function announce(message, error) {
    if (!shadow) return;
    var toast = shadow.querySelector(".pp-toast");
    toast.textContent = translateUiText(message); toast.className = "pp-toast pp-show" + (error ? " pp-error" : "");
    clearTimeout(announce.timer); announce.timer = setTimeout(function () { toast.className = "pp-toast"; }, 2500);
  }

  function start() {
    if (state.running) return;
    state.running = true; state.route = routeKey();
    var imported = consumeImportFromUrl();
    state.lastUrl = location.href;
    createUi();
    document.addEventListener("mousemove", onDocumentMove, true);
    document.addEventListener("click", onDocumentClick, true);
    addEventListener("scroll", queueRedraw, true); addEventListener("resize", queueRedraw);
    watchPage(); applyAll(); renderUi();
    if (imported.error) announce(imported.error, true);
    else announce(imported.count ? imported.count + " request" + (imported.count === 1 ? "" : "s") + " imported" : "PagePatch is active");
  }

  function stop() {
    if (!state.running) return;
    restoreAll(); state.running = false;
    document.removeEventListener("mousemove", onDocumentMove, true); document.removeEventListener("click", onDocumentClick, true);
    removeEventListener("scroll", queueRedraw, true); removeEventListener("resize", queueRedraw);
    if (state.observer) state.observer.disconnect();
    clearInterval(watchPage.routeTimer); clearTimeout(watchPage.timer);
    watchPage.routeTimer = null; watchPage.timer = null;
    if (host) host.remove(); host = shadow = overlayLayer = controls = panel = hoverBox = null;
  }

  window.PagePatch = {
    version: VERSION,
    language: LANGUAGE,
    start: start,
    stop: stop,
    getChanges: function () { return JSON.parse(JSON.stringify(pageChanges())); },
    exportPage: exportPage,
    importPage: importFromText,
    clearPage: clearPage
  };

  function autoStart() {
    if (new URL(location.href).searchParams.has(EDIT_PARAM)) start();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoStart, { once: true });
  else autoStart();
})();
