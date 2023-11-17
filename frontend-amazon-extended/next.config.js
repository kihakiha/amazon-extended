/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },

  images: {
    domains: [
      "picsum.photos",
      "loremflickr.com",
      "static.re-store.ru",
      "c.dns-shop.ru",
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
