import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

// Cloudflare sets this header on every request reaching the Worker — no
// separate GeoIP lookup needed.
export const getVisitorCountry = createServerFn({ method: "GET" }).handler(async () => {
  return getRequestHeader("cf-ipcountry") ?? "IN";
});
