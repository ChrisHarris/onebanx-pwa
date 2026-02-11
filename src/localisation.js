// ----------------------------------
// localisation.js
// ----------------------------------

let dictionary = {};
let links = {};
let meta = {};

export async function loadLocalisation({ locale = "en-GB", org = "default" }) {
  const base = await fetch(`/localisation/${locale}.default.json`)
    .then(r => (r.ok ? r.json() : {}))
    .catch(() => ({}));

  dictionary = base;
  links = base.links ?? {};
  meta = base.meta ?? {};

  if (org !== "default") {
    const orgPack = await fetch(`/localisation/${locale}.${org}.json`)
      .then(r => (r.ok ? r.json() : {}))
      .catch(() => ({}));

    dictionary = { ...dictionary, ...orgPack };
    links = { ...links, ...(orgPack.links ?? {}) };
    meta = { ...meta, ...(orgPack.meta ?? {}) };
  }
}

// UI copy
export function t(key) {
  return dictionary[key] ?? key;
}

// Links (labels + URLs)
export function l(key) {
  return links[key] ?? "";
}

// Metadata (org, app name, etc.)
export function m(key) {
  return meta[key] ?? "";
}