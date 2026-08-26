# Retro-Corporate Design System Spec (circa 1996)

This specification outlines the "1996 Catalog-Era Enterprise Web" aesthetic applied ironically to a modern, premium dashboard layout. It balances retro design-viz elements (table-based structures, hard bevels, web-safe colors) with modern usability and polish (clean typography, generous whitespace, logical navigation).

---

## 🎨 Color Palette (Web-Safe)

| Token | CSS Variable / Value | Description |
|---|---|---|
| **Canvas Background** | `#C0C0C0` (Silver) | The primary window and body background. |
| **Window Background** | `#DFDFDF` (Light Gray) | Active window frames and panels. |
| **Primary Accent** | `#000080` (Navy) | Header bars, primary action buttons, key highlights. |
| **Text Primary** | `#000000` (Black) | Body text, high-contrast labels. |
| **Text Secondary** | `#404040` (Dark Gray) | Secondary labels, captions, metadata. |
| **Text Light** | `#FFFFFF` (White) | Text on dark backgrounds (Navy/Teal). |
| **Alert/Warning** | `#FF0000` (Red) | High-severity errors, critical warnings. |
| **Accent Light** | `#008080` (Teal) | Secondary accents, status badges, secondary buttons. |
| **Interactive Link** | `#0000EE` (Vibrant Blue) | Traditional web hyperlinks. |
| **Visited Link** | `#551A8B` (Purple) | Clicked hyperlinks. |

---

## 📐 Spacing & Layout

- **Border Radius:** `0px` (Strict rule: No rounded corners on any element).
- **Bevel Borders (Hard-Edge Shadowing):**
  - **Inset (Pressed/Input fields):** `border: 2px solid; border-color: #808080 #ffffff #ffffff #808080;`
  - **Outset (Button/Raised window):** `border: 2px solid; border-color: #ffffff #808080 #808080 #ffffff;`
  - **Flat Borders:** `1px solid #000000` or `2px solid #000000`.
- **Spacing Scale:**
  - `4px` (XS), `8px` (S), `16px` (M), `24px` (L), `32px` (XL), `48px` (XXL)
- **Table-Based Grid:** Layouts are structured using explicit `<table>` hierarchies or grid containers mimicking table column behaviors for charts and data metrics.

---

## 🔠 Typography Scale

- **Display Fonts (Headers, Titles):** Impact, Arial Black, MS Sans Serif, sans-serif (Heavy, bold, commanding).
- **Body Fonts (Paragraphs, Metadata):** Times New Roman, Georgia, serif (Classic 90s serif readability).
- **Monospace (Code, Stats, Metrics):** Courier New, Courier, monospace.

### Size Scale:
- **Title (H1):** `32px` (Bold, Sans-Serif)
- **Section Heading (H2):** `24px` (Bold, Sans-Serif)
- **Subsection Heading (H3):** `18px` (Bold, Sans-Serif)
- **Body Text:** `14px` (Serif)
- **Metadata/Captions:** `11px` (Monospace or Sans-Serif)

---

## 🧱 Component List

### 1. The Windows Panel (`.win95-window`)
A component representing a traditional OS window.
- Header bar (`#000080` background, `#FFFFFF` text) with a Close (`X`) button.
- Beveled outset body (`#DFDFDF`).
- Zero border radius.

### 2. Retro Buttons (`.win95-btn`)
- Outset bevel borders.
- Active state shifts border to inset bevel and shifts text 1px down and right to mimic physical press.
- Font: MS Sans Serif or bold Arial, size 12px.

### 3. Status Badges (`.win95-badge`)
- Solid color blocks (Navy, Teal, Gray) with inset borders.
- Text centered, uppercase.

### 4. Text Fields / Search Inputs (`.win95-input`)
- Inset bevel borders, white background.
- Typography: Monospace.

---

## 🚫 Do's and Don'ts

### Do:
- Use strict 2px outset/inset borders for physical volume.
- Use explicit table cell borders for tabular data.
- Keep the design highly responsive and readable by using a clean layout flow beneath the skin.
- Use pixelated/retro-looking iconography (e.g. standard file/folder symbols, retro warning icons).

### Don't:
- Do not use CSS shadows (`box-shadow`).
- Do not use Tailwind/CSS rounded classes (`border-radius`, `rounded-lg`).
- Do not use smooth CSS gradients.
- Do not use modern thin icon packs; use chunky pixel-art style icons.
