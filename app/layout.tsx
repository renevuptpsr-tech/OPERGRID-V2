import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "OPERGRID",
  description: "Operational Grid Management Platform",
};

const themeBootstrap = `
(function () {
  try {
    var mode =
      localStorage.getItem("opergrid-theme") ||
      "system";

    if (
      mode !== "light" &&
      mode !== "dark" &&
      mode !== "system"
    ) {
      mode = "system";
    }

    var systemDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    var dark =
      mode === "dark" ||
      (
        mode === "system" &&
        systemDark
      );

    document.documentElement.dataset.theme =
      mode;

    document.documentElement.classList.toggle(
      "dark",
      dark
    );

    document.documentElement.style.colorScheme =
      dark ? "dark" : "light";

    localStorage.setItem(
      "opergrid-theme",
      mode
    );
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrap,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}