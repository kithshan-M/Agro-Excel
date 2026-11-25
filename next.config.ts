import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// `npm run dev` only trusts "localhost" by default. Opened through any other
// address, pages show but buttons do nothing. This adds the addresses of this
// computer, so the Network link also works, for example on a phone.
const ownAddresses = Object.values(networkInterfaces())
  .flatMap((list) => list ?? [])
  .filter((item) => item.family === "IPv4")
  .map((item) => item.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: ownAddresses,
  // Hides the Next.js button in the corner. Errors still show.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  // Two languages have two layouts, so wrong addresses need a page of their own.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
