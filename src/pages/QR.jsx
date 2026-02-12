import React, { useState, useMemo, useRef, useEffect } from "react";
import Header from "../components/Header";

const SITES = [
  "https://onebanx-pwa.pages.dev/",
  "http://localhost:5173/",
];

const LOCALES = ["en-GB", "cy-GB", "fr-FR", "de-DE", "es-ES", "jp-JP", "zh-CN"];

const LOCATIONS = [
  "Market Street, Manchester",
  "Leeds City Centre",
  "Booths Park, Knutsford",
  "Bank Street, Bradford",
  "George Street, Edinburgh",
];

const ORGS = [
  { value: "default", label: "Default" },
  { value: "Lloyds", label: "Lloyds", emblem: "/images/Emblem-Lloyds.svg" },
  { value: "Halifax", label: "Halifax", emblem: "/images/Emblem-Halifax.svg" },
  { value: "Bank of Scotland", label: "Bank of Scotland", emblem: "/images/Emblem-Bank-of-Scotland.svg" },
];

// Helper: attach a wa-change listener to a ref element
function useWaChange(ref, handler) {
  const saved = useRef(handler);
  saved.current = handler;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const listener = (e) => saved.current(e);
    el.addEventListener("wa-change", listener);
    return () => el.removeEventListener("wa-change", listener);
  }, [ref]);
}

export default function QR() {
  const [site, setSite] = useState(SITES[0]);
  const [locale, setLocale] = useState(LOCALES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [org, setOrg] = useState(ORGS[0].value);

  const siteRef = useRef(null);
  const orgRef = useRef(null);
  const localeRef = useRef(null);
  const locationRef = useRef(null);
  const qrRef = useRef(null);
  const textareaRef = useRef(null);

  // Wire up wa-change listeners
  useWaChange(siteRef, (e) => setSite(e.target.value));
  useWaChange(orgRef, (e) => setOrg(e.target.value));
  useWaChange(localeRef, (e) => setLocale(e.target.value));
  useWaChange(locationRef, (e) => setLocation(e.target.value));

  // Listen for wa-input on textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const listener = (e) => setEditedUrl(e.target.value);
    el.addEventListener("wa-input", listener);
    return () => el.removeEventListener("wa-input", listener);
  }, []);

  const generatedUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("locale", locale);
    params.set("org", org);
    params.set("location", location);
    return `${site}?${params.toString()}`;
  }, [site, locale, location, org]);

  const [editedUrl, setEditedUrl] = useState(null);
  const displayUrl = editedUrl ?? generatedUrl;

  // Reset edited URL when form values change
  const prevGenerated = useRef(generatedUrl);
  if (prevGenerated.current !== generatedUrl) {
    prevGenerated.current = generatedUrl;
    setEditedUrl(null);
  }

  // Imperatively sync value on web components
  useEffect(() => {
    if (qrRef.current) qrRef.current.value = displayUrl;
    if (textareaRef.current) textareaRef.current.value = displayUrl;
  }, [displayUrl]);

  return (
    <main>
      <Header />

      <style>{`
        .qr-form { max-width: 520px; margin: 40px auto; padding: 0 24px; }
        .qr-output { text-align: center; }
        .qr-output wa-qr-code { margin: 0 auto; }
        .qr-output wa-button { width: 100%; }
        .org-radio wa-avatar { --size: 48px; }
      `}</style>

      <div className="wa-stack wa-gap-l qr-form">

        <wa-select ref={siteRef} label="Site" pill value={site}>
          {SITES.map((s) => (
            <wa-option key={s} value={s}>{s}</wa-option>
          ))}
        </wa-select>

        <wa-radio-group
          ref={orgRef}
          className="org-radio"
          label="Org"
          orientation="horizontal"
          name="org"
          value={org}
        >
          {ORGS.map((o) => (
            <wa-radio key={o.value} appearance="button" value={o.value}>
              <div className="wa-stack wa-gap-2xs" style={{ margin: "10px 0" }}>
                <wa-avatar label={o.label} image={o.emblem || undefined}>
                  {!o.emblem && <wa-icon slot="icon" name="globe" variant="solid"></wa-icon>}
                </wa-avatar>
                {o.label}
              </div>
            </wa-radio>
          ))}
        </wa-radio-group>

        <wa-select ref={localeRef} label="Locale" pill value={locale}>
          {LOCALES.map((l) => (
            <wa-option key={l} value={l}>{l}</wa-option>
          ))}
        </wa-select>

        <wa-select ref={locationRef} label="Location" pill value={location}>
          {LOCATIONS.map((loc) => (
            <wa-option key={loc} value={loc}>{loc}</wa-option>
          ))}
        </wa-select>

        <div className="qr-output wa-stack wa-gap-m">
          <wa-qr-code ref={qrRef} value={displayUrl} label="QR Code"></wa-qr-code>

          <wa-textarea
            ref={textareaRef}
            rows={5}
            value={displayUrl}
          ></wa-textarea>
          <wa-button variant="brand" href={displayUrl} target="_blank">
            Visit
            <wa-icon slot="end" name="arrow-up-right-from-square" variant="regular"></wa-icon>
          </wa-button>
        </div>

      </div>
    </main>
  );
}
