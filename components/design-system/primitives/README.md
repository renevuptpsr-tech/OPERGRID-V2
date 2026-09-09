# Phase 2 core primitives

New components only. Use inside a dedicated `data-og-design-system="1"` wrapper;
do not add that attribute to an existing application shell or page. Styles are
loaded by the existing global stylesheet, but every rule requires that boundary
and a new `og-ds-*` class. Existing `components/ui` APIs and pages are untouched.

Import individual modules or the `primitives/index.ts` barrel. These components
use the installed React 19: native refs pass through the `ref` prop; Checkbox uses
`forwardRef` for its imperative indeterminate property. Only Checkbox, Radio/
RadioGroup and Tooltip need client hooks. Interactive callers must be clients.

| Component | Additional props (native props also supported) |
| --- | --- |
| Button | `variant`: primary/secondary/ghost/danger; `size`: sm/md/lg; `leftIcon`, `rightIcon`, `loading`, `loadingText`, `fullWidth` |
| IconButton | Same variants/sizes, `children` icon, **required `aria-label`**, loading/disabled; no text/icon slots or fullWidth |
| Input | `error`, `leftIcon`, `rightSlot`, string `prefix`/`suffix`, `containerClassName`; `className` and `ref` target the input |
| Textarea | `error`, `resize`: vertical (default)/horizontal/both/none; native `rows` defaults to 3 |
| Label | `required`, `optional`, `disabled`; native `htmlFor` or wrap a single control |
| Checkbox | Native checked/defaultChecked/onChange, `indeterminate`; ref targets input |
| RadioGroup | Required `legend`; `name` (generated if omitted), `value`/`defaultValue`, `onValueChange`, `required`, horizontal/vertical `orientation`; native fieldset props including disabled/ref |
| Radio | Required string `value`; native input props; within a group, name/selection/required come from the group |
| Switch | Native checkbox props (`checked`, `defaultChecked`, `onChange`, `name`, `value`, `disabled`, ref), rendered with `role="switch"` |
| Badge | Required meaningful `children`; neutral/brand/info/success/warning/danger `variant`, optional `dot` and `icon` |
| Separator | horizontal/vertical `orientation`, `decorative` (default true); native div props/ref |

Controls have 8px radii and 32/36/40px button minimum heights; IconButton is
square at those sizes. Text wraps rather than clipping if a label needs more
space. Button uses 12px small/13px regular text; inputs use 13px, labels 12px,
badges 11px. All palette values come from the Phase 1 tokens. Checked marks,
switch thumb position, text labels and icons supplement color. Normal controls
have no shadow; the tooltip uses the floating elevation token.

## Composition and accessibility

```tsx
<div data-og-design-system="1">
  <Label htmlFor="asset" required>Asset name</Label>
  <Input id="asset" name="asset" required aria-describedby="asset-help" />
  <p id="asset-help">Use the operational asset name.</p>

  <Label><Checkbox name="acknowledged" /> Acknowledge review</Label>
  <RadioGroup legend="Display mode" name="mode" defaultValue="summary">
    <Label><Radio value="summary" /> Summary</Label>
    <Label><Radio value="detail" /> Detail</Label>
  </RadioGroup>
  <Label><Switch name="notifications" /> Notifications</Label>
  <Badge variant="warning" dot>Pending review</Badge>
</div>
```

- Button defaults to `type="button"`; set `type="submit"` deliberately. Loading
  applies native disabled plus aria-busy. Overlapping grid tracks reserve the
  original label width while showing pending text; a longer pending label can
  expand it. Set controlled `loading` promptly when starting work. Icons are
  decorative; IconButton always needs a nonempty aria-label, including while busy.
- Label's required marker is visual; set native `required` on the control too.
  Label never owns helper text or errors. Use native `aria-describedby` and external
  text for explanations; `error` sets aria-invalid and a danger border.
- Prefix/suffix and left icons are decorative: include units or other essential
  meaning in the associated label/description. Label every interactive rightSlot;
  the caller must also propagate disabled state to interactive slots. `readOnly`
  remains focusable/submittable, while disabled inputs use native disabled behavior.
- Checkbox uses the DOM indeterminate property after hydration. The browser
  exposes its mixed state and clears it on user activation; the caller manages
  subsequent controlled state. It does not change the native checked submission
  value. No manually invented keyboard behavior is added.
- Native checkboxes/switches toggle with Space. Native radios of a shared name
  provide arrow-key selection and a single tab stop. Fieldset/legend names the
  group; disabled fieldsets disable descendants. Controlled inputs/groups need
  onChange/onValueChange updates; uncontrolled controls support native form reset.
- Focus-visible uses the Phase 1 ring. Input outlines its entire shell only when
  the input is focused; a right-slot control retains its own ring. Keep ancestor
  overflow from clipping focus outlines. Disabled controls leave keyboard tab order.
- Forced-colors mode restores native checkboxes/radios and uses system colors for
  the switch. Reduced-motion disables the spinner and token-driven transitions.
- Keep the foundation wrapper in the DOM ancestry. Dark colors follow the existing
  `.dark` ancestor; these primitives never create a theme provider or write preferences.

## Minimal tooltip

Import `Tooltip` from `../overlays/tooltip` or the overlays barrel. Its render
function supplies aria-describedby; spread those props onto the actual control:

```tsx
<Tooltip content="Refresh operational status" describedBy="existing-help">
  {(triggerProps) => (
    <IconButton {...triggerProps} aria-label="Refresh">
      <RefreshCw />
    </IconButton>
  )}
</Tooltip>
```

Tooltip accepts string `content`, `side="top" | "bottom"`, `className` for the
anchor, and optional existing `describedBy` IDs. Focus or pointer hover shows it;
Escape dismisses it without moving focus. It remains open while the pointer
crosses the padded gap into its content, or while the trigger stays focused.
There are no interactive descendants, timers, portals or animations. It preserves
the trigger's handlers/ref and accessible name by avoiding cloning the child.

This initial inline tooltip has **no viewport collision handling or portal escape**.
Choose the side and place it with enough surrounding room, outside overflow-clipped
containers. Native disabled buttons cannot receive keyboard focus, so do not put
essential disabled-state explanations only in a tooltip. Tooltip text supplements
an accessible label; it does not replace one. These constraints need review before
later use in dense tables or clipped navigation; no such integration is done here.

## Verification

Run `node --test components/design-system/primitives/primitives.test.mjs` for
rendered semantic/attribute, CSS scope/token and contrast checks using installed
dependencies. These tests do not simulate live browser input, focus, indeterminate
effects, forced-colors rendering or tooltip hover behavior. Lint and production
build additionally check all TSX APIs. No production preview route is provided.
