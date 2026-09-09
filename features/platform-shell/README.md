# OPERGRID Phase 6A — Production Shell Audit

## Existing production responsibilities

### app/(platform)/layout.tsx
- Loads CurrentUserContext.
- Redirects unauthenticated users.
- Resolves display name.
- Resolves primary role label.
- Filters module access.
- Passes shell data to legacy AppShell.

### components/layout/app-shell.tsx
- Owns desktop collapsed state.
- Owns mobile drawer state.
- Composes legacy Sidebar, Topbar and PageHeader.

### components/layout/sidebar.tsx
- Performs active route detection.
- Filters visible modules.
- Separates Dashboard, Operations and Administration.
- Maps module code to icon.
- Owns Administration expansion state.
- Owns legacy mobile sidebar presentation.

### components/layout/topbar.tsx
- Owns desktop sidebar trigger presentation.
- Owns mobile navigation trigger presentation.
- Composes ThemeToggle and UserMenu.

### components/layout/user-menu.tsx
- Owns user-menu presentation.
- Directly performs Supabase signOut.
- Directly performs post-logout navigation.

### components/layout/page-header.tsx
- Resolves pathname to title and section.
- Owns breadcrumb-like presentation.

## Phase 6 migration boundary

Business and application concerns stay outside the Design System:

- authentication;
- Supabase calls;
- role/module authorization;
- current-route resolution;
- module grouping;
- module icon selection;
- logout navigation;
- page registry.

The Design System remains presentation/composition only.

## Phase 6A output

This phase introduces only:

- shell-model.ts;
- context-adapter.ts;
- page-registry.ts;
- icon-registry.ts;
- tests and documentation.

Production shell components are intentionally unchanged.