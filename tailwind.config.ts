import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        loading: 'loading 1s infinite',
      },
      keyframes: {
        loading: {
          '0%, 100%': { opacity: '0.2' },
          '20%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
