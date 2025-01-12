/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
     images: {
          remotePatterns: [ // Updated to use remotePatterns instead of domains
               {
                    protocol: 'https',
                    hostname: 'ui.aceternity.com',
                    port: '',
                    pathname: '/**',
               },
          ],
     },
};

export default config;
