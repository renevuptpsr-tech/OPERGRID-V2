# OPERGRID Design System 1.0

Phase 3 adds isolated forms, selection controls and date/time pickers. See
[form APIs, date/time contracts and verification](forms/README.md). No existing
application page consumes these components or opts into their styles.

Phase 2 adds isolated core primitives and a minimal tooltip. See
[primitive APIs and verification](primitives/README.md). The Phase 1 audit and
foundation contract below are retained as the original baseline; the primitives
and overlays folders now contain Phase 2 implementations. No page is opted in.

Phase 1: presentation audit and design foundation only. No components or pages
are migrated. OPERGRID is a precise, calm, industrial executive interface inspired
by control rooms: restrained cyan actions, navy structure, readable operational
information, and surface hierarchy with minimal visual noise. Avoid decorative
gradients, glass, glow, oversized cyan surfaces, and heavy panel shadows.

## Foundation and compatibility

`foundation/tokens.css` owns all values and is imported by `app/globals.css`.
`foundation/tokens.ts` exports optional typed CSS references through `index.ts`;
it does not duplicate values or resolve themes in JavaScript.

The existing stylesheet already defines several `--og-*` names. To preserve
existing presentation, the new values apply **only** inside
`[data-og-design-system="1"]`. No current page or component has this attribute.
Do not add it to the application shell until a later migration is approved:
legacy descendants using the same token names would inherit the new values.
Existing `og-*`, `og-ui-*`, `opg-*`, `*-soft`, and cyan/teal tokens remain intact.
No legacy aliases are redirected in Phase 1.

Future opt-in usage (documentation only):

```tsx
import { ogTokens } from "@/components/design-system/foundation";

<section data-og-design-system="1" style={{ color: ogTokens.text }}>
  <h2 className="og-ds-type-section-title">Operational status</h2>
</section>
```

## Token contract

| Family | CSS variables / purpose |
| --- | --- |
| Surface | `--og-canvas`, `--og-surface`, `--og-surface-subtle`, `--og-surface-raised`, `--og-surface-overlay` |
| Text | `--og-text`, `--og-text-secondary`, `--og-text-muted`, `--og-text-inverse` |
| Border | `--og-border`, `--og-border-subtle`, `--og-border-strong` |
| Brand | `--og-brand`, `--og-brand-hover`, `--og-brand-active`, `--og-brand-subtle`, `--og-brand-contrast` |
| Semantic | `--og-success`, `--og-warning`, `--og-danger`, `--og-info`, each with a `-subtle` companion |
| Focus | `--og-focus-ring`, `--og-focus-width`, `--og-focus-offset` |
| Typography | `--og-font-sans`, `--og-font-mono`, `--og-font-size-*`, `--og-line-height-*`, `--og-font-weight-*`, `--og-tracking-*` |
| Spacing | `--og-space-0/1/2/3/4/5/6/8/10/12`: 0/4/8/12/16/20/24/32/40/48px at the default root size |
| Radius | `--og-radius-control/panel/dialog/shell`: 8/12/16/18px |
| Elevation | `--og-elevation-panel`: none; `--og-elevation-floating/overlay`: reserved shadows |
| Motion | `--og-duration-hover`: 140ms; `--og-duration-overlay`: 180ms; `--og-ease-standard` |

Light surfaces follow #F3F5F7 / #FFFFFF / #F8F9FB with #10202F text and
#405163 secondary text. Muted text uses #617180 instead of the directional
#788795 to improve small-text contrast. #788795 is used for strong borders.
Electric Cyan #14A8C7 is the primary action fill with Navy #0D2235 text;
do not put white small text on this cyan or use it for small text on white.
Grid Blue #14324A supplies dark raised surfaces. Success uses a darker Signal
Teal relative (#087864) for readable light-mode status text.

Cyan means selected/focus/primary action. Success means healthy/completed;
warning means review/pending/anomaly; danger means destructive/trip/error;
info is neutral operational information and has its own blue pair. Pair each
status foreground with its subtle background and a readable label or icon;
color alone must not convey status. Inverse text is for contrasting dark/light
surfaces, not a replacement for brand contrast. Use strong borders where a
control boundary must be discernible; subtle borders are decorative separators.

## Type and interaction utilities

| Class | Default size | Weight / line height |
| --- | --- | --- |
| `og-ds-type-page-title` | 30px | 600 / 1.2 |
| `og-ds-type-section-title` | 16px | 600 / 1.2 |
| `og-ds-type-component-title` | 14px | 600 / 1.2 |
| `og-ds-type-body` | 13px | 400 / 1.5 |
| `og-ds-type-label` | 12px | 500 / 1.5 |
| `og-ds-type-metadata` | 11px | 400 / 1.5 |
| `og-ds-type-micro` | 10px | 400 / 1.5 |

Sizes use rem and respect user root sizing. Micro is exceptional supporting
information, never essential instructions or primary controls. Local system
fonts require no downloads. Typography utilities do not set semantic heading
levels, margins, colors, or page defaults.

`og-ds-focus` provides a 2px focus-visible outline with 2px offset; apply it to
the actual focusable element and avoid clipping the ring. `og-ds-transition`
animates only foreground, background and border colors. Both require the opt-in
boundary. Reduced-motion preference sets both duration tokens to zero; future
overlays must consume these tokens and implement their own keyboard/focus behavior.

## Dark mode

Follow the existing resolved `.dark` class on the document. The boundary supports
that ancestor or `.dark` on the boundary itself. Deep blue canvas, distinct navy
surfaces, softer light text, and brighter status foregrounds are deliberately
chosen, not inverted. All 26 semantic color tokens have explicit dark values.
Theme bootstrap, local storage, system preference listener and preference RPC
are untouched. No second provider or independent system-mode media query is added.
Future portals need the foundation attribute at the portal surface because CSS
variables inherit through DOM ancestry, not React ancestry. Nested independent
light/dark preview themes are outside this initial contract.

## Folder responsibilities (reserved, no implementations)

- `foundation/`: tokens, utilities and exports.
- `primitives/`: future base controls.
- `forms/`: future form presentation.
- `overlays/`: future dialogs and floating surfaces.
- `navigation/`: future navigation presentation.
- `data-display/`: future badges, tables and pagination presentation.
- `workflow/`: future workflow presentation.

## UI audit — 2026-09-09

Source inspection was completed before edits on `ui/opergrid-design-system-1`.
Baseline `npm.cmd run lint` and `npm.cmd run build` both passed.

| Area | Existing implementation and findings |
| --- | --- |
| Shared UI | `components/ui` contains Button, IconButton, SubmitButton, Badge, Panel, Card family, Input, Label, FormField, FormSection, SectionHeader, EmptyState, DataTableShell, SearchableCombobox, StickyActionBar, WorkflowTabs and ActionResultModal. There is no unified foundation contract yet. |
| Sidebar | `components/layout/sidebar.tsx`: sticky 244px desktop sidebar, 72px collapsed state, mobile fixed backdrop/drawer; Dashboard, Operations and Tools/Administration. Links depend on supplied module access, `can_view`, group/code, sort order and route. Preserve all of those semantics. Gradient selected rows, cyan/teal marker, tiny group labels and white-alpha decoration are established styling. |
| Topbar/header | AppShell owns collapse/mobile state. Topbar is sticky, 56px, with sidebar controls, ThemeToggle and UserMenu. PageHeader resolves routes into section/title, uses 8px breadcrumbs and a 24px h1. |
| Panels/cards | Panel has default/raised/soft/focal variants, optional interaction and padding, 14px radius. Separate Card family uses slate/white and shadows. Global `og-card`/`opg-card` compatibility classes repeat panel patterns; focal variants use gradients. |
| Buttons | Button: primary/secondary/ghost/danger; sm/md/lg sizes, loading and icons; 10px radius, 11–12px text. IconButton and SubmitButton coexist with raw styled buttons/links in admin workflows. Focus treatment is inconsistent. |
| Inputs/forms | Input/Label use fixed slate/white classes; other forms use `og-ui-input`, inline variable styles and raw input/select/textarea controls. FormField uses 9px labels and 8px helper text; FormSection uses a two-column desktop layout. SearchableCombobox is custom, with popover/search/options and 8px descriptions. No shared DatePicker or TimePicker implementation found. |
| Badges/status | Badge supports neutral/info/success/warning/danger/focal with optional dot, 9px text. Info currently shares cyan action colors. UserTable maps existing status codes to variants. Status colors also appear inline across admin views. |
| Dialogs/feedback | ActionResultModal is driven by URL result/message/action, has alertdialog markup, custom backdrop, 20px radius and a hardcoded shadow. UserAssignmentModal uses local open state, custom fixed overlay and 16px panel. No shared toast component found. Focus trapping/restoration, Escape handling and accessible dialog naming are not consistently implemented in these two dialogs; defer fixes to the overlay phase. |
| Tables/pagination | DataTableShell wraps overflow/min-width only. UserTable is hand-authored; UserDirectory has its own filtering, sorting, selection, page size and previous/next pagination. Import preview has separate table markup. `components/tables/data-table-test.tsx` demonstrates TanStack sorting with slate styling; it is not a unified production table abstraction. |
| Tiny typography | In app/components/features TSX and CSS, literal Tailwind 7px classes occur on 14 lines, 8px on 59, 9px on 49 (122 matching lines total). Examples: wizard summary, directory/import metadata, sidebar group labels, breadcrumbs, badge text and table headers. Counts are source lines, not rendered elements. |
| Hardcoded colors | `app/globals.css` includes explicit hex/RGBA colors, gradients, shadows and white-alpha surfaces. Login page/form, Card/Input/Label and table/form demos use fixed slate/white utilities. Dashboard and modal/combobox implementations include inline colors or shadows. |
| Duplication | Legacy `opg-*` aliases, `og-*` compatibility classes and `og-ui-*` primitives overlap; cards/panels, raw action controls, table headers/rows, field styles and overlay shells repeat. Radius, font sizes, shadow intensity and motion durations differ. |
| Themes | Active root layout imports `app/globals.css`; `styles/globals.css` is a separate basic stylesheet with no import found in the inspected presentation tree. Bootstrap sets `.dark` using `opergrid-theme` storage/system preference. ThemeToggle listens for changes and persists preference through the existing RPC with rollback on error. Fixed-color components do not consistently follow dark mode. |

## Compatibility risks and later review

- Global replacement of shared token names would recolor current pages, so this
  foundation remains scoped and unused by existing views.
- Future type-size changes can affect row density, truncation, table min-widths,
  breadcrumbs and mobile layouts; migrate and visually verify each component later.
- Existing white-on-cyan controls, muted tiny text, custom dialog keyboard behavior
  and combobox semantics need separate accessibility review. Phase 1 does not fix them.
- Existing CSS uses Tailwind 4, CSS variables, color-mix and dark selectors. The
  foundation uses the installed CSS pipeline; no Tailwind configuration changes.
- No existing APIs, exports, imports (apart from the additive stylesheet import),
  module access, role behavior, theme persistence or backend contracts are changed.
- No sidebar, table, form, picker, modal, toast or wizard has been rebuilt or deleted.
