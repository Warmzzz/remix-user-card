import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinkDescriptor, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import GlobalCSS from "~/styles/global.css";
const CustomLinks: Array<LinkDescriptor> = [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: GlobalCSS },
];

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [...CustomLinks, { rel: "stylesheet", href: cssBundleHref }] : [...CustomLinks]),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
