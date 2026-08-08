import { fileURLToPath, URL } from 'node:url';

/**
 * Resolve the Tailwind config relative to this file rather than to the
 * process working directory, so the pipeline behaves the same however the
 * build or dev server is invoked.
 */
const tailwindConfig = fileURLToPath(new URL('./tailwind.config.js', import.meta.url));

export default {
  plugins: {
    tailwindcss: { config: tailwindConfig },
    autoprefixer: {},
  },
};
