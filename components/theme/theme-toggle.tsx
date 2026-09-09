"use client";

import {
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import {
  useSyncExternalStore,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";


type AppTheme =
  | "light"
  | "dark"
  | "system";


const THEME_EVENT =
  "opergrid-theme-change";


function getSnapshot(): AppTheme {
  if (
    typeof document ===
    "undefined"
  ) {
    return "system";
  }

  const value =
    document.documentElement
      .dataset.theme;

  if (
    value === "light" ||
    value === "dark" ||
    value === "system"
  ) {
    return value;
  }

  return "system";
}


function getServerSnapshot(): AppTheme {
  return "system";
}


function applyTheme(
  mode: AppTheme,
  persist = true
) {
  const prefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  const useDark =
    mode === "dark" ||
    (
      mode === "system" &&
      prefersDark
    );

  document.documentElement
    .dataset.theme = mode;

  document.documentElement
    .classList.toggle(
      "dark",
      useDark
    );

  document.documentElement
    .style.colorScheme =
      useDark
        ? "dark"
        : "light";

  if (persist) {
    localStorage.setItem(
      "opergrid-theme",
      mode
    );
  }

  window.dispatchEvent(
    new Event(THEME_EVENT)
  );
}


function subscribe(
  callback: () => void
) {
  const media =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

  const themeChanged =
    () => callback();

  const systemChanged =
    () => {
      if (
        getSnapshot() ===
        "system"
      ) {
        applyTheme(
          "system",
          false
        );
      }
  };

  window.addEventListener(
    THEME_EVENT,
    themeChanged
  );

  media.addEventListener(
    "change",
    systemChanged
  );

  return () => {
    window.removeEventListener(
      THEME_EVENT,
      themeChanged
    );

    media.removeEventListener(
      "change",
      systemChanged
    );
  };
}


function getNextTheme(
  current: AppTheme
): AppTheme {
  if (
    current === "light"
  ) {
    return "dark";
  }

  if (
    current === "dark"
  ) {
    return "system";
  }

  return "light";
}


function ThemeIcon({
  theme,
}: {
  theme: AppTheme;
}) {
  if (
    theme === "light"
  ) {
    return (
      <Sun
        size={16}
        strokeWidth={1.8}
      />
    );
  }

  if (
    theme === "dark"
  ) {
    return (
      <Moon
        size={16}
        strokeWidth={1.8}
      />
    );
  }

  return (
    <Monitor
      size={16}
      strokeWidth={1.8}
    />
  );
}


export function ThemeToggle() {
  const theme =
    useSyncExternalStore<AppTheme>(
      subscribe,
      getSnapshot,
      getServerSnapshot
    );


  async function handleToggle() {
    const previous =
      theme;

    const next =
      getNextTheme(theme);

    /*
     * Runtime UI changes immediately.
     */
    applyTheme(next);

    /*
     * Database persistence happens after.
     */
    const supabase =
      createClient();

    const { error } =
      await supabase.rpc(
        "opg_fn_set_my_theme",
        {
          p_theme:
            next.toUpperCase(),
        }
      );

    if (error) {
      console.error(
        "Gagal menyimpan theme:",
        error.message
      );

      applyTheme(previous);
    }
  }


  return (
    <button
      type="button"
      onClick={
        handleToggle
      }
      title={`Theme: ${
        theme === "light"
          ? "Light"
          : theme === "dark"
            ? "Dark"
            : "Auto"
      }`}
      aria-label="Ubah tampilan OPERGRID"
      className="og-control og-fast-transition flex h-9 w-9 items-center justify-center rounded-[10px]"
    >
      <ThemeIcon
        theme={theme}
      />
    </button>
  );
}