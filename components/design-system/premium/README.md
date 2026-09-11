# OPERGRID Premium Rebuild 2.0

Stage 1 establishes the visual foundation for OPERGRID as a
Grid Operations Intelligence platform.

## Direction

- premium enterprise control-center interface;
- operational rather than generic SaaS styling;
- light and dark modes designed independently;
- restrained cyan electrical accent;
- layered but low-noise surfaces;
- compact enterprise information density;
- accessible interaction states.

## Stage 1 scope

- premium theme tokens;
- premium application shell;
- premium sidebar and topbar;
- premium dashboard using actual user/access context;
- redesigned dialog, alert, toast and dropdown presentation;
- compatibility aliases for existing pages.

Business logic, authentication, Supabase access, roles and authorization
remain outside this visual layer.
## Stage 2A — Administration workspace

User Management is the first administration page migrated from the
legacy visual composition to the Premium Rebuild language.

The migration preserves:

- authentication account state;
- OPERGRID profile classification;
- provisioning routing;
- access-assignment routing;
- bulk import/export endpoints;
- client-side search, filtering and pagination.

The visual layer adds:

- premium summary metrics;
- compact action hierarchy;
- segmented directory filtering;
- accessible search;
- enterprise data-table density;
- clearer user/access/status hierarchy;
- responsive pagination.
## Stage 2A.1 — Electric loading and anti-spam

OPERGRID uses an electrical energy-flow loading language rather than a
generic spinner for route and long-running operational transitions.

The loading system provides:

- Next.js platform route loading boundary;
- electric page loader;
- compact electric data-loader state;
- premium skeleton rows;
- blocking processing overlay;
- existing Design System Button loading-state enhancement;
- automatic interaction lock through disabled + aria-busy;
- reduced-motion fallback.

Loading hierarchy:

1. Route/page transition: PageLoader.
2. Data-region fetch: DataLoader.
3. Blocking mutation: Button loading state and, when appropriate,
   LoadingOverlay.

Short client-only filtering and pagination should remain immediate and
should not display a blocking loader.

## Next: Stage 2B — User Detail

Stage 2B remains the next administration rebuild milestone and MUST include:

- compact identity hero;
- Profile tab;
- Access & Role tab;
- Account Status tab;
- compact form layout without excessive empty width;
- sticky action area;
- premium confirm / warning / success / error result dialogs;
- loading state for every save, assignment, provisioning and account-status
  mutation;
- disabled action controls while a mutation is pending to prevent repeated
  submissions.
## Stage 2B — User Detail

User Detail now follows the Premium Rebuild administration language.

Implemented:

- compact identity hero;
- Profile / Access & Role / Account Status tabs;
- compact two-column profile forms;
- sticky save/reset action area;
- premium assignment cards;
- Design System assignment dialog;
- role_code form contract correction;
- pending-aware assignment submit;
- pending-aware assignment deactivation;
- account-status workspace;
- password-recovery workspace;
- premium result dialog without hardcoded palette;
- loading / disabled anti-spam mutation behavior.

Stage 2B continues to preserve all existing Supabase actions and
authorization boundaries.
## Stage 2B.1B — Sensitive Action Confirmation

Sensitive User Management mutations now require explicit confirmation.

Covered actions:

- Account Status changes;
- Role Assignment deactivation;
- Password Reset Link delivery.

Interaction contract:

- Design System AlertDialog is mandatory;
- destructive actions use danger confirmation semantics;
- request processing is protected by transition-based anti-spam;
- confirm and trigger controls become unavailable while processing;
- unchanged Account Status cannot be submitted;
- server actions remain unchanged and continue to redirect into the
  premium success/error result workflow.