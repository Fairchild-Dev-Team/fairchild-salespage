import type { NextConfig } from "next"

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
}

export default nextConfig

initOpenNextCloudflareForDev()
