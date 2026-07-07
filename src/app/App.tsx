import { useState } from "react";
import logoPrincipal from "../imports/brand/lurems-logo-principal-transparent.png";
import logoMono from "../imports/brand/lurems-logo-monocromatico.png";
import logoNegative from "../imports/brand/lurems-logo-negativo.png";
import markPrincipal from "../imports/brand/lurems-isotipo-transparent.png";
import markNegative from "../imports/brand/lurems-isotipo-negativo.png";

// ─── Official Lurems Brand Tokens (extracted from approved identity) ──────────
const C = {
  // Brand — Teal (Official)
  teal: {
    50:  "#EFF9F7",
    100: "#C8EDE8",
    200: "#A0E0D8",
    300: "#72CBBF",
    400: "#5BBDAD",
    500: "#45A99A",  // PRIMARY — official brand teal
    600: "#35897C",
    700: "#2A6C63",
    800: "#1F504A",
    900: "#1A3A38",  // DARK — used in wordmark & dark UI
  },
  // Patient — Green
  green: {
    50:  "#EDFAF4",
    100: "#CBF1E0",
    200: "#A0E4C8",
    300: "#70D4AB",
    400: "#52C496",
    500: "#4CAF88",  // Patient primary
    600: "#3A9070",
    700: "#2D725A",
    800: "#1F5442",
    900: "#143A2E",
  },
  // Psychologist — Purple
  purple: {
    50:  "#F0EEFF",
    100: "#DDD9FF",
    200: "#C0BAFF",
    300: "#A098F0",
    400: "#8E80E0",
    500: "#7B6FD0",  // Psychologist primary
    600: "#6358B8",
    700: "#4D44A0",
    800: "#383188",
    900: "#272170",
  },
  // Hope — Warm Yellow (faro light)
  hope: {
    50:  "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#F9D64E",
    400: "#F2C94C",  // Hope primary — lighthouse beam
    500: "#E6B82A",
    600: "#C99A10",
    700: "#A37C08",
    800: "#7D5E05",
    900: "#574103",
  },
  // Neutral — warm greyed teal
  neutral: {
    50:  "#F5FAFA",
    100: "#E8F4F2",
    200: "#C8DFDC",
    300: "#A0C5C0",
    400: "#7BADA8",
    500: "#5A8480",
    600: "#426460",
    700: "#2E4A47",
    800: "#1F3432",
    900: "#12211F",
  },
};

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96];

const ELEVATION = {
  xs: "0 1px 3px rgba(26,58,56,0.06), 0 1px 2px rgba(26,58,56,0.04)",
  s:  "0 2px 8px rgba(26,58,56,0.08), 0 1px 3px rgba(26,58,56,0.05)",
  m:  "0 4px 16px rgba(26,58,56,0.10), 0 2px 6px rgba(26,58,56,0.06)",
  l:  "0 8px 32px rgba(26,58,56,0.12), 0 4px 12px rgba(26,58,56,0.07)",
  xl: "0 16px 56px rgba(26,58,56,0.16), 0 8px 24px rgba(26,58,56,0.08)",
};

const RADIUS = {
  xs: "2px", s: "4px", m: "8px", l: "12px",
  xl: "20px", "2xl": "32px", full: "9999px",
};

// ─── Navigation pages ─────────────────────────────────────────────────────────
const PAGES = [
  { id: "cover",        label: "01 — Cover" },
  { id: "brand",        label: "02 — Brand Identity" },
  { id: "variables",    label: "03 — Variables" },
  { id: "colors",       label: "04 — Color System" },
  { id: "typography",   label: "05 — Typography" },
  { id: "logo",         label: "06 — Logo System" },
  { id: "iconography",  label: "07 — Iconography" },
  { id: "grid",         label: "08 — Grid" },
  { id: "spacing",      label: "09 — Spacing" },
  { id: "elevation",    label: "10 — Elevation" },
  { id: "radius",       label: "11 — Border Radius" },
  { id: "components",   label: "12 — Components" },
  { id: "patterns",     label: "13 — Patterns" },
  { id: "applications", label: "14 — Applications" },
  { id: "tokens",       label: "15 — Design Tokens" },
];

// ─── Official Lurems logo assets ──────────────────────────────────────────────
function OfficialLogoAsset({
  variant = "principal",
  width = 260,
  alt = "Logo oficial de Lurems",
}: {
  variant?: "principal" | "mono" | "negative";
  width?: number;
  alt?: string;
}) {
  const src = variant === "negative" ? logoNegative : variant === "mono" ? logoMono : logoPrincipal;
  return (
    <img src={src} alt={alt} style={{ width, height: "auto", display: "block", objectFit: "contain" }} />
  );
}

function LuremsMark({ size = 48, variant = "principal" }: { size?: number; variant?: "principal" | "negative" }) {
  return (
    <img
      src={variant === "negative" ? markNegative : markPrincipal}
      alt="Isotipo oficial de Lurems"
      style={{ width: size * 1.37, height: size, display: "block", objectFit: "contain" }}
    />
  );
}

// Wordmark solo — LUREMS text in official style
function LuremsWordmark({ size = 28, color = "#1A3A38" }: { size?: number; color?: string }) {
  return (
    <span style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 300,
      fontSize: size,
      color,
      letterSpacing: "0",
      lineHeight: 1,
    }}>
      lurems
    </span>
  );
}

// Logo completo (mark + wordmark)
function LuremsLogo({ markSize = 36, wordSize = 22, wordColor = "#1A3A38", layout = "horizontal" }: {
  markSize?: number; wordSize?: number; wordColor?: string; layout?: "horizontal" | "vertical";
}) {
  return (
    <div style={{ display: "flex", flexDirection: layout === "vertical" ? "column" : "row", alignItems: "center", gap: layout === "vertical" ? 8 : 10 }}>
      <LuremsMark size={markSize} />
      <LuremsWordmark size={wordSize} color={wordColor} />
    </div>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────
function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: 32, borderBottom: `1px solid ${C.teal[100]}` }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: C.teal[100], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 500, color: C.teal[700] }}>{number}</span>
      </div>
      <div>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 30, color: C.teal[900], letterSpacing: "-0.02em", margin: 0 }}>{title}</h1>
        <p style={{ marginTop: 4, fontSize: 14, color: C.neutral[500], fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: C.neutral[400], fontFamily: "'Poppins', sans-serif", marginBottom: 12 }}>
      {children}
    </p>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.teal[100]}`, borderRadius: 16, padding: 24, ...style }}>
      {children}
    </div>
  );
}

// ─── PAGE 01 — Cover ──────────────────────────────────────────────────────────
function PageCover() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: `linear-gradient(155deg, ${C.teal[900]} 0%, #0E2E2C 50%, #0A2220 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Background texture — subtle path lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path d="M600 800 Q700 600 800 400 Q900 200 1000 0" stroke={C.teal[300]} strokeWidth="80" fill="none"/>
        <path d="M600 800 Q500 600 400 400 Q300 200 200 0" stroke={C.teal[400]} strokeWidth="60" fill="none"/>
        <path d="M600 800 Q750 650 900 450 Q1050 250 1200 0" stroke={C.teal[200]} strokeWidth="40" fill="none"/>
      </svg>

      {/* Glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: `radial-gradient(circle, rgba(69,169,154,0.15) 0%, transparent 70%)`, pointerEvents: "none" }}/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 32px", position: "relative", zIndex: 1 }}>

        {/* Official logo */}
        <div style={{ marginBottom: 32, padding: 24, borderRadius: 20, background: "rgba(255,255,255,0.96)", boxShadow: ELEVATION.l }}>
          <OfficialLogoAsset width={300} />
        </div>

        {/* Wordmark */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 72, color: "#ffffff", letterSpacing: "0", margin: 0, lineHeight: 1 }}>
            lurems
          </h1>
          <p style={{ marginTop: 16, fontFamily: "'Poppins', sans-serif", fontWeight: 300, fontSize: 16, color: C.teal[300], letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Brand System
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, ${C.teal[500]}, transparent)`, margin: "40px 0" }}/>

        {/* Tagline */}
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: C.teal[400], fontWeight: 400, textAlign: "center", maxWidth: 420, lineHeight: 1.7 }}>
          Claridad en tu camino terapéutico
        </p>

        {/* Meta pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {[["Versión", "1.1"], ["Estado", "Aprobado"], ["Fecha", "Julio 2026"]].map(([k, v]) => (
            <div key={k} style={{ padding: "8px 20px", borderRadius: 999, border: `1px solid rgba(69,169,154,0.25)`, background: "rgba(69,169,154,0.08)" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.teal[400] }}>{k}: </span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#fff", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ borderTop: "1px solid rgba(69,169,154,0.12)", padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <LuremsLogo markSize={20} wordSize={14} wordColor={C.teal[400]} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.teal[700] }}>lurems.com</span>
      </div>
    </div>
  );
}

// ─── PAGE 02 — Brand Identity ─────────────────────────────────────────────────
function PageBrand() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="02" title="Brand Identity" subtitle="Todas las variantes oficiales del logotipo y reglas de uso de la marca Lurems." />

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {[
          { label: "Logo Principal",       bg: "#ffffff",   variant: "principal" as const, tag: "Principal", note: "Uso maestro sobre fondos claros." },
          { label: "Versión Monocromática", bg: "#ffffff",   variant: "mono" as const,      tag: "Mono",      note: "Uso técnico, una tinta o documentación." },
          { label: "Versión Negativa",      bg: C.teal[900], variant: "negative" as const,  tag: "Negativo",  note: "Uso exclusivo sobre fondos oscuros." },
          { label: "Sobre Brand Color",     bg: C.teal[500], variant: "negative" as const,  tag: "Brand",     note: "Logo blanco sobre teal institucional." },
        ].map(({ label, bg, variant, tag, note }) => (
          <div key={label} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.teal[100]}` }}>
            <div style={{ background: bg, padding: 32, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 190 }}>
              <OfficialLogoAsset variant={variant} width={250} />
            </div>
            <div style={{ background: "#fff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 12, color: C.neutral[600], fontFamily: "'Poppins', sans-serif", display: "block" }}>{label}</span>
                <span style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'Poppins', sans-serif", display: "block", marginTop: 2 }}>{note}</span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: C.teal[500], background: C.teal[50], padding: "2px 8px", borderRadius: 99 }}>{tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Isotipo / App Icon / Favicon */}
      <div style={{ marginTop: 40 }}>
        <Label>Isotipo — App Icon — Favicon</Label>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
          {[
            { size: 96, label: "App Icon 96px", bg: "linear-gradient(135deg, #FFFFFF, #EFF9F7)", radius: 22, variant: "principal" as const },
            { size: 64, label: "iOS 64px",       bg: "linear-gradient(135deg, #FFFFFF, #C8EDE8)", radius: 14, variant: "principal" as const },
            { size: 48, label: "Estándar 48px",  bg: "#ffffff",  radius: 10, variant: "principal" as const },
            { size: 32, label: "Favicon 32px",   bg: C.teal[900], radius: 6, variant: "negative" as const },
            { size: 16, label: "Favicon 16px",   bg: C.teal[900], radius: 3, variant: "negative" as const },
          ].map(({ size, label, bg, radius, variant }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: size + 16, height: size + 16, borderRadius: radius, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: ELEVATION.m }}>
                <LuremsMark size={size} variant={variant} />
              </div>
              <span style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'DM Mono', monospace", textAlign: "center" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety zone */}
      <div style={{ marginTop: 40 }}>
        <Label>Zona de Seguridad</Label>
        <div style={{ borderRadius: 16, background: C.teal[50], border: `2px dashed ${C.teal[200]}`, padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -24, border: `1.5px dashed ${C.teal[400]}`, borderRadius: 8, opacity: 0.5 }}/>
            <OfficialLogoAsset width={260} />
            <div style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: C.teal[600], fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>← x →</div>
            <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: C.teal[600], fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>Zona de seguridad = altura del ojo del faro</div>
          </div>
        </div>
      </div>

      {/* Dos / Don'ts */}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <Label>Usos Correctos</Label>
          {["Usar el logo principal sobre fondos claros", "Usar la versión negativa sobre fondos oscuros", "Mantener la proporción original", "Respetar la zona de seguridad mínima", "Preservar el tagline oficial"].map(t => (
            <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 8, background: C.green[50], marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green[600], flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: C.green[800], fontFamily: "'Poppins', sans-serif" }}>{t}</span>
            </div>
          ))}
        </Card>
        <Card>
          <Label>Usos Incorrectos</Label>
          {["No distorsionar ni escalar asimétricamente", "No cambiar los colores del isotipo", "No separar el tagline del logo principal", "No añadir efectos, sombras o filtros", "No usar sobre fondos con poco contraste"].map(t => (
            <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 12px", borderRadius: 8, background: "#FFF0F0", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#E05454", flexShrink: 0 }}>✗</span>
              <span style={{ fontSize: 13, color: "#7F1D1D", fontFamily: "'Poppins', sans-serif" }}>{t}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 03 — Variables ──────────────────────────────────────────────────────
function PageVariables() {
  const groups = [
    { title: "Color — Brand", vars: [
      { name: "color.brand.primary", value: C.teal[500], swatch: C.teal[500] },
      { name: "color.brand.dark",    value: C.teal[900], swatch: C.teal[900] },
      { name: "color.brand.light",   value: C.teal[200], swatch: C.teal[200] },
      { name: "color.brand.subtle",  value: C.teal[50],  swatch: C.teal[50]  },
    ]},
    { title: "Color — Patient (Green)", vars: [
      { name: "color.patient.primary", value: C.green[500], swatch: C.green[500] },
      { name: "color.patient.light",   value: C.green[100], swatch: C.green[100] },
      { name: "color.patient.dark",    value: C.green[800], swatch: C.green[800] },
    ]},
    { title: "Color — Psychologist (Purple)", vars: [
      { name: "color.psychologist.primary", value: C.purple[500], swatch: C.purple[500] },
      { name: "color.psychologist.light",   value: C.purple[100], swatch: C.purple[100] },
      { name: "color.psychologist.dark",    value: C.purple[800], swatch: C.purple[800] },
    ]},
    { title: "Color — Hope (Amber)", vars: [
      { name: "color.hope.primary", value: C.hope[400], swatch: C.hope[400] },
      { name: "color.hope.light",   value: C.hope[100], swatch: C.hope[100] },
      { name: "color.hope.dark",    value: C.hope[700], swatch: C.hope[700] },
    ]},
    { title: "Spacing", vars: [
      { name: "spacing.4",  value: "4px",  swatch: null },
      { name: "spacing.8",  value: "8px",  swatch: null },
      { name: "spacing.16", value: "16px", swatch: null },
      { name: "spacing.24", value: "24px", swatch: null },
      { name: "spacing.32", value: "32px", swatch: null },
    ]},
    { title: "Typography", vars: [
      { name: "font.family.brand",   value: "Poppins",   swatch: null },
      { name: "font.family.mono",    value: "DM Mono",   swatch: null },
      { name: "font.weight.regular", value: "400",       swatch: null },
      { name: "font.weight.bold",    value: "700",       swatch: null },
    ]},
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="03" title="Variables" subtitle="Variables de Figma centralizadas — fuente de verdad para colores, espaciado, tipografía y más." />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {groups.map(({ title, vars }) => (
          <Card key={title}>
            <Label>{title}</Label>
            {vars.map(({ name, value, swatch }) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: `1px solid ${C.teal[50]}` }}>
                {swatch ? (
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: swatch, border: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}/>
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: C.teal[50], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, color: C.teal[400] }}>T</span>
                  </div>
                )}
                <code style={{ fontSize: 12, color: C.teal[600], fontFamily: "'DM Mono', monospace", flex: 1 }}>{name}</code>
                <span style={{ fontSize: 11, color: C.neutral[400], fontFamily: "'DM Mono', monospace" }}>{value}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 04 — Color System ───────────────────────────────────────────────────
function ColorScale({ name, palette, role }: { name: string; palette: Record<string, string>; role?: string }) {
  const entries = Object.entries(palette);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{name}</p>
          {role && <p style={{ fontSize: 11, color: C.neutral[400], marginTop: 2 }}>{role}</p>}
        </div>
        <code style={{ fontSize: 10, color: C.neutral[300], fontFamily: "'DM Mono', monospace" }}>{entries[4][1]}</code>
      </div>
      <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", boxShadow: ELEVATION.xs }}>
        {entries.map(([step, hex]) => (
          <div key={step} style={{ flex: 1, background: hex, height: 56, position: "relative" }} title={`${step}: ${hex}`}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2px 0", textAlign: "center" }}>
              <span style={{ fontSize: 8, color: parseInt(step) > 400 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)", fontFamily: "'DM Mono', monospace" }}>{step}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageColors() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="04" title="Color System" subtitle="Paleta oficial extraída de la identidad visual aprobada de Lurems." />

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 28 }}>
        <ColorScale name="Brand — Teal" palette={C.teal} role="Color principal de la marca. Usar en UI de marca y acciones primarias." />
        <ColorScale name="Patient — Green" palette={C.green} role="Experiencia del paciente. Interfaces de perfil, sesiones y bienestar." />
        <ColorScale name="Psychologist — Purple" palette={C.purple} role="Experiencia del psicólogo. Interfaces profesionales y gestión de agenda." />
        <ColorScale name="Hope — Amber" palette={C.hope} role="Color esperanza — luz del faro. Logros, celebraciones y momentos positivos." />
        <ColorScale name="Neutral — Greyed Teal" palette={C.neutral} role="Fondos, superficies, texto y bordes del sistema." />
      </div>

      {/* Semantic tokens */}
      <div style={{ marginTop: 48 }}>
        <Label>Tokens Semánticos</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Background",  hex: C.neutral[50],  token: "color.background" },
            { label: "Surface",     hex: "#ffffff",       token: "color.surface" },
            { label: "Text Primary",hex: C.teal[900],    token: "color.text.primary" },
            { label: "Text Muted",  hex: C.neutral[500], token: "color.text.muted" },
            { label: "Border",      hex: C.teal[100],    token: "color.border" },
            { label: "Success",     hex: C.green[500],   token: "color.success" },
            { label: "Warning",     hex: C.hope[400],    token: "color.warning" },
            { label: "Error",       hex: "#E05454",      token: "color.error" },
            { label: "Info",        hex: C.purple[400],  token: "color.info" },
            { label: "Hope",        hex: C.hope[400],    token: "color.hope.primary" },
            { label: "Patient",     hex: C.green[500],   token: "color.patient.primary" },
            { label: "Psicólogo",   hex: C.purple[500],  token: "color.psych.primary" },
          ].map(({ label, hex, token }) => (
            <div key={label} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.teal[100]}` }}>
              <div style={{ height: 48, background: hex }}/>
              <div style={{ padding: "10px 12px", background: "#fff" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{label}</p>
                <p style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{token}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 05 — Typography ─────────────────────────────────────────────────────
const TYPE_SCALE = [
  { name: "Display XL", sz: 56, wt: 800, lh: 1.1,  tr: "-0.04em", use: "Hero principal de landing" },
  { name: "Display L",  sz: 44, wt: 700, lh: 1.15, tr: "-0.03em", use: "Sección hero, portadas" },
  { name: "Display M",  sz: 36, wt: 700, lh: 1.2,  tr: "-0.02em", use: "Módulos destacados" },
  { name: "H1",         sz: 28, wt: 700, lh: 1.25, tr: "-0.02em", use: "Título principal de página" },
  { name: "H2",         sz: 22, wt: 600, lh: 1.3,  tr: "-0.01em", use: "Títulos de sección" },
  { name: "H3",         sz: 18, wt: 600, lh: 1.35, tr: "0",        use: "Subtítulos, cards" },
  { name: "H4",         sz: 16, wt: 600, lh: 1.4,  tr: "0",        use: "Labels de sección" },
  { name: "Body XL",    sz: 18, wt: 400, lh: 1.7,  tr: "0",        use: "Intro, textos destacados" },
  { name: "Body L",     sz: 16, wt: 400, lh: 1.65, tr: "0",        use: "Cuerpo principal" },
  { name: "Body M",     sz: 14, wt: 400, lh: 1.6,  tr: "0.01em",  use: "UI, texto secundario" },
  { name: "Body S",     sz: 12, wt: 400, lh: 1.5,  tr: "0.02em",  use: "Metadata, timestamps" },
  { name: "Caption",    sz: 11, wt: 500, lh: 1.4,  tr: "0.06em",  use: "Microcopy, etiquetas" },
  { name: "Button",     sz: 14, wt: 600, lh: 1,    tr: "0.02em",  use: "CTAs y acciones" },
  { name: "Label",      sz: 12, wt: 600, lh: 1.4,  tr: "0.08em",  use: "Form labels, categorías" },
];

function PageTypography() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="05" title="Typography" subtitle="Tipografía oficial: Poppins. Una sola familia, múltiples pesos." />

      {/* Font card */}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <Label>Familia Principal</Label>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 36, fontWeight: 700, color: C.teal[900], margin: 0 }}>Poppins</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4 }}>Google Fonts — Libre y de acceso público</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Light 300", "Regular 400", "Medium 500", "SemiBold 600", "Bold 700", "ExtraBold 800"].map(w => (
              <span key={w} style={{ padding: "4px 12px", borderRadius: 999, background: C.teal[50], color: C.teal[700], fontSize: 11, fontFamily: "'Poppins', sans-serif" }}>{w}</span>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.teal[100]}`, paddingTop: 16 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, color: C.teal[900] }}>
              AaBbCcDdEeFfGgHhIiJjKk
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, color: C.neutral[500], marginTop: 4 }}>
              0123456789 !@#$%&*()
            </p>
          </div>
        </Card>
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <Label>Mono (Código / Tokens)</Label>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 500, color: C.teal[900], margin: 0 }}>DM Mono</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4 }}>Usado exclusivamente para código y tokens</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Light 300", "Regular 400", "Medium 500"].map(w => (
              <span key={w} style={{ padding: "4px 12px", borderRadius: 999, background: C.purple[50], color: C.purple[600], fontSize: 11, fontFamily: "'Poppins', sans-serif" }}>{w}</span>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.teal[100]}`, paddingTop: 16 }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: C.teal[900] }}>
              color.brand.primary = #45A99A
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.neutral[500], marginTop: 6 }}>
              spacing.16 / radius.md / shadow.sm
            </p>
          </div>
        </Card>
      </div>

      {/* Scale table */}
      <div style={{ marginTop: 32, borderRadius: 16, border: `1px solid ${C.teal[100]}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 64px 64px 72px 1fr", gap: 0, padding: "10px 20px", background: C.teal[50] }}>
          {["Estilo", "Size", "Weight", "Line H.", "Uso recomendado"].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{h}</span>
          ))}
        </div>
        {TYPE_SCALE.map((t, i) => (
          <div key={t.name} style={{ display: "grid", gridTemplateColumns: "140px 64px 64px 72px 1fr", gap: 0, padding: "14px 20px", background: i % 2 === 0 ? "#fff" : C.neutral[50], borderTop: `1px solid ${C.teal[50]}`, alignItems: "center" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: t.wt, fontSize: Math.min(t.sz, 20), color: C.teal[900], lineHeight: 1, letterSpacing: t.tr }}>{t.name}</span>
            <code style={{ fontSize: 11, color: C.neutral[500], fontFamily: "'DM Mono', monospace" }}>{t.sz}px</code>
            <code style={{ fontSize: 11, color: C.neutral[500], fontFamily: "'DM Mono', monospace" }}>{t.wt}</code>
            <code style={{ fontSize: 11, color: C.neutral[500], fontFamily: "'DM Mono', monospace" }}>{t.lh}</code>
            <span style={{ fontSize: 12, color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{t.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 06 — Logo System ────────────────────────────────────────────────────
function PageLogo() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="06" title="Logo System" subtitle="Sistema completo de logotipos oficiales — variantes, tamaños y contextos de uso." />

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {[
          { label: "Principal — Full Color", bg: "#ffffff",    border: C.teal[100], content: <OfficialLogoAsset width={210} /> },
          { label: "Monocromática",          bg: "#ffffff",    border: C.teal[100], content: <OfficialLogoAsset variant="mono" width={210} /> },
          { label: "Negativa",               bg: C.teal[900],  border: "transparent", content: <OfficialLogoAsset variant="negative" width={210} /> },
          { label: "Isotipo — Full Color",   bg: C.neutral[50],border: C.teal[100], content: <LuremsMark size={92} /> },
          { label: "Isotipo — Negativo",     bg: C.teal[900],  border: "transparent", content: <LuremsMark size={92} variant="negative" /> },
          { label: "Responsive / Mini",      bg: C.teal[50],   border: C.teal[100], content: <LuremsMark size={42} /> },
        ].map(({ label, bg, border, content }) => (
          <div key={label} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>
            <div style={{ background: bg, padding: 28, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 164 }}>
              {content}
            </div>
            <div style={{ background: "#fff", padding: "10px 16px", borderTop: `1px solid ${C.teal[50]}` }}>
              <p style={{ fontSize: 11, color: C.neutral[500], fontFamily: "'Poppins', sans-serif" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive logo */}
      <div style={{ marginTop: 40 }}>
        <Label>Responsive Logo — Comportamiento por breakpoint</Label>
        <Card>
          {[
            { bp: "≥ 1280px — Desktop", content: <OfficialLogoAsset width={220} /> },
            { bp: "≥ 768px — Tablet",   content: <OfficialLogoAsset width={170} /> },
            { bp: "< 768px — Mobile",   content: <LuremsLogo markSize={18} wordSize={20} /> },
            { bp: "Mini / Nav icon",    content: <LuremsMark size={22} /> },
          ].map(({ bp, content }) => (
            <div key={bp} style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 0", borderBottom: `1px solid ${C.teal[50]}` }}>
              <code style={{ fontSize: 11, color: C.neutral[400], fontFamily: "'DM Mono', monospace", width: 200, flexShrink: 0 }}>{bp}</code>
              <div>{content}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 07 — Iconography ────────────────────────────────────────────────────
function PageIconography() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="07" title="Iconography" subtitle="Reglas de estilo para el sistema de iconografía. Librería base: Lucide Icons." />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { prop: "Stroke Width", val: "1.5px",     note: "Trazo consistente en todos los iconos del sistema" },
          { prop: "Grid Base",    val: "24×24px",   note: "Canvas principal de diseño. Escalar a 16px y 32px" },
          { prop: "Corner Radius",val: "2px",       note: "Esquinas ligeramente redondeadas, no agudas" },
          { prop: "Padding",      val: "2px",       note: "Margen interno de seguridad sobre la grilla" },
          { prop: "Estilo",       val: "Outline",   note: "Iconos de trazo únicamente. Solid solo en énfasis" },
          { prop: "Librería",     val: "Lucide",    note: "Compatible al 100% con las reglas definidas" },
        ].map(({ prop, val, note }) => (
          <Card key={prop}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{prop}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: C.teal[500], fontFamily: "'Poppins', sans-serif", margin: "8px 0 4px" }}>{val}</p>
            <p style={{ fontSize: 12, color: C.neutral[400], lineHeight: 1.5 }}>{note}</p>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <Label>Icon Grid — 24×24px base</Label>
        <div style={{ display: "flex", justifyContent: "center", padding: 40, background: C.neutral[50], borderRadius: 16, border: `1px solid ${C.teal[100]}` }}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            <rect x="0.5" y="0.5" width="119" height="119" rx="9.5" fill="none" stroke={C.teal[200]} strokeWidth="1"/>
            {[20, 40, 80, 100].map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={120} stroke={C.teal[100]} strokeWidth="0.5"/>)}
            {[20, 40, 80, 100].map(y => <line key={`h${y}`} x1={0} y1={y} x2={120} y2={y} stroke={C.teal[100]} strokeWidth="0.5"/>)}
            <line x1="60" y1="0" x2="60" y2="120" stroke={C.teal[200]} strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="0" y1="60" x2="120" y2="60" stroke={C.teal[200]} strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="60" cy="60" r="2" fill={C.teal[500]}/>
            <rect x="30" y="30" width="60" height="60" rx="2" fill="none" stroke={C.teal[300]} strokeWidth="1" strokeDasharray="3 3"/>
            {/* Sample icon — heart */}
            <path d="M60 78 C60 78 40 66 40 54 C40 48 45 44 50 44 C55 44 58 47 60 50 C62 47 65 44 70 44 C75 44 80 48 80 54 C80 66 60 78 60 78Z" stroke={C.teal[500]} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 08 — Grid ───────────────────────────────────────────────────────────
function GridDemo({ label, cols, margin, gutter, width, height = 64 }: { label: string; cols: number; margin: number; gutter: number; width: string; height?: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: `20px ${margin}px`, background: C.neutral[50] }}>
          <div style={{ display: "flex", gap: gutter }}>
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} style={{ flex: 1, height, borderRadius: 6, background: `rgba(69,169,154,0.12)`, border: `1px solid rgba(69,169,154,0.2)` }}/>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "12px 20px", background: "#fff", borderTop: `1px solid ${C.teal[50]}` }}>
          {[["Ancho", width], ["Columnas", cols.toString()], ["Margen", `${margin}px`], ["Gutter", `${gutter}px`]].map(([k, v]) => (
            <div key={k as string}>
              <p style={{ fontSize: 10, color: C.neutral[400], marginBottom: 2 }}>{k as string}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.teal[900], fontFamily: "'DM Mono', monospace" }}>{v as string}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PageGrid() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="08" title="Grid System" subtitle="Sistema de grilla responsivo para Desktop, Tablet y Mobile." />
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
        <GridDemo label="Desktop — 1440px" cols={12} margin={80} gutter={8} width="1440px" />
        <GridDemo label="Laptop — 1280px" cols={12} margin={48} gutter={8} width="1280px" />
        <GridDemo label="Tablet — 768px" cols={8} margin={32} gutter={8} width="768px" height={48} />
        <GridDemo label="Mobile — 375px" cols={4} margin={16} gutter={8} width="375px" height={40} />
      </div>
      <div style={{ marginTop: 32 }}>
        <Label>Breakpoints Oficiales</Label>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {[
            { bp: "xs", px: "< 375px",  desc: "Móviles pequeños — diseño simplificado" },
            { bp: "sm", px: "375px",    desc: "Móvil estándar — 4 columnas, 16px margen" },
            { bp: "md", px: "768px",    desc: "Tablet — 8 columnas, 32px margen" },
            { bp: "lg", px: "1024px",   desc: "Laptop — 12 columnas, 48px margen" },
            { bp: "xl", px: "1280px",   desc: "Desktop estándar — 12 columnas, 64px margen" },
            { bp: "2xl","px": "1440px", desc: "Wide desktop — 12 columnas, 80px margen" },
          ].map(({ bp, px, desc }, i) => (
            <div key={bp} style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 20px", background: i % 2 === 0 ? "#fff" : C.neutral[50], borderTop: i > 0 ? `1px solid ${C.teal[50]}` : "none" }}>
              <code style={{ fontSize: 13, fontWeight: 700, color: C.teal[500], fontFamily: "'DM Mono', monospace", width: 32 }}>{bp}</code>
              <code style={{ fontSize: 12, color: C.neutral[400], fontFamily: "'DM Mono', monospace", width: 72 }}>{px}</code>
              <span style={{ fontSize: 13, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{desc}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 09 — Spacing ────────────────────────────────────────────────────────
function PageSpacing() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="09" title="Spacing" subtitle="Escala de espaciado basada en múltiplos de 4px. Base 4 = 1 unidad." />
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
        {SPACING.map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <code style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: C.teal[600], width: 40, textAlign: "right" }}>{s}</code>
            <div style={{ width: s * 2.5, height: 28, borderRadius: 6, background: `linear-gradient(to right, ${C.teal[500]}, ${C.teal[300]})`, flexShrink: 0, minWidth: 4 }}/>
            <div style={{ display: "flex", gap: 16 }}>
              <code style={{ fontSize: 11, color: C.neutral[400], fontFamily: "'DM Mono', monospace" }}>{s}px</code>
              <code style={{ fontSize: 11, color: C.neutral[300], fontFamily: "'DM Mono', monospace" }}>spacing.{s}</code>
              <code style={{ fontSize: 11, color: C.neutral[300], fontFamily: "'DM Mono', monospace" }}>{s / 4}rem / {s / 4}u</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 10 — Elevation ──────────────────────────────────────────────────────
function PageElevation() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="10" title="Elevation" subtitle="Sistema de sombras que establece jerarquía de profundidad." />
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
        {(Object.entries(ELEVATION) as [string, string][]).map(([level, shadow]) => (
          <div key={level} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: "100%", background: "#fff", borderRadius: 16, padding: "32px 0", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: shadow }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: C.teal[500] }}>{level.toUpperCase()}</span>
            </div>
            <code style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'DM Mono', monospace", textAlign: "center" }}>shadow.{level}</code>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <Label>Valores de sombra</Label>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {(Object.entries(ELEVATION) as [string, string][]).map(([level, shadow], i) => (
            <div key={level} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", background: i % 2 === 0 ? "#fff" : C.neutral[50], borderTop: i > 0 ? `1px solid ${C.teal[50]}` : "none" }}>
              <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, color: C.teal[500], width: 60 }}>shadow.{level}</code>
              <code style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.neutral[500], flex: 1 }}>{shadow}</code>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 11 — Border Radius ──────────────────────────────────────────────────
function PageRadius() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="11" title="Border Radius" subtitle="Escala de radios para mantener consistencia visual en todos los componentes." />
      <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
        {(Object.entries(RADIUS) as [string, string][]).map(([name, value]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 80, height: 80, background: C.teal[50], borderRadius: value, border: `2px solid ${C.teal[400]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.teal[600], fontFamily: "'Poppins', sans-serif" }}>{name}</span>
            </div>
            <code style={{ fontSize: 11, color: C.neutral[500], fontFamily: "'DM Mono', monospace" }}>{value}</code>
            <code style={{ fontSize: 10, color: C.neutral[300], fontFamily: "'DM Mono', monospace" }}>radius.{name}</code>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40 }}>
        <Label>Uso recomendado por contexto</Label>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {[
            ["radius.xs — 2px",   "Chips internos, divisores pequeños"],
            ["radius.s — 4px",    "Badges, tags, etiquetas compactas"],
            ["radius.m — 8px",    "Inputs, botones secundarios, menú items"],
            ["radius.l — 12px",   "Cards, modales, popovers"],
            ["radius.xl — 20px",  "Botones primarios, paneles destacados"],
            ["radius.2xl — 32px", "App icons, hero cards, ilustraciones"],
            ["radius.full",       "Avatares, badges circulares, pills"],
          ].map(([token, use], i) => (
            <div key={token} style={{ display: "flex", gap: 24, padding: "12px 20px", background: i % 2 === 0 ? "#fff" : C.neutral[50], borderTop: i > 0 ? `1px solid ${C.teal[50]}` : "none" }}>
              <code style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: C.teal[500], width: 180, flexShrink: 0 }}>{token}</code>
              <span style={{ fontSize: 13, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{use}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 12 — Components ─────────────────────────────────────────────────────
function PageComponents() {
  const [tab, setTab] = useState("Inicio");
  const [inputVal, setInputVal] = useState("");

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="12" title="Components" subtitle="Biblioteca completa con Auto Layout. Todos los estados incluidos." />

      {/* NAVBAR */}
      <div style={{ marginTop: 40 }}><Label>Navbar</Label>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.teal[100]}`, boxShadow: ELEVATION.s }}>
          <div style={{ background: "#fff", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <LuremsLogo markSize={22} wordSize={14} />
            <div style={{ display: "flex", gap: 4 }}>
              {["Inicio", "Psicólogos", "Blog", "Recursos"].map(item => (
                <button key={item} onClick={() => setTab(item)} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontFamily: "'Poppins', sans-serif", fontWeight: tab === item ? 600 : 400, color: tab === item ? C.teal[500] : C.neutral[500], background: tab === item ? C.teal[50] : "transparent", border: "none", cursor: "pointer" }}>
                  {item}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: C.teal[600], background: "transparent", border: `1px solid ${C.teal[200]}`, cursor: "pointer" }}>Iniciar sesión</button>
              <button style={{ padding: "8px 18px", borderRadius: 10, fontSize: 13, fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#fff", background: C.teal[500], border: "none", cursor: "pointer" }}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: 32 }}><Label>Buttons — Variantes y tamaños</Label>
        <Card>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
            {[
              { label: "Primario",       bg: C.teal[500],    text: "#fff",     border: "none" },
              { label: "Secundario",     bg: C.teal[50],     text: C.teal[600],border: `1px solid ${C.teal[300]}` },
              { label: "Ghost",          bg: "transparent",  text: C.teal[600],border: "none" },
              { label: "Paciente",       bg: C.green[500],   text: "#fff",     border: "none" },
              { label: "Psicólogo",      bg: C.purple[500],  text: "#fff",     border: "none" },
              { label: "Esperanza",      bg: C.hope[400],    text: C.hope[900],border: "none" },
              { label: "Destructivo",    bg: "#E05454",      text: "#fff",     border: "none" },
            ].map(({ label, bg, text, border }) => (
              <button key={label} style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "'Poppins', sans-serif", background: bg, color: text, border, cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[["Grande", "12px 28px", 15], ["Medio", "9px 20px", 13], ["Pequeño", "6px 14px", 11], ["XS", "4px 10px", 10]].map(([label, pad, fs]) => (
              <button key={label as string} style={{ padding: pad as string, borderRadius: 10, fontSize: fs as number, fontWeight: 600, fontFamily: "'Poppins', sans-serif", background: C.teal[500], color: "#fff", border: "none", cursor: "pointer" }}>
                {label}
              </button>
            ))}
            <button style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "'Poppins', sans-serif", background: C.neutral[100], color: C.neutral[400], border: "none", cursor: "not-allowed", opacity: 0.6 }}>
              Deshabilitado
            </button>
          </div>
        </Card>
      </div>

      {/* INPUTS */}
      <div style={{ marginTop: 32 }}><Label>Inputs — Estados</Label>
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Nombre completo", placeholder: "Ana García López", type: "text", state: "default" },
              { label: "Correo electrónico", placeholder: "ana@lurems.com", type: "email", state: "default" },
              { label: "Email — Error", placeholder: "ana@", type: "email", state: "error", hint: "Correo electrónico inválido" },
              { label: "Teléfono — Éxito", placeholder: "+52 55 1234 5678", type: "tel", state: "success", hint: "Número verificado" },
            ].map(({ label, placeholder, type, state, hint }) => (
              <div key={label}>
                <p style={{ fontSize: 12, fontWeight: 600, color: state === "error" ? "#E05454" : state === "success" ? C.green[600] : C.teal[900], marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>{label}</p>
                <input placeholder={placeholder} type={type}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, outline: "none", fontFamily: "'Poppins', sans-serif", fontSize: 13, color: C.teal[900], background: state === "error" ? "#FFF5F5" : state === "success" ? C.green[50] : C.neutral[50], border: `1.5px solid ${state === "error" ? "#E05454" : state === "success" ? C.green[500] : C.teal[200]}`, boxSizing: "border-box" }}/>
                {hint && <p style={{ fontSize: 11, marginTop: 4, color: state === "error" ? "#E05454" : C.green[600], fontFamily: "'Poppins', sans-serif" }}>{hint}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* CARDS */}
      <div style={{ marginTop: 32 }}><Label>Cards — Variantes de contenido</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { title: "Sesión próxima", sub: "Hoy, 16:00 h", body: "Sesión de seguimiento con la Dra. Sofía Martínez. Duración: 50 min.", color: C.teal[500], bg: C.teal[50] },
            { title: "Progreso semanal", sub: "7 de 7 días", body: "Has completado tu registro emocional todos los días. ¡Excelente constancia!", color: C.green[500], bg: C.green[50] },
            { title: "Nuevo recurso", sub: "Técnica de respiración", body: "Tu psicóloga ha compartido un ejercicio de mindfulness para esta semana.", color: C.purple[500], bg: C.purple[50] },
          ].map(({ title, sub, body, color, bg }) => (
            <div key={title} style={{ borderRadius: 16, background: "#fff", border: `1px solid ${color}20`, overflow: "hidden", boxShadow: ELEVATION.xs }}>
              <div style={{ height: 4, background: color }}/>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
                  <span style={{ fontSize: 10, color: C.neutral[400] }}>{sub}</span>
                </div>
                <p style={{ fontSize: 13, color: C.teal[800], lineHeight: 1.6, marginTop: 8, fontFamily: "'Poppins', sans-serif" }}>{body}</p>
                <button style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color, fontFamily: "'Poppins', sans-serif", background: "none", border: "none", padding: 0, cursor: "pointer" }}>Ver más →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALERTS */}
      <div style={{ marginTop: 32 }}><Label>Alerts — Estados del sistema</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "✓", bg: C.green[50],   border: C.green[300],  text: C.green[900],  msg: "Sesión completada exitosamente. Tu registro fue guardado." },
            { icon: "⚠", bg: C.hope[50],    border: C.hope[300],   text: C.hope[900],   msg: "Tienes una sesión programada en 30 minutos con la Dra. Martínez." },
            { icon: "✗", bg: "#FFF0F0",      border: "#FFBDBD",     text: "#7F1D1D",     msg: "No fue posible conectar con tu terapeuta. Por favor, intenta de nuevo." },
            { icon: "i", bg: C.purple[50],  border: C.purple[200], text: C.purple[900], msg: "Tu plan de sesiones se renueva el 15 de agosto. Revisa tu suscripción." },
          ].map(({ icon, bg, border, text, msg }) => (
            <div key={msg} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 12, background: bg, border: `1px solid ${border}` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: text, flexShrink: 0 }}>{icon}</span>
              <p style={{ fontSize: 13, color: text, fontFamily: "'Poppins', sans-serif", lineHeight: 1.5 }}>{msg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BADGES & CHIPS */}
      <div style={{ marginTop: 32 }}><Label>Badges — Chips — Tags</Label>
        <Card>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { label: "Activo",      bg: C.teal[100],   text: C.teal[700]   },
              { label: "Pendiente",   bg: C.hope[100],   text: C.hope[800]   },
              { label: "Completado",  bg: C.green[100],  text: C.green[700]  },
              { label: "Profesional", bg: C.purple[100], text: C.purple[700] },
              { label: "Urgente",     bg: "#FFEDED",     text: "#D32F2F"     },
              { label: "Pro",         bg: C.teal[500],   text: "#fff"        },
              { label: "Nuevo",       bg: C.green[500],  text: "#fff"        },
              { label: "Beta",        bg: C.purple[500], text: "#fff"        },
              { label: "Gratis",      bg: C.hope[400],   text: C.hope[900]   },
            ].map(({ label, bg, text }) => (
              <span key={label} style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: bg, color: text, fontFamily: "'Poppins', sans-serif" }}>
                {label}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* AVATARS */}
      <div style={{ marginTop: 32 }}><Label>Avatars — Estados de presencia</Label>
        <Card>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            {[
              { init: "AG", size: 56, color: C.teal[500],   status: "online",  role: "Paciente" },
              { init: "SM", size: 48, color: C.purple[500], status: "online",  role: "Psicólogo" },
              { init: "JR", size: 40, color: C.green[500],  status: "away",    role: "Paciente" },
              { init: "DP", size: 32, color: C.teal[700],   status: "offline", role: "Admin" },
            ].map(({ init, size, color, status, role }) => (
              <div key={init} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: size * 0.33, color: "#fff" }}>
                    {init}
                  </div>
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: status === "online" ? C.green[500] : status === "away" ? C.hope[400] : C.neutral[300], border: "2px solid #fff" }}/>
                </div>
                <span style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 32 }}><Label>Footer</Label>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.teal[100]}` }}>
          <div style={{ background: C.teal[900], padding: "32px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
              <div>
                <LuremsLogo markSize={28} wordSize={18} wordColor="#ffffff" />
                <p style={{ marginTop: 12, fontSize: 13, color: C.teal[400], fontFamily: "'Poppins', sans-serif", maxWidth: 240, lineHeight: 1.7 }}>
                  Acompañando cada paso de tu proceso terapéutico.
                </p>
              </div>
              {[
                { title: "Plataforma", links: ["Iniciar sesión", "Registrarse", "Precios", "Para psicólogos"] },
                { title: "Recursos",   links: ["Blog", "Guías", "FAQ", "Soporte"] },
                { title: "Empresa",    links: ["Nosotros", "Equipo", "Privacidad", "Términos"] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.teal[500], marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>{title}</p>
                  {links.map(l => <p key={l} style={{ fontSize: 13, color: C.teal[300], marginBottom: 8, fontFamily: "'Poppins', sans-serif', cursor: 'pointer" }}>{l}</p>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid rgba(69,169,154,0.15)`, marginTop: 28, paddingTop: 20, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: C.teal[600], fontFamily: "'Poppins', sans-serif" }}>© 2025 Lurems. Todos los derechos reservados.</span>
              <span style={{ fontSize: 11, color: C.teal[600], fontFamily: "'DM Mono', monospace" }}>lurems.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 13 — Patterns ───────────────────────────────────────────────────────
function PagePatterns() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="13" title="Patterns" subtitle="Patrones visuales que definen el lenguaje visual de Lurems." />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Faro pattern */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: 180, background: `linear-gradient(135deg, ${C.teal[900]}, #0A2220)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} viewBox="0 0 400 180">
              <path d="M200 180 Q240 120 280 60 Q320 10 380 -10" stroke={C.hope[300]} strokeWidth="60" fill="none"/>
              <path d="M200 180 Q160 120 120 60 Q80 10 20 -10" stroke={C.hope[400]} strokeWidth="40" fill="none"/>
            </svg>
            <LuremsMark size={64} />
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>Uso del Faro</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>El faro siempre emite luz hacia adelante. Simboliza claridad y dirección en el proceso terapéutico. No rotar, no modificar.</p>
          </div>
        </Card>

        {/* Camino pattern */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: 180, background: C.teal[50], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="320" height="160" viewBox="0 0 320 160">
              <path d="M10 140 Q80 100 160 120 Q240 140 310 90" stroke={C.teal[400]} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M10 155 Q80 115 160 135 Q240 155 310 105" stroke={C.teal[300]} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
              <circle cx="160" cy="120" r="5" fill={C.teal[500]}/>
              <circle cx="160" cy="120" r="14" fill="none" stroke={C.teal[400]} strokeWidth="1" opacity="0.4"/>
              <circle cx="160" cy="120" r="24" fill="none" stroke={C.teal[300]} strokeWidth="0.5" opacity="0.3"/>
            </svg>
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>El Camino Terapéutico</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>Las líneas fluidas representan el proceso terapéutico. No es lineal — tiene altibajos, pero siempre avanza hacia adelante.</p>
          </div>
        </Card>

        {/* Esperanza */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: 180, background: `linear-gradient(135deg, ${C.hope[50]}, ${C.hope[100]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="16" fill={C.hope[400]} opacity="0.9"/>
                <circle cx="32" cy="32" r="24" fill="none" stroke={C.hope[300]} strokeWidth="1" opacity="0.6"/>
                <circle cx="32" cy="32" r="30" fill="none" stroke={C.hope[200]} strokeWidth="0.5" opacity="0.4"/>
                {[0,45,90,135,180,225,270,315].map(angle => (
                  <line key={angle} x1="32" y1="32" x2={32 + Math.cos(angle * Math.PI / 180) * 30} y2={32 + Math.sin(angle * Math.PI / 180) * 30} stroke={C.hope[300]} strokeWidth="1" opacity="0.5"/>
                ))}
                <circle cx="32" cy="32" r="6" fill="white"/>
              </svg>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>Color Esperanza — Amber</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>El ámbar representa la luz del faro. Se usa con moderación para celebración, logros y momentos positivos.</p>
          </div>
        </Card>

        {/* Color por rol */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ height: 180, background: C.neutral[50], display: "flex", alignItems: "center", justifyContent: "center", gap: 32 }}>
            {[
              { color: C.teal[500],   label: "Marca",     icon: "⚓" },
              { color: C.green[500],  label: "Paciente",  icon: "♥" },
              { color: C.purple[500], label: "Psicólogo", icon: "★" },
            ].map(({ color, label, icon }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${color}, ${color}CC)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: ELEVATION.m }}>
                  {icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{label}</span>
                <code style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'DM Mono', monospace" }}>{color}</code>
              </div>
            ))}
          </div>
          <div style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>Color por Rol de Usuario</p>
            <p style={{ fontSize: 12, color: C.neutral[400], marginTop: 4, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>Teal = marca general. Verde = interfaz de paciente. Morado = interfaz de psicólogo. Nunca mezclar roles.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE 14 — Brand Applications ────────────────────────────────────────────
function PageApplications() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="14" title="Brand Applications" subtitle="Ejemplos de la identidad aplicada en distintos formatos y plataformas." />

      {/* Landing preview */}
      <div style={{ marginTop: 40 }}>
        <Label>Landing Page — Desktop</Label>
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${C.teal[100]}`, boxShadow: ELEVATION.l }}>
          {/* Nav */}
          <div style={{ background: "#fff", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.teal[50]}` }}>
            <LuremsLogo markSize={24} wordSize={16} />
            <div style={{ display: "flex", gap: 24 }}>
              {["Inicio", "Psicólogos", "Cómo funciona", "Blog"].map(item => (
                <span key={item} style={{ fontSize: 13, color: C.teal[700], fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}>{item}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "7px 16px", fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: C.teal[600], background: "transparent", border: `1px solid ${C.teal[200]}`, borderRadius: 8, cursor: "pointer" }}>Iniciar sesión</button>
              <button style={{ padding: "7px 16px", fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#fff", background: C.teal[500], border: "none", borderRadius: 8, cursor: "pointer" }}>Registrarse</button>
            </div>
          </div>
          {/* Hero */}
          <div style={{ background: C.teal[50], padding: "60px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
            <div style={{ maxWidth: 440 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, background: C.teal[100], marginBottom: 20 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.teal[600], fontFamily: "'Poppins', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Plataforma de salud mental</span>
              </div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 36, color: C.teal[900], lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
                Te ayudamos a encontrar al psicólogo ideal para ti
              </h1>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: C.neutral[500], lineHeight: 1.7, marginBottom: 28 }}>
                Conecta con profesionales certificados. Agenda tu primera sesión hoy y comienza tu proceso terapéutico con acompañamiento real.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: "'Poppins', sans-serif", background: C.teal[500], color: "#fff", border: "none", cursor: "pointer" }}>Encontrar psicólogo</button>
                <button style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif", background: "transparent", color: C.teal[600], border: `1.5px solid ${C.teal[300]}`, cursor: "pointer" }}>Ver cómo funciona</button>
              </div>
            </div>
            {/* Illustration placeholder */}
            <div style={{ flexShrink: 0, width: 280, height: 220, borderRadius: 20, background: `linear-gradient(135deg, ${C.teal[200]}, ${C.green[200]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LuremsMark size={72} />
            </div>
          </div>
          {/* Cómo funciona */}
          <div style={{ background: "#fff", padding: "32px 40px" }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: C.teal[900], textAlign: "center", marginBottom: 20 }}>¿Cómo funciona?</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { n: "01", title: "Regístrate",       body: "Crea tu cuenta en menos de 2 minutos" },
                { n: "02", title: "Explora",           body: "Encuentra psicólogos según tu necesidad" },
                { n: "03", title: "Agenda",            body: "Selecciona horario y modalidad de sesión" },
                { n: "04", title: "Comienza",          body: "Inicia tu proceso terapéutico hoy mismo" },
              ].map(({ n, title, body }) => (
                <div key={n} style={{ textAlign: "center", padding: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: C.teal[100], display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 13, fontWeight: 700, color: C.teal[600], fontFamily: "'Poppins', sans-serif" }}>{n}</div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: C.teal[900], fontFamily: "'Poppins', sans-serif", marginBottom: 4 }}>{title}</p>
                  <p style={{ fontSize: 12, color: C.neutral[400], lineHeight: 1.5, fontFamily: "'Poppins', sans-serif" }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App */}
      <div style={{ marginTop: 40 }}>
        <Label>App Móvil — Dashboard Paciente</Label>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: 200, borderRadius: 28, border: `1px solid ${C.teal[100]}`, overflow: "hidden", boxShadow: ELEVATION.l, flexShrink: 0 }}>
            {/* Status bar */}
            <div style={{ background: C.teal[500], padding: "10px 14px 8px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontFamily: "'Poppins', sans-serif" }}>9:41</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.8)" }}>●●●</span>
            </div>
            {/* Header */}
            <div style={{ background: C.teal[500], padding: "8px 14px 20px" }}>
              <p style={{ fontSize: 11, color: C.teal[200], fontFamily: "'Poppins', sans-serif" }}>Buenos días</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Poppins', sans-serif" }}>Ana García 👋</p>
            </div>
            {/* Content */}
            <div style={{ background: C.neutral[50], padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ label: "Sesiones", val: "4", color: C.teal[500] }, { label: "Racha", val: "12d", color: C.green[500] }].map(({ label, val, color }) => (
                  <div key={label} style={{ background: "#fff", borderRadius: 12, padding: 10, border: `1px solid ${C.teal[50]}` }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Poppins', sans-serif" }}>{val}</p>
                    <p style={{ fontSize: 9, color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{label}</p>
                  </div>
                ))}
              </div>
              {/* Next session card */}
              <div style={{ background: "#fff", borderRadius: 12, padding: 12, border: `1px solid ${C.teal[50]}` }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: C.teal[500], textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Poppins', sans-serif" }}>Próxima sesión</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.teal[900], marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>Hoy — 16:00 h</p>
                <p style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>Dra. Sofía Martínez</p>
                <div style={{ marginTop: 8, padding: "6px 0", borderRadius: 8, background: C.teal[500], textAlign: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", fontFamily: "'Poppins', sans-serif" }}>Unirse ahora</span>
                </div>
              </div>
              {/* Bottom nav */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "10px 0", display: "flex", justifyContent: "space-around", border: `1px solid ${C.teal[50]}` }}>
                {["🏠", "📅", "💬", "👤"].map((icon, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? C.teal[500] : "transparent" }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>Business Cards</Label>
            {/* Dark card */}
            <div style={{ width: 340, height: 190, borderRadius: 20, background: `linear-gradient(135deg, ${C.teal[900]}, #0A2220)`, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: ELEVATION.l }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <LuremsLogo markSize={28} wordSize={18} wordColor="#ffffff" />
                <code style={{ fontSize: 10, color: C.teal[500], fontFamily: "'DM Mono', monospace" }}>lurems.com</code>
              </div>
              <div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>Dra. Sofía Martínez</p>
                <p style={{ fontSize: 11, color: C.teal[400], marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>Psicóloga Clínica · TCC</p>
                <p style={{ fontSize: 11, color: C.teal[500], marginTop: 8, fontFamily: "'Poppins', sans-serif" }}>sofia@lurems.com</p>
              </div>
            </div>
            {/* Light card */}
            <div style={{ width: 340, height: 190, borderRadius: 20, background: "#fff", border: `1px solid ${C.teal[100]}`, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: ELEVATION.m }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <LuremsLogo markSize={28} wordSize={18} />
                <code style={{ fontSize: 10, color: C.teal[500], fontFamily: "'DM Mono', monospace" }}>lurems.com</code>
              </div>
              <div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: C.teal[900] }}>Ana García López</p>
                <p style={{ fontSize: 11, color: C.neutral[400], marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>Product Designer</p>
                <p style={{ fontSize: 11, color: C.teal[500], marginTop: 8, fontFamily: "'Poppins', sans-serif" }}>ana@lurems.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div style={{ marginTop: 40 }}>
        <Label>Social Media</Label>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "Post 1:1", w: 240, h: 240, bg: `linear-gradient(145deg, ${C.teal[900]}, #0A2220)`,
              content: <div style={{ padding: 24, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                <LuremsMark size={40} />
                <div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", lineHeight: 1.3 }}>Tu bienestar es el camino</p>
                  <p style={{ fontSize: 12, color: C.teal[400], marginTop: 8, fontFamily: "'Poppins', sans-serif" }}>Comienza hoy · lurems.com</p>
                </div>
              </div>
            },
            { label: "Story 9:16", w: 135, h: 240, bg: `linear-gradient(180deg, ${C.teal[500]}, ${C.teal[900]})`,
              content: <div style={{ padding: 16, display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-end" }}>
                <LuremsMark size={32} />
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginTop: 8, lineHeight: 1.3 }}>Lurems</p>
                <p style={{ fontSize: 10, color: C.teal[300], fontFamily: "'Poppins', sans-serif" }}>Un faro en tu proceso</p>
              </div>
            },
            { label: "Banner 16:9", w: 320, h: 180, bg: C.teal[50],
              content: <div style={{ padding: 24, display: "flex", alignItems: "center", gap: 16, height: "100%" }}>
                <LuremsMark size={56} />
                <div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 18, color: C.teal[900], lineHeight: 1.2 }}>Encuentra a tu psicólogo ideal</p>
                  <p style={{ fontSize: 12, color: C.neutral[500], marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>lurems.com</p>
                </div>
              </div>
            },
          ].map(({ label, w, h, bg, content }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: w, height: h, borderRadius: 16, background: bg, overflow: "hidden", boxShadow: ELEVATION.m }}>
                {content}
              </div>
              <span style={{ fontSize: 10, color: C.neutral[400], fontFamily: "'Poppins', sans-serif", textAlign: "center" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 15 — Design Tokens ──────────────────────────────────────────────────
function CodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ background: "#1A2E2C", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#E05454", C.hope[400], C.green[500]].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.neutral[400], marginLeft: 6 }}>{filename}</span>
      </div>
      <div style={{ background: "#0E2422", padding: 20, overflowX: "auto" }}>
        <pre style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.8, color: "#E8F5F3" }}>{code}</pre>
      </div>
    </div>
  );
}

function PageTokens() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
      <SectionHeader number="15" title="Design Tokens" subtitle="Tokens exportables para Vue.js, Vuetify y CSS Variables. Nomenclatura estándar." />

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <CodeBlock filename="lurems-tokens.json" code={`{
  "color": {
    "brand": {
      "primary":    "${C.teal[500]}",
      "secondary":  "${C.teal[400]}",
      "dark":       "${C.teal[900]}",
      "light":      "${C.teal[200]}",
      "subtle":     "${C.teal[50]}"
    },
    "patient": {
      "primary":    "${C.green[500]}",
      "light":      "${C.green[100]}",
      "dark":       "${C.green[800]}"
    },
    "psychologist": {
      "primary":    "${C.purple[500]}",
      "light":      "${C.purple[100]}",
      "dark":       "${C.purple[800]}"
    },
    "hope": {
      "primary":    "${C.hope[400]}",
      "light":      "${C.hope[100]}",
      "dark":       "${C.hope[700]}"
    }
  }
}`} />

        <CodeBlock filename="lurems-tokens.json (cont.)" code={`{
  "spacing": {
    "4":   "4px",   "8":  "8px",
    "12":  "12px",  "16": "16px",
    "20":  "20px",  "24": "24px",
    "32":  "32px",  "40": "40px",
    "48":  "48px",  "56": "56px",
    "64":  "64px",  "80": "80px",
    "96":  "96px"
  },
  "radius": {
    "xs": "2px",  "s":  "4px",
    "m":  "8px",  "l":  "12px",
    "xl": "20px", "2xl":"32px",
    "full": "9999px"
  },
  "shadow": {
    "xs": "0 1px 3px rgba(26,58,56,0.06)",
    "s":  "0 2px 8px rgba(26,58,56,0.08)",
    "m":  "0 4px 16px rgba(26,58,56,0.10)",
    "l":  "0 8px 32px rgba(26,58,56,0.12)",
    "xl": "0 16px 56px rgba(26,58,56,0.16)"
  }
}`} />

        <CodeBlock filename="lurems-tokens.css" code={`:root {
  /* Brand — Teal */
  --color-brand-primary:        ${C.teal[500]};
  --color-brand-dark:           ${C.teal[900]};
  --color-brand-light:          ${C.teal[200]};
  --color-brand-subtle:         ${C.teal[50]};

  /* Patient — Green */
  --color-patient-primary:      ${C.green[500]};
  --color-patient-light:        ${C.green[100]};

  /* Psychologist — Purple */
  --color-psychologist-primary: ${C.purple[500]};
  --color-psychologist-light:   ${C.purple[100]};

  /* Hope — Amber */
  --color-hope-primary:         ${C.hope[400]};
  --color-hope-light:           ${C.hope[100]};

  /* Typography */
  --font-brand:   'Poppins', sans-serif;
  --font-mono:    'DM Mono', monospace;

  /* Spacing */
  --spacing-4: 4px;   --spacing-8: 8px;
  --spacing-16: 16px; --spacing-24: 24px;
  --spacing-32: 32px; --spacing-48: 48px;

  /* Radius */
  --radius-xs: 2px;  --radius-sm: 4px;
  --radius-md: 8px;  --radius-lg: 12px;
  --radius-xl: 20px;
}`} />

        <CodeBlock filename="lurems.vuetify.ts" code={`// Vuetify theme config
export const luremTheme = {
  dark: false,
  colors: {
    // Brand
    primary:       '${C.teal[500]}',
    'primary-darken': '${C.teal[700]}',
    secondary:     '${C.teal[200]}',
    background:    '${C.neutral[50]}',
    surface:       '#ffffff',
    error:         '#E05454',
    warning:       '${C.hope[400]}',
    success:       '${C.green[500]}',
    info:          '${C.purple[400]}',

    // Semantic roles
    patient:       '${C.green[500]}',
    psychologist:  '${C.purple[500]}',
    hope:          '${C.hope[400]}',

    // Brand scale
    'brand-50':    '${C.teal[50]}',
    'brand-500':   '${C.teal[500]}',
    'brand-900':   '${C.teal[900]}',
  },
  variables: {
    'border-radius-root': '8px',
    'font-size-root': '16px',
  }
}`} />
      </div>

      {/* Token naming guide */}
      <div style={{ marginTop: 32 }}>
        <Label>Convención de Nombres</Label>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 200px 1fr", padding: "10px 20px", background: C.teal[50] }}>
            {["Token", "Valor", "Uso"].map(h => <span key={h} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.neutral[400], fontFamily: "'Poppins', sans-serif" }}>{h}</span>)}
          </div>
          {[
            ["color.brand.primary",          C.teal[500],    "Color principal de marca en UI de acciones"],
            ["color.patient.primary",         C.green[500],   "Acciones e interfaces del flujo de paciente"],
            ["color.psychologist.primary",    C.purple[500],  "Acciones e interfaces del psicólogo"],
            ["color.hope.primary",            C.hope[400],    "Celebración, logros, luz del faro"],
            ["spacing.16",                    "16px",         "Padding base de componentes medianos"],
            ["radius.md",                     "8px",          "Inputs, items de menú, botones secundarios"],
            ["shadow.sm",                     "0 2px 8px…",  "Cards estándar, popovers, dropdowns"],
            ["font.heading.h1",               "28px / 700",   "Títulos principales de página"],
            ["font.body.lg",                  "16px / 400",   "Cuerpo principal de texto en la UI"],
          ].map(([token, val, use], i) => (
            <div key={token} style={{ display: "grid", gridTemplateColumns: "240px 200px 1fr", padding: "12px 20px", background: i % 2 === 0 ? "#fff" : C.neutral[50], borderTop: `1px solid ${C.teal[50]}`, alignItems: "center" }}>
              <code style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: C.teal[500] }}>{token}</code>
              <code style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: C.neutral[400] }}>{val}</code>
              <span style={{ fontSize: 12, color: C.teal[900], fontFamily: "'Poppins', sans-serif" }}>{use}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── Page map ─────────────────────────────────────────────────────────────────
const PAGE_MAP: Record<string, React.FC> = {
  cover: PageCover, brand: PageBrand, variables: PageVariables,
  colors: PageColors, typography: PageTypography, logo: PageLogo,
  iconography: PageIconography, grid: PageGrid, spacing: PageSpacing,
  elevation: PageElevation, radius: PageRadius, components: PageComponents,
  patterns: PagePatterns, applications: PageApplications, tokens: PageTokens,
};

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("cover");
  const [mobileOpen, setMobileOpen] = useState(false);
  const PageComponent = PAGE_MAP[active] ?? PageCover;
  const currentIdx = PAGES.findIndex(p => p.id === active);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Top nav ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.teal[100]}`, display: "flex", alignItems: "center", padding: "0 20px", height: 52, gap: 12 }}>
        <button onClick={() => setActive("cover")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: "4px 0" }}>
          <LuremsLogo markSize={20} wordSize={13} />
          <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: C.teal[400], background: C.teal[50], padding: "2px 8px", borderRadius: 999 }}>v1.0</span>
        </button>

        {/* Desktop pills */}
        <div style={{ display: "flex", gap: 2, flex: 1, overflow: "hidden", marginLeft: 8 }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)}
              style={{ padding: "5px 10px", borderRadius: 8, fontSize: 10.5, fontFamily: "'DM Mono', monospace", fontWeight: active === p.id ? 600 : 400, color: active === p.id ? "#fff" : C.neutral[400], background: active === p.id ? C.teal[500] : "transparent", border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
              {p.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Page ── */}
      <main style={{ flex: 1, background: C.neutral[50] }}>
        <PageComponent />
      </main>

      {/* ── Footer nav ── */}
      {active !== "cover" && (
        <div style={{ borderTop: `1px solid ${C.teal[100]}`, background: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LuremsMark size={14} />
            <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: C.neutral[300] }}>Lurems Brand System — Single Source of Truth</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {currentIdx > 0 && (
              <button onClick={() => setActive(PAGES[currentIdx - 1].id)}
                style={{ padding: "5px 14px", fontSize: 11, fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: C.teal[600], background: C.teal[50], border: `1px solid ${C.teal[200]}`, borderRadius: 8, cursor: "pointer" }}>
                ← {PAGES[currentIdx - 1].label}
              </button>
            )}
            {currentIdx < PAGES.length - 1 && (
              <button onClick={() => setActive(PAGES[currentIdx + 1].id)}
                style={{ padding: "5px 14px", fontSize: 11, fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#fff", background: C.teal[500], border: "none", borderRadius: 8, cursor: "pointer" }}>
                {PAGES[currentIdx + 1].label} →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
