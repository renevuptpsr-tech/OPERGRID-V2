import test from "node:test";
import assert from "node:assert/strict";

import {
  readFileSync,
} from "node:fs";

import {
  dirname,
  resolve,
} from "node:path";

import {
  fileURLToPath,
} from "node:url";

const current =
  dirname(
    fileURLToPath(
      import.meta.url,
    ),
  );

const root =
  resolve(
    current,
    "../../..",
  );

function read(path) {
  return readFileSync(
    resolve(
      root,
      path,
    ),
    "utf8",
  );
}

test("platform route exposes a Next.js loading boundary", () => {
  const source =
    read(
      "app/(platform)/loading.tsx",
    );

  assert.match(
    source,
    /PageLoader/,
  );

  assert.match(
    source,
    /data-og-design-system="1"/,
  );
});

test("electric loader exposes accessible status semantics", () => {
  const source =
    read(
      "components/design-system/loading/electric-loader.tsx",
    );

  assert.match(
    source,
    /role="status"/,
  );

  assert.match(
    source,
    /aria-live="polite"/,
  );

  assert.match(
    source,
    /og-electric-line-current/,
  );
});

test("blocking overlay communicates busy state and prevents background interaction visually", () => {
  const source =
    read(
      "components/design-system/loading/loading-overlay.tsx",
    );

  assert.match(
    source,
    /aria-busy="true"/,
  );

  assert.match(
    source,
    /role="status"/,
  );

  assert.match(
    source,
    /Do not close this page or submit the action again/,
  );
});

test("data loader provides skeleton rows and bounded row count", () => {
  const source =
    read(
      "components/design-system/loading/data-loader.tsx",
    );

  assert.match(
    source,
    /Math\.min/,
  );

  assert.match(
    source,
    /og-data-loader-row/,
  );

  assert.match(
    source,
    /aria-busy="true"/,
  );
});

test("loading CSS enhances the existing Design System button pending state", () => {
  const source =
    read(
      "components/design-system/loading/loading.css",
    );

  assert.match(
    source,
    /\.og-ds-button\[data-loading\]/,
  );

  assert.match(
    source,
    /\.og-ds-spinner/,
  );

  assert.match(
    source,
    /cursor:\s*wait/,
  );
});

test("loading CSS is premium-token-driven without palette literals", () => {
  const source =
    read(
      "components/design-system/loading/loading.css",
    );

  assert.doesNotMatch(
    source,
    /#[\da-f]{3,8}\b/i,
  );

  assert.doesNotMatch(
    source,
    /rgba?\(/i,
  );
});

test("loading system respects reduced-motion preference", () => {
  const source =
    read(
      "components/design-system/loading/loading.css",
    );

  assert.match(
    source,
    /prefers-reduced-motion:\s*reduce/,
  );
});

test("existing Design System Button already enforces anti-spam semantics when loading", () => {
  const source =
    read(
      "components/design-system/primitives/button.tsx",
    );

  assert.match(
    source,
    /disabled=\{disabled \|\| loading\}/,
  );

  assert.match(
    source,
    /aria-busy=\{loading/,
  );

  assert.match(
    source,
    /data-loading=\{loading/,
  );
});